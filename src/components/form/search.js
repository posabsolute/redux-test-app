import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


export default class LoginComponent extends React.Component {
  componentWillMount() {

  }
  render() {

    return (
      <form className="relative" onSubmit={ (evt) => { evt.preventDefault(); this.props.onSubmit(evt); } }>
        <input
          type="text"
          onChange={this.props.onChange}
          className="input-line input-line--red"
          placeholder="Search Issues"
          defaultValue={this.props.defaultValue}
        />
        <button className="icon-search icon ion-ios-search flip-horizontal"></button>
      </form>

    );
  }
}
