import React from 'react';
import CommentComponent from './comment';
import 'style!./comment.scss';

export default ({comments}) => (
  <div className="comments">
    <h3>Comments</h3>
    { comments.map((comment, index) =>
      <CommentComponent key={`comment_${index}`} {...comment} />
    )}
  </div>
);
