import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    let {title,description,imgurl,newsurl,author,date,source}=this.props;
    return (
      <div>
        <div className="card" style={{width: '18rem'}}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1',marginTop: '15px',marginLeft: '-4px'}}>{source}</span>
  <img src={imgurl?imgurl:"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className='card-text'><small className='text-muted'>By {author} on {date}</small></p>
    <a href={newsurl} target="_blank" className="btn btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}
