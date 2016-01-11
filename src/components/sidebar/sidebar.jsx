import React from 'react';
import classNames from 'classnames/bind';

/* component styles */
import 'style!./sidebar.scss';
import 'style!../list/list.scss';

const SidebarComponent = ({status, user, hideSidebar, list}) => {

  const sidebarClass = classNames('sidebar', {
    'sidebar--show': status === 'show' ? true : false,
    'sidebar--hiding': status === 'hide' ? true : false,
    'sidebar--hidden': status === 'hidden' ? true : false,
  });

  return (
    <section className={sidebarClass} >
      <div className="aright"><a onClick={(evt) => {evt.preventDefault(); hideSidebar();}} className="icon ion-ios-close-empty sidebar_close-btn"></a></div>
      <div className="sidebar_user cf">
        <img src={user.avatarUrls['48x48']} className="sidebar_avatar " />
        <div className="sidebar_avatar_desc">
          <div className="sidebar_avatar_name">{user.displayName}</div>
          <div className="sidebar_avatar_title">{user.emailAddress}</div>
        </div>
      </div>
      <div className="sidebar_list">
        Projects <span className="list_numbers">{list.length}</span>
      </div>
        {list.map((elem, index) => {
          return (
            <div className="sidebar_list sidebar_list_indented" key={'sidebar_item_' + index}>
              {elem.name}
            </div>
          );
        })}
      <div className="sidebar_list">Logout</div>
    </section>
  );
};

export default SidebarComponent;
