import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {

    const [totalResults, setTotalResults] = useState(0)
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - News Monkey`
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`

        props.setProgress(20)
        let data = fetch(url)
            .then(response => response.json())
            .then(parsedData => {
                props.setProgress(100)
                setArticles(parsedData.articles)
                setTotalResults(parsedData.totalResults)
                setLoading(false)

            })
    }, [])

    const pageChange = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`

        props.setProgress(20)
        let data = await fetch(url)
        props.setProgress(100)
        let parsedData = await data.json()
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

    }

    const fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}`
        setPage(page + 1)
        props.setProgress(20)
        let data = await fetch(url)
        let parsedData = await data.json()
        props.setProgress(100)
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }

    return (
        <>
            <h1 className='text-center' style={{ marginTop: "80px" }}>NewsMonkey - {props.category === 'general' ? 'Home' : props.category.charAt(0).toUpperCase() + props.category.slice(1)}</h1>

            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >

                <div className='container my-3'>
                    <div className="row">

                        {articles.map(element => {
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

News.defaultProps = {
    country: 'in',
    pageSize: 20,
    category: 'sports'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}