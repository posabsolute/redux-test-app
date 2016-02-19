import React from 'react';
import 'style!./issue.scss';

import {getFormatDate} from 'utils/dates';

export default (props) => (
<div className="issue-status">
  <div className="list-data__row">
    <div className="issue__subject">
      {props.summary}
    </div>
  </div>

  <div className="list-data__row">
    <div className="list-data__item">
      <label className="list-data__item__label">Priority</label>
      <div>{props.priority.name}</div>
    </div>
    <div className="list-data__item">
      <label className="list-data__item__label">Resolution</label>
      <div>{props.resolution.name}</div>
    </div>
  </div>

  <div className="list-data__row">
    <div className="list-data__item">
      <label className="list-data__item__label">Assignee</label>
      <div>{props.assignee.displayName}</div>
    </div>
    <div className="list-data__item">
      <label className="list-data__item__label">Story Points</label>
      <div>{props.customfield_10004}</div>
    </div>

  </div>

  <div className="list-data__row">
    <div className="list-data__item">
      <label className="list-data__item__label">Closed Sprint</label>
      <div>{props.closedSprints[0].name}</div>
    </div>
    <div className="list-data__item">
      <label className="list-data__item__label">Resolution</label>
      <div>{getFormatDate(props.resolutiondate, true)}</div>
    </div>
  </div>
</div>
);