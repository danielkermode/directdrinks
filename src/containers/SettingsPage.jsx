import React, {Component} from 'react';
import {Map} from 'immutable';

//components
import {LoginForm} from '../components/LoginForm'
// redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as serverActions from '../redux/reducers/server'

/* create container as stateless function to indicate pure component */
export class SettingsPage extends Component {

	resetError = () => {
		this.props.actions.resetStatus(); this.props.actions.resetError()
	};

	render() {
		return (
			<div>
			Settings go here.
				{this.props.server.serverError? <div className="alert alert-danger">
				<a className="close" onClick={this.resetError} ariaLabel="close">&times;</a>
				<span className="glyphicon glyphicon-exclamation-sign"></span>
				&nbsp;Something went wrong, sorry. Check your internet connection. <span style={{fontWeight: "bold"}}>
				&nbsp;&nbsp;&nbsp;&nbsp;
				Error:&nbsp;&nbsp;</span> <i>{this.props.server.serverError.message}</i> </div>: <div></div>}
			</div>
		);
	}
}

/* NOTE: Add <DevTools /> in before the last div to debug with Redux Devtools */

function mapStateToProps(state) {
  return {
      server: state.server
  };
}

//actions are array for mapDispatchToProps
const actions = [serverActions];

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export const SettingsPageContainer = connect(mapStateToProps, mapDispatchToProps)(SettingsPage)