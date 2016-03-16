/*
  Page Component

  Check that the passed state is not empty

 <PageWrapper state={} wrap={myJSX} />;
*/

import React from 'react';
import 'style!./loader.scss';

export default class PageWrapper extends React.Component {
  componentWillMount() {
    this.hasOwnProperty = Object.prototype.hasOwnProperty;
  }

  isEmpty(obj) {
    // null and undefined are "empty"
    if (!obj) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.hasOwnProperty('size')) {
      if (obj.size > 0) return false;
      if (obj.size === 0) return true;

    }else {
      if (obj.length > 0) return false;
      if (obj.length === 0) return true;
    }

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (const key in obj) {
      if (this.hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  }

  getComponent() {
    if ((this.props.state && this.isEmpty(this.props.state)) || this.props.isLoading === true) {
      return this.getLoader();
    }
    if (this.props.stateExist === null) {
      return this.getLoader();
    }
    return this.getPage(this.useLoader);
  }

  getPage() {
    return this.props.wrap();
  }

  getLoader() {
    return (
      <div className="loader" key={this.props.loaderKey}>
        <div className="button--loading loader--fixed loader--medium loader--blue"></div>
      </div>
    );
  }

  render() {
    const Component = this.getComponent();
    return Component;
  }
}

PageWrapper.propTypes = {
  stateExist: React.PropTypes.any,
  loaderKey: React.PropTypes.string,
  state: React.PropTypes.any,
  isLoading: React.PropTypes.bool,
  wrap: React.PropTypes.any,
};

