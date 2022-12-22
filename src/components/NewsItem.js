import React from 'react'

export default function NewsItem(props) {

    let { title, description, imageUrl, newsUrl, author, publishedAt, source } = props
    return (
      <div className='my-3'>
        <div className="card" style={{ height: "35rem", boxSizing: "border-box" }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:1 }}>
        {source}
          <span className="visually-hidden">unread messages</span>
        </span>
          <img src={imageUrl} className="card-img-top" alt="..." style={{ height: "40%" }}/>
          <div className="card-body" style={{ height: "60%" }}>
            <h5 className="card-title" style={{ maxHeight: "25%" }}>{title}</h5>
            <p className="card-text" style={{ maxHeight: "50%", overflow: "hidden" }}>{description}</p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark" style={{ height: "12%" }}>Read More</a>
            <p className="card-text my-3 text-danger" style={{ height: "11%" }}>{author?author:"Unknown"} {publishedAt} </p>
          </div>
        </div>
      </div>
    )
  }

