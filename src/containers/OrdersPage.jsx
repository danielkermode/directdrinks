import React, {Component} from 'react';
import {Map} from 'immutable';
import {OrderBox} from '../components/OrderBox'

// redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ordersActions from '../redux/reducers/orders'


/* create container as stateless function to indicate pure component */
export class OrdersPage extends Component {

  componentDidMount() {
    this.props.actions.getOrders(this.props.user)
  };

	render() {
		return (
			<div>
      <h3 style={{color: "brown"}}> Orders </h3>
      <br/>    
        {this.props.user &&
          Object.keys(this.props.orders).map((index) => {
            return (<OrderBox
                    order={this.props.orders[index]}
                    key={index}
                    index={index} />)
          })
        }
      </div>
		);
	}
}

function mapStateToProps(state) {
  return {
      //as in app container, don't use ...state when we use react-redux-router as we never want all the state.
      user: state.server.user,
      orders: state.orders
  };
}

//actions are array for mapDispatchToProps
const actions = [ordersActions];

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

export const OrdersPageContainer = connect(mapStateToProps, mapDispatchToProps)(OrdersPage)