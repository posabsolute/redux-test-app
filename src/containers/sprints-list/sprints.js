import React from 'react';
import { updatePath } from 'redux-simple-router';
import { connect } from 'react-redux';

import List from 'components/list/list-container';
import HeaderSection from 'components/header-section/header-section';
import PageWrapper from 'components/page-wrapper';

import {sprintsListSelector} from 'selectors/sprints.selector';

const mapStateToProps = state => ({
  sprints: state.sprints,
  sprintsByDate: sprintsListSelector(state).sprintsByDate,

});
const mapDispatchToProps = dispatch => {
  return {
    loadSprint: (sprint) => {
      dispatch(updatePath(`/sprint/${sprint.id}/index`));
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
      <section className="row">
        <HeaderSection title={"Your Sprints"} background={"images/img2.jpg"} />
        <List
          items={this.props.sprintsByDate}
          onClick={this.props.loadSprint}
          map={{title: 'name', desc: 'dateFormatted'}} />
      </section>
    );
  }

  render() {
    return (
      <PageWrapper state={this.props.sprints} wrap={this.page()} />
    );
  }
}

SprintsListContainer.propTypes = {
  fetchSprints: React.PropTypes.func,
  loadSprint: React.PropTypes.func,
  showSprintsListBottomBar: React.PropTypes.func,
  sprintsByDate: React.PropTypes.object,
  loadSprints: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
  params: React.PropTypes.object,
};
