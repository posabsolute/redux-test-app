import React from 'react';
import ReactHighcharts from 'react-highcharts/bundle/ReactHighcharts';

import 'style!./chart.scss';

export default class VelocityComponent extends React.Component {

  getOptions() {
    return {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Velocity over sprints',
      },
      xAxis: {
        title: {
          text: null,
        },
        categories: this.props.dataset.labels,
      },
      yAxis: {
        title: {
          text: null,
        },
      },
      credits: {
        enabled: false,
      },
      series: [{
        name: 'Estimated Story Points',
        data: this.props.dataset.estimatedPoints,
      }, {
        name: 'Completed Story Points',
        data: this.props.dataset.actualPoints,
      }],
    };
  }

  render() {
    return (<ReactHighcharts config={this.getOptions()} />);
  }
}

VelocityComponent.propTypes = {
  dataset: React.PropTypes.object,
};

