import React from 'react';
import 'style!./issue.scss';
import ListItem from 'components/list/list-item-small';
import {getFormatDate} from 'utils/dates';

export default (props) => (
  <div className="issue-status">
    <div className="list-data__row">
      <div className="issue__subject">
        {props.summary}
      </div>
    </div>

    <div className="list-data__row">
      <ListItem label="Priority" text={props.priority.name} />
      <ListItem label="Resolution" text={props.assignee.displayName} />
    </div>

    <div className="list-data__row">
      <ListItem label="Assignee" text={props.priority.name} />
      <ListItem label="Story Points" text={props.customfield_10004} />
    </div>

    <div className="list-data__row">
      <ListItem label="Closed Sprint" text={props.closedSprints[0].name} />
      <ListItem label="Resolution" text={getFormatDate(props.resolutiondate, true)} />
    </div>
  </div>
);