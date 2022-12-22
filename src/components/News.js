import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {

    const [totalResults, setTotalResults] = useState(0)
    const [results, setResults] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [nextPage, setNextPage] = useState(0)

    useEffect(() => {
        document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - News Monkey`
        let url = `https://newsdata.io/api/1/news?apiKey=${props.apiKey}&country=${props.country}&language=en&category=${props.category}&page=${page}`

        props.setProgress(20)
        let data = fetch(url)
            .then(response => response.json())
            .then(parsedData => {
                props.setProgress(100)
                setResults(parsedData.results)
                setTotalResults(parsedData.totalResults)
                setLoading(false)

            })
    }, [])

    const fetchMoreData = async () => {


        let url = `https://newsdata.io/api/1/news?apiKey=${props.apiKey}&country=${props.country}&language=en&category=${props.category}&page=${page+1}`
        setPage(page + 1)
        props.setProgress(20)
        let data = await fetch(url)
        let parsedData = await data.json()
        props.setProgress(100)
        console.log(parsedData.nextPage)
        setResults(results.concat(parsedData.results))
        setNextPage(parsedData.nextPage)
        setLoading(false)
    }

    return (
        <>
            <h1 className='text-center' style={{ marginTop: "80px" }}>NewsIQ- {props.category === 'general' ? 'Home' : props.category.charAt(0).toUpperCase() + props.category.slice(1)}</h1>

            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={results.length}
                next={fetchMoreData}
                hasMore={nextPage != null}
                loader={<Spinner />}
            >

                <div className='container my-3'>
                    <div className="row">

                        {results.map(element => {
                            return <div className="col-md-4" key={element.link}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0,300) : ""} imageUrl={element.image_url ? element.image_url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo7Wl5Dx7HY7QfXZklodsyOYlmwdXpAsREnw&usqp=CAU'} newsUrl={element.link} author={element.creator} publishedAt={element.pubDate} source={element.source_id} />
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
    category: 'top'
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
}
