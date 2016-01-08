import React from 'react';
import HeaderSection from 'components/header-section/header-section.jsx';
import ListItem from 'components/list/list-item.jsx';

const SprintsListComponent = ({sprintsOrdered, loadSprint, getFormatDate}) => {
  return (
    <section className="row">
      <HeaderSection title={"Your Sprints"} background={"/images/pjbg.jpg"} />
      <div className="list-item_container col-lg-12">
        {sprintsOrdered.map((sprint, index) =>
          <ListItem
            index={index}
            onClick={loadSprint}
            title={sprint.name}
            desc={getFormatDate(sprint.completeDate, sprint.completeDate)}
            listItem={sprint}
          />
        )}
      </div>
    </section>
  );
};

export default SprintsListComponent;
