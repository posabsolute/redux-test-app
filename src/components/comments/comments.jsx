import React from 'react';
import Comment from './comment';
import 'style!./comment.scss';

export default ({comments}) => (
  <div className="comments">
    <h3>Comments</h3>
    { comments.map((comment) =>
      <Comment {...comment} />
    )}
  </div>
);
