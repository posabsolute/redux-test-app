import React from 'react';
import HeaderSection from 'components/header-section/header-section.jsx';
import ListItem from 'components/list/list-item.jsx';

const SprintsListComponent = ({sprint, loadIssue, getFormatDate}) => {
  return (
    <section className="row">
      <HeaderSection title={sprint.name} background={"/images/pjbg.jpg"} />
      <div className="list-item_container col-lg-12">
        {sprint.issues.map((issue, index) =>
          <ListItem
            index={index}
            onClick={loadIssue}
            title={issue.fields.summary}
            desc={getFormatDate(issue.fields.resolutiondate)}
            listItem={issue}
          />
        )}
      </div>
    </section>
  );
};

export default SprintsListComponent;
