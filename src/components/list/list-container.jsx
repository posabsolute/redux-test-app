import React from 'react';
import ListItem from 'components/list/list-item';

export default ({items, onClick, map}) => (
<div className="list-item_container col-lg-12">
  {items.map((item, index) =>
    <ListItem
      index={index}
      onClick={onClick}
      title={item[map.title]}
      desc={item[map.desc]}
      listItem={item}
    />
  )}
  </div>
);