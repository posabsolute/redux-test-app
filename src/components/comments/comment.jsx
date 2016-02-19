import React from 'react';
import 'style!./comment.scss';
import {getFormatDateTime} from 'utils/dates';


export default ({body, created, author}) => (
  <div className="comment">
    <div className="comment__gravatar">
    	<img />
    </div>
    <div className="comment__text__container">
    	<div className="comment__text">
    		{body}
    	</div>
    	<div className="comment__meta">
            <span className="comment__date">{getFormatDateTime(created)}</span>
            <span className="comment__spacer">.</span>
            <span className="comment__author">{author.displayName}</span>
    	</div>
    </div>
  </div>
);
