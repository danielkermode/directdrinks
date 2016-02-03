import {HomePageContainer} from './HomePage'
import React, {Component} from 'react';
import {Map} from 'immutable';

import {Nav, NavItem, Navbar} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as serverActions from '../redux/reducers/server'

export class App extends Component {

	logout = () => {
	  this.props.actions.resetStatus();
	  this.props.actions.resetError();
	  this.props.actions.logout(); 
	};

  render() {
    return (
      <div>
        <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <LinkContainer to="/home">
                  <a href='#'>Home</a>
                </LinkContainer>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav bsStyle="tabs">
              {!this.props.user && 
              <Nav bsStyle="tabs">
	              <LinkContainer to="/login">
	                <NavItem href="#">Login</NavItem>
	              </LinkContainer>             
              </Nav>}
              {this.props.user && 
              <Nav bsStyle="tabs">
                <LinkContainer to="/products">
                  <NavItem href="#">Products</NavItem>
                </LinkContainer>  
                <LinkContainer to="/orders">
                  <NavItem href="#">Orders</NavItem>
                </LinkContainer>
                <LinkContainer to="/settings">
                  <NavItem href="#">Settings</NavItem>
                </LinkContainer>
	              	<NavItem onClick={this.logout} href="#">Logout</NavItem>
	              <p className="navbar-text">Welcome, {this.props.user.username}!</p> 
              </Nav>}
            </Nav>
        </Navbar>
        {this.props.location.pathname==="/" && <HomePageContainer/>}
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  		//as in app container, don't use ...state when we use react-redux-router as we never want all the state.
      user: state.server.user
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

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)