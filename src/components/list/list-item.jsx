import React from 'react';
import 'style!./list.scss';

const ListItemComponent = ({onClick, listItem, index, title, desc}) => (
<div
	className="list-item"
	onClick={(evt) => {evt.preventDefault(); onClick(listItem); }}
	key={'project_' + index} >
    <div className="list-item__title">{title}</div>
    <div className="list-item__desc">{desc}</div>
</div>
);

export default ListItemComponent;
