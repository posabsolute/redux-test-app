import React from 'react';
import Time from 'react-time';
import Textarea from 'react-textarea-autosize';

import 'style!./issue.scss';

import ListItem from 'components/list/list-item-small';
import SelectForm from 'components/form/select.jsx';

export default (props) => (
  <div className="issue-status">
    <div className="list-data__row">
      <div className="issue__subject">
        <Textarea defaultValue={props.summary} onBlur={props.saveSummary} />
      </div>
    </div>
    <div className="list-data__row">
      <ListItem label="Priority" text="">
        <SelectForm 
          currentValue={props.priority.name}
          filterValues={props.prioritiesName} 
          onChangeEvent={props.assignPriority} />
       </ListItem>
      <ListItem label="Status" text="">
        <SelectForm 
          currentValue={props.status.name}
          filterValues={props.transitionsName} 
          onChangeEvent={props.assignStatus} />
      </ListItem>
    </div>
    <div className="list-data__row">
      <ListItem label="Assignee" text="">
        <SelectForm 
            defaultOption="Unassigned"
            currentValue={props.assignee ? props.assignee.displayName : ""}
            filterValues={props.assignableNames} 
            onChangeEvent={props.assignUser} />
      </ListItem>
      <ListItem label="Story Points" text="">
        <input type="text" defaultValue={props[props.pointField]} onBlur={props.assignPoints} />
      </ListItem>
    </div>
    <div className="list-data__row">
      <ListItem label="Closed Sprint" text={props.closedSprints[0].name} />
      <ListItem label="Resolution Date" text={props.resolutiondate ? <Time value={props.resolutiondate} format="MMMM DD, YYYY" /> : "-"} />
    </div>
  </div>
);
