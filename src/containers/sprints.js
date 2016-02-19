import React from 'react';
import { bindActionCreators } from 'redux';
import { updatePath } from 'redux-simple-router';
import { connect } from 'react-redux';

import List from 'components/list/list-container';
import HeaderSection from 'components/header-section/header-section';

import * as sprintActions from 'actions/sprints.action';
import * as pageActions from 'actions/page.action';
import {sprintsListSelector} from 'selectors/sprints.selector';

const mapStateToProps = state => ({
  sprints: state.sprints,
  sprintsByDate: sprintsListSelector(state).sprintsByDate,

});
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(sprintActions, dispatch),
    ...bindActionCreators(pageActions, dispatch),
    loadSprint: (sprint) => {
      dispatch(updatePath(`/sprint/${sprint.id}`));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SprintsListContainer extends React.Component {
  componentWillMount() {
    this.props.fetchSprints(this.props.params.id);
    this.props.updatePageTitle('Your Sprints', 'Sprints');
  }
  render() {
    return (
      <section className="row">
        <HeaderSection title={"Your Sprints"} background={"/images/pjbg.jpg"} />
        <List
          items={this.props.sprintsByDate}
          onClick={this.props.loadSprint}
          map={{title: 'name', desc: 'dateFormatted'}} />
      </section>
    );
  }
}

SprintsListContainer.propTypes = {
  fetchSprints: React.PropTypes.func,
  loadSprint: React.PropTypes.func,
  sprintsByDate: React.PropTypes.object,
  loadSprints: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
  params: React.PropTypes.object,
};
