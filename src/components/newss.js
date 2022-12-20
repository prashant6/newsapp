import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 20,
        category: 'sports',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            totalResults: 0,
            articles: [],
            page: 1,
            loading: true,
        }
        
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - News Monkey`
    }

    async componentDidMount() {
        // this.pageChange()
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`

        this.props.setProgress(20)
        let data = await fetch(url)

        let parsedData = await data.json()

        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100)

    }

    pageChange = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`

        this.props.setProgress(20)
        let data = await fetch(url)
        this.props.setProgress(100)
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })

    }


    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`
        this.props.setProgress(20)
        let data = await fetch(url)
        let parsedData = await data.json()
        this.props.setProgress(100)
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false })
    }

    render() {
        return (
            <>
                <h1 className='text-center my-4'>NewsMonkey - {this.props.category === 'general' ? 'Home' : this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}</h1>

                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >

                    <div className='container my-3'>
                        <div className="row">

                            {this.state.articles.map(element => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo7Wl5Dx7HY7QfXZklodsyOYlmwdXpAsREnw&usqp=CAU'} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
