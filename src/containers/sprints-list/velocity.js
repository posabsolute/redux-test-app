import React from 'react';
import { connect } from 'react-redux';

import PageWrapper from 'components/page-wrapper';
import Velocity from 'components/charts/velocity';

import {sprintsVelocitySelector} from 'selectors/velocity.selector';

const mapStateToProps = state => ({
  sprints: state.sprints,
  velocity: state.velocity,
  formattedVelocity: sprintsVelocitySelector(state).formattedVelocity,
});

const mapDispatchToProps = dispatch => {
  return {};
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SprintsListContainer extends React.Component {
  componentWillMount() {
    this.props.showSprintsListBottomBar(2);
  }
  page() {
    return (
      <section className="row pageRow">
        <Velocity dataset={this.props.formattedVelocity} />
      </section>
    );
  }
  render() {
    return (
      <PageWrapper state={this.props.formattedVelocity} wrap={this.page()} />
    );
  }
}

SprintsListContainer.propTypes = {
  fetchVelocity: React.PropTypes.func,
  showSprintsListBottomBar: React.PropTypes.func,
  formattedVelocity: React.PropTypes.object,
};
