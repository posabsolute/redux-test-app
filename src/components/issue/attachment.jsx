import React from 'react';
import 'style!./issue.scss';

export default ({attachment}) => (
    <div className="attachment-container">
      <h3>Attachments</h3>
      <ul>
        { attachment.map((item) =>
          <li className="attachment-item" onClick={() => window.open(item.content)}>{item.filename}
            <span className="comment__meta"> from {item.author.name}</span>
          </li>
        )}
      </ul>
    </div>
);
