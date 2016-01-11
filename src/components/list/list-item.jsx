import React from 'react';
import Labels from 'components/labels/labels.jsx';
import 'style!./list.scss';

const ListItemComponent = ({onClick, listItem, index, title, desc, labels, floatingLabel}) => (

<div
	className="list-item"
	onClick={(evt) => {evt.preventDefault(); onClick(listItem); }}
	key={'project_' + index} >
    <div className="list-item__title">{title}</div>
    <div className="list-item__desc">{desc}</div>
    <Labels labels={labels} />
    <div className="floating-label">{floatingLabel}</div>
</div>
);

export default ListItemComponent;
