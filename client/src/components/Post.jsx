import React from "react";
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const Post = ({_id, title, summary, file, author, createdAt}) => {
    return (
        <div className="post">
          <div className="image">
            <Link to={`/post/${_id}`}>
              <img src={process.env.REACT_APP_BASE_URL + '/' + file} alt="No Image" />
            </Link>
          </div>
          <div className="texts">
            <Link to={`/post/${_id}`}>
              <h2>{title}</h2>
            </Link>
            <p className='info'>
              <a href="/" className="author">{author.username}</a>
              <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
            </p>
            <p className='summary'>{summary}</p>
          </div>
        </div>
    )
}

export default Post;