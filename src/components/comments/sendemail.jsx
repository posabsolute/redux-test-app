import React from 'react';
import 'style!./comment.scss';

export default ({link, subject, id}) => (
  <div className="email">
  	<h3>Email</h3>
    <a className="email-link" href={`mailto:?subject=About ${id}&body=${subject}, ${link}`}>Send an email about this issue</a>
  </div>
);
