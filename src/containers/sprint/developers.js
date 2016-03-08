import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as sprintActions from 'actions/sprints.action';
import * as bottomBarActions from 'actions/bottom-bar.action';

import PageWrapper from 'components/page-wrapper';
import DevTable from 'components/devtable/devtable.jsx';

import {devWorkSelector} from 'selectors/developers-work.selector';

const mapStateToProps = state => ({
  sprint: state.sprint,
  devsWorkDataset: devWorkSelector(state).devsWorkDataset,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(bottomBarActions, dispatch),
    ...bindActionCreators(sprintActions, dispatch),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class DevelopersContainer extends React.Component {
  componentWillMount() {
    this.props.showSprintBottomBar(3);
  }

  page() {
    return (
      <section className="row pageRow pagePad">
        <DevTable dataset={this.props.devsWorkDataset} />
      </section>
    );
  }

  render() {
    return (
      <PageWrapper state={this.props.devsWorkDataset} wrap={this.page.bind(this)} />
    );
  }
}

DevelopersContainer.propTypes = {
  fetchDevs: React.PropTypes.func,
  showSprintBottomBar: React.PropTypes.func,
  fetchSprintReport: React.PropTypes.func,
  params: React.PropTypes.object,
  devsWorkDataset: React.PropTypes.object,
  fetchBurndown: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
};
