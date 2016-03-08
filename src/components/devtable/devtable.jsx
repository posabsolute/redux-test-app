import React from 'react';
import 'style!./devtable.scss';

export default ({dataset}) => (
  <div>
    <table className="table-data">
      <tbody>
        <tr>
          <th className="left">Developer</th>
          <th>Closed Issues</th>
          <th>SP*</th>
          <th>Reopened</th>
        </tr>
        {dataset.map((dev, index) =>
            <tr key={'table' + index}>
              <td className="left">{dev.assigneeName}</td>
              <td>{dev.completedIssues}</td>
              <td>{dev.storyPoints}</td>
              <td className="table-data__error">{dev.reopenedIssues}</td>
            </tr>
        )}
      </tbody>
    </table>

    <p>*SP (Story points) are calculated as a participation in the story, it does not mean the dev did 100% of the work</p>
    <p>Reopoened issues are the total of time a issue assigned to the dev has been reopened</p>
  </div>
);
