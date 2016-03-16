import React from 'react';
import ReactHighcharts from 'react-highcharts/bundle/ReactHighcharts';

import 'style!./chart.scss';

export default class BurndownComponent extends React.Component {
  componentWillMount() {
  }

  getCats() {
    return this.props.dataset.map((data, index) => 'Day ' + (index + 1));
  }

  getIdealBurn() {
    const idealValue = this.props.dataset[0] / (this.props.dataset.length - 1);
    const burn = this.props.dataset.map((data, index) => {
      const step = this.props.dataset.length - (index + 1);
      return idealValue * step;
    });
    return burn;
  }

  getOptions() {
    return {
      title: {
        text: null,
        x: -20,
      },
      colors: ['blue', 'red'],
      plotOptions: {
        line: {
          lineWidth: 3,
        },
        tooltip: {
          hideDelay: 200,
        },
      },
      subtitle: {
        text: null,
        x: -20,
      },
      xAxis: {
        categories: this.getCats(),
      },
      credits: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: null,
        },
        plotLines: [{
          value: 0,
          width: 1,
        }],
      },
      tooltip: {
        valueSuffix: ' hrs',
        crosshairs: true,
        shared: true,
      },
      series: [{
        name: 'Ideal Burn',
        color: 'rgba(255,0,0,0.25)',
        lineWidth: 2,
        data: this.getIdealBurn(),
      }, {
        name: 'Actual Burn',
        color: 'rgba(0,120,200,0.75)',
        marker: {
          radius: 6,
        },
        data: this.props.dataset,
      }],
    };

  }

  render() {
    return (<ReactHighcharts config={this.getOptions()} />);
  }
}

BurndownComponent.propTypes = {
  dataset: React.PropTypes.array,
};

