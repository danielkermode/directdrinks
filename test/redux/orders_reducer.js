import {expect} from 'chai'

import {orders} from '../../src/redux/reducers/orders'
import * as ordersActions from '../../src/redux/reducers/orders'

describe('orders reducer', () => {

	let initialState
	beforeEach(() => {
		const action = {
			type: 'dummy'
		}
		initialState = orders(undefined, action)
	})

	it('get orders success', () => {
		let next = orders(initialState, {
			type: ordersActions.GET_ORDERS_SUCCESS,
			orders: [{order: 'an order'}]
		})
		expect(next.status).to.equal(1)
		expect(next.orders[0].order).to.equal('an order')
	})

	it('get orders error', () => {
		let next = orders(initialState, {
			type: ordersActions.GET_ORDERS_ERROR,
			error: 'specific error message'
		})
		expect(next.status).to.equal(2)
		expect(next.ordersError).to.equal('specific error message')
	})

})