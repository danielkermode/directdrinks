import Backend from '../backend'
import Promise from 'bluebird'

const theBackend = new Backend();
/* asynchronous actions */
/* *************************** */
const initialState = {list: [], status: 1, ordersError: null}

//this get orders for specific user of admin interface
export const GET_ORDERS_SUCCESS = 'orders/GET_ORDERS_SUCCESS'
export const GET_ORDERS_ERROR = 'orders/GET_ORDERS_ERROR'
export const getOrders = (user) => {
	return dispatch => {
		theBackend.getOrders(user).then(orders => {
			return dispatch({
				type: GET_ORDERS_SUCCESS,
				orders: orders})
			})
		.catch(error => {
			return dispatch({
				type: GET_ORDERS_ERROR,
				error: error
			})
		})
	}
}

/* orders reducer */

export const orders = (state = initialState, action) => {
	let newOrders = state.list.slice()

	switch(action.type) {

	case GET_ORDERS_SUCCESS:
		newOrders = action.orders
		return {...state, list: newOrders}

	case GET_ORDERS_ERROR:
		return {
			...state,
			status: 2,
			ordersError: action.error
		}

	default:
		return state
	}
}