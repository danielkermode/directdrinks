import React, {Component} from 'react';
import {Map} from 'immutable';
import { LinkContainer } from 'react-router-bootstrap';

//components
import LoginForm from '../components/LoginForm'

// redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as serverActions from '../redux/reducers/server'

/* create container as stateless function to indicate pure component */
export class HomePage extends Component {

  logout = () => {
    this.props.actions.resetStatus();
    this.props.actions.resetError();
    this.props.actions.logout(); 
  };

	render() {
		return (
			<div> <h1 style={{color: "brown"}}> Direct Drinks Admin </h1> 
      <br/>    
        {!this.props.server.user?
        <div>
          <LoginForm actions={this.props.actions} />
        </div> :
        <button onClick={this.logout}className="btn btn-primary"> Logout </button>
      }
      </div>
		);
	}
}

function mapStateToProps(state) {
  return {
      //as in app container, don't use ...state when we use react-redux-router as we never want all the state.
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

export const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage)