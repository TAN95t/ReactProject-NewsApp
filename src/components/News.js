import React from 'react'
import { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)



    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parcedData = await data.json()
        setArticles(parcedData.articles)
        setTotalResults(parcedData.totalResults)
        setLoading(false)

        props.setProgress(100);

    }

    useEffect(() => {
        document.title = `${props.category} - News Monkey`;
        updateNews();
    }, [])

    // const handleNextClick = async () => {
    //     console.log("Next");
    //     setPage(page + 1)
    //     updateNews();
    // }

    // const handlePreviousClick = async () => {
    //     console.log("Previous");
    //     setPage(page - 1)
    //     updateNews();
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        setLoading(true)
        let data = await fetch(url);
        let parcedData = await data.json()
        setArticles(articles.concat(parcedData.articles))
        setTotalResults(parcedData.totalResults)
        setLoading(false)


    };

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={<h4><Spinner /></h4>}>
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

export default News


News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: "General"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}