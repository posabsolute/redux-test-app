import React from 'react';
import marked from 'marked';

import 'style!./description.scss';

export default ({description}) => (
	<div className="issue__description" dangerouslySetInnerHTML={{__html: marked(description)}}></div>
);
