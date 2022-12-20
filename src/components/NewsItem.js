import React from 'react'

export default function NewsItem(props) {

    let { title, description, imageUrl, newsUrl, author, publishedAt, source } = props
    return (
      <div className='my-3'>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:1 }}>
        {source}
          <span className="visually-hidden">unread messages</span>
        </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
            <p className="card-text my-3 text-danger">{author?author:"Unknown"} {publishedAt} </p>
          </div>
        </div>
      </div>
    )
  }

