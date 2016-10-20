import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Time from 'react-time';

import List from 'components/list/list-container';
import HeaderSection from 'components/header-section/header-section';
import PageWrapper from 'components/page-wrapper';

import * as bottomBarActions from 'actions/bottom-bar.action';

import {sprintsListSelector} from 'selectors/sprints.selector';

const mapStateToProps = state => ({
  sprintsActive: sprintsListSelector(state).sprintsActive,
  sprints: state.sprints,
  routing: state.routing,
  sprintsByDate: sprintsListSelector(state).sprintsClosedByDate,
});
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(bottomBarActions, dispatch),
    loadSprint: (sprint) => {
      dispatch(push(`/sprint/${sprint.id}/index`));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SprintsListContainer extends React.Component {
  componentWillMount() {
    this.props.showSprintsListBottomBar(1);
  }
  page() {
    return (
      <section className="row row__row--header row__row--bottom" key="sprintsContainer">
        <HeaderSection title={"Your Sprints"} background={"images/img2.jpg"} />
        <h5 className="list-title">Active Sprints</h5>
        <List
          items={this.props.sprintsActive}
          onClick={this.props.loadSprint}
          descMod={(item, sprint) => <div>
            <Time value={sprint.startDate} format="MMMM DD [ to ]" />
            <Time value={sprint.endDate} format="MMMM DD, YYYY" />
          </div>}
          map={{
            title: 'name',
            desc: ['startDate'],
          }} />
        <h5 className="list-title col-xs-12">Closed Sprints</h5>
        <List
          items={this.props.sprintsByDate}
          onClick={this.props.loadSprint}
          descMod={(item, sprint) => <div>
            <Time value={sprint.startDate} format="MMMM DD [ to ]" />
            <Time value={sprint.completeDate} format="MMMM DD, YYYY" />
          </div>}
          map={{
            title: 'name',
            desc: ['startDate'],
          }} />
      </section>
    );
  }

  render() {
    console.log(this.props.sprints);
    return (
      <PageWrapper loaderKey="sprintsLoader" key="sprintsWrapper" state={this.props.sprints} wrap={this.page.bind(this)} />
    );
  }
}

SprintsListContainer.propTypes = {
  fetchSprints: React.PropTypes.func,
  loadSprint: React.PropTypes.func,
  showSprintsListBottomBar: React.PropTypes.func,
  sprintsActive: React.PropTypes.array,
  sprintsByDate: React.PropTypes.object,
  loadSprints: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
  params: React.PropTypes.object,
};
