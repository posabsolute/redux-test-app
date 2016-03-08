import React from 'react';
import ReactMarkdown from 'react-markdown';

import 'style!./description.scss';

export default ({description}) => (
	<div className="issue__description">
		<ReactMarkdown source={description || 'No Description'} />
	</div>
);

