import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as sprintActions from 'actions/sprints.action';

import PageWrapper from 'components/page-wrapper';
import DevTable from 'components/devtable/devtable.jsx';

import {devWorkSelector} from 'selectors/developers-work.selector';

const mapStateToProps = state => ({
  sprint: state.sprint,
  devsWorkDataset: devWorkSelector(state).devsWorkDataset,
});

const mapDispatchToProps = dispatch => {
  return {

    ...bindActionCreators(sprintActions, dispatch),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class DevelopersContainer extends React.Component {
  componentWillMount() {
    const sprintId = this.props.params.id;
    this.props.showSprintBottomBar(3);
  }

  page() {
    console.log(this.props.devsWorkDataset)
    return (
      <section className="row pageRow pagePad">
        <DevTable dataset={this.props.devsWorkDataset} />
      </section>
    );
  }

  render() {
    return (
      <PageWrapper state={this.props.devsWorkDataset} wrap={this.page()} />
    );
  }
}

DevelopersContainer.propTypes = {
  fetchDevs: React.PropTypes.func,
  fetchSprintReport: React.PropTypes.func,
  params: React.PropTypes.object,
  fetchBurndown: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
};