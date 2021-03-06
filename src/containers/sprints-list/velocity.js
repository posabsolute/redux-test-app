import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PageWrapper from 'components/page-wrapper';
import Velocity from 'components/charts/velocity';

import * as bottomBarActions from 'actions/bottom-bar.action';

import {sprintsVelocitySelector} from 'selectors/velocity.selector';

const mapStateToProps = state => ({
  sprints: state.sprints,
  velocity: state.velocity,
  formattedVelocity: sprintsVelocitySelector(state).formattedVelocity,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(bottomBarActions, dispatch),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SprintsListContainer extends React.Component {
  componentWillMount() {
    this.props.showSprintsListBottomBar(2);
  }
  page() {
    return (
      <section className="row pageRow row__row--header row__row--bottom" key="veloContainer">
        <Velocity dataset={this.props.formattedVelocity} />
      </section>
    );
  }
  render() {
    return (
      <PageWrapper loaderKey="veloLoader" key="veloWrapper" state={this.props.formattedVelocity} wrap={this.page.bind(this)} />
    );
  }
}

SprintsListContainer.propTypes = {
  fetchVelocity: React.PropTypes.func,
  showSprintsListBottomBar: React.PropTypes.func,
  formattedVelocity: React.PropTypes.object,
};
