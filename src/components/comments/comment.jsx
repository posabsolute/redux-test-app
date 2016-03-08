import React from 'react';
import 'style!./comment.scss';
import Time from 'react-time';
import ReactMarkdown from 'react-markdown';

export default ({body, created, author}) => (
  <div className="comment">
   <div className="comment__text__container">
      <div className="comment__text">
        <ReactMarkdown source={body} />
      </div>
      <div className="comment__meta">
        <span className="comment__date"><Time value={created} format="MMMM DD, YYYY [at] h:mm a" /></span>
        <span className="comment__spacer">.</span>
        <span className="comment__author">{author.displayName}</span>
      </div>
   </div>
  </div>
);
