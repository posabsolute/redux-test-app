import React from 'react';
import 'style!./issue.scss';
import ListItem from 'components/list/list-item-small';
import Time from 'react-time';

export default (props) => (
  <div className="issue-status">
    <div className="list-data__row">
      <div className="issue__subject">
        {props.summary}
      </div>
    </div>
    <div className="list-data__row">
      <ListItem label="Priority" text={props.priority.name} />
      <ListItem label="Resolution" text={props.status.name} />
    </div>
    <div className="list-data__row">
      <ListItem label="Assignee" text={ props.assignee ? props.assignee.displayName : 'Unassigned'} />
      <ListItem label="Story Points" text={props[props.pointField]} />
    </div>
    <div className="list-data__row">
      <ListItem label="Closed Sprint" text={props.closedSprints[0].name} />
      <ListItem label="Resolution Date" text={<Time value={props.resolutiondate} format="MMMM DD, YYYY" />} />
    </div>
  </div>
);
