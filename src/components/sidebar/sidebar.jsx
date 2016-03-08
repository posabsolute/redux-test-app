import React from 'react';
import classNames from 'classnames/bind';
import IssueSearch from 'components/form/search';

/* component styles */
import 'style!./sidebar.scss';
import 'style!../list/list.scss';

export default ({status, user, hideSidebar, logout, loadSprints, loadProjects, configs, onSubmit}) => {

  const sidebarClass = classNames('sidebar', {
    'sidebar--show': status === 'show' ? true : false,
    'sidebar--hiding': status === 'hide' ? true : false,
    'sidebar--hidden': status === 'hidden' ? true : false,
  });

  return (
    <section className={sidebarClass} >
      <div className="aright"><a onClick={(evt) => {evt.preventDefault(); hideSidebar();}} className="icon ion-ios-close-empty sidebar_close-btn"></a></div>
      <div className="sidebar_user cf">
        <img src={user.avatarUrls['48x48']} className="sidebar_avatar" />
        <div className="sidebar_avatar_desc">
          <div className="sidebar_avatar_name">{user.displayName}</div>
          <div className="sidebar_avatar_title">{user.emailAddress}</div>
        </div>
      </div>
      <div className="sidebar_list sidebar__search-container">
        <IssueSearch
          onSubmit={onSubmit}
        />
      </div>
      <div className="sidebar_list" onClick={loadProjects}>
        Projects
      </div>
      { configs.project.id ?
        <div className="sidebar_list" onClick={loadSprints}>
          Sprints <small className="sidebar__small"> from {configs.project.name}</small>
        </div>
        : null
      }
      <div className="sidebar_list" onClick={logout}>Logout</div>
      <div className="sidebar_list nobb">
        <label className="sidebar_label">Questions or feedback?</label>
        <a className="sidebar_link" href="mailto:feedback@position-absolute.com">feedback@position-absolute.com</a>
      </div>
    </section>
  );
};
