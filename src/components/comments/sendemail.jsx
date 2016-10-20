import React from 'react';
import 'style!./comment.scss';

export default ({link, subject, id, openIssue}) => (
  <div className="email">
  	<h3>Related</h3>
    <a className="email-link" href={`mailto:?subject=About ${id}&body=${subject}, ${link}`}>Send an email about this issue</a>
    <a className="email-link" onClick={openIssue}>View in web browser on Atlassian</a>
  </div>
);
