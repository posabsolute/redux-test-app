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
    console.log(obj);
    // null and undefined are "empty"
    if (obj == null) return true;

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
    if (!this.isEmpty(this.props.state)) {
      return this.getPage(this.useLoader);
    }
    return this.getLoader();
  }

  getPage() {
    return (<div key={"page"}>{this.props.wrap}</div>);
  }

  getLoader() {
    return (<div key={"loader"} className="button--loading loader--fixed loader--medium loader--blue"></div>);
  }

  render() {
    const Component = this.getComponent();
    return Component;
  }
}

PageWrapper.propTypes = {
  state: React.PropTypes.obj,
  wrap: React.PropTypes.func,
};

