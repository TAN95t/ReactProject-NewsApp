import React from 'react'
import defaultImg from '../defaultImg.png'


const NewsItem = (props) => {
        let { title, description, imageurl, newsurl, author, date, source } = props;
        return (
            <div className="my-3">
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: "90%", zIndex: "1" }}>{source}
                    </span>
                    <img src={!imageurl ? defaultImg : imageurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem


// 052474b1e1e54eb6afaacc712ecc01f5