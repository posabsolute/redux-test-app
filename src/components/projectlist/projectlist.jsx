import React from 'react';
import HeaderSection from 'components/header-section/header-section.jsx';
import ListItem from 'components/list/list-item.jsx';

const ProjectListComponent = ({projects, loadSprints}) => {
  return (
    <section className="row">
      <HeaderSection title={"Project List"} background={"/images/pjbg.jpg"} />
      <div className="list-item_container col-lg-12">
        {projects.map((project, index) =>
          <ListItem
            index={index}
            onClick={loadSprints}
            title={project.name}
            desc={project.type}
            listItem={project}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectListComponent;
