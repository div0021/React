import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, discription, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",
                       right:0}}>
          <span
            className="badge rounded-pill bg-danger">
            {source}
          </span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{discription}</p>
            <p className="card-text">
              <small className="text-muted">
                {author === "" ? "By Unknown" : "By " + author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>

            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark btn-sm"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
