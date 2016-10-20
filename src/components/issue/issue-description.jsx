import React from 'react';
import Textarea from 'react-textarea-autosize';

import 'style!./description.scss';

export default ({description, saveDescription}) => (
	<div className="issue__description">

		<Textarea defaultValue={description || "No Content"} onBlur={saveDescription} />
	</div>
);

