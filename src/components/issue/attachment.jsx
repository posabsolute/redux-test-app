import React from 'react';
import 'style!./issue.scss';

export default ({attachment}) => (
    <div className="attachment-container">
      <h3>Attachments</h3>
      <ul>
        { attachment.map((item, index) =>
          <li key={`attachment_${index}`} className="attachment-item" onClick={() => window.open(item.content, '_blank', 'location=no,enableViewportScale=yes')}>
            <span>{item.filename}</span>
            <span className="comment__meta">{` from ${item.author.name}`}</span>
          </li>
        )}
      </ul>
    </div>
);
