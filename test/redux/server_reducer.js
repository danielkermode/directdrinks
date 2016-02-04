import {expect} from 'chai'

import {server} from '../../src/redux/reducers/server'
import * as serverActions from '../../src/redux/reducers/server'

describe('server error ACs', () => {

	let initialState
	beforeEach(() => {
		const action = {
			type: 'dummy'
		}
		initialState = server(undefined, action)
	})

	it('serverSuccess', () => {
		let next = server(initialState, serverActions.serverSuccess())

		expect(next.status).to.equal(1)
	})

	it('serverError', () => {
		let next = server(initialState, serverActions.serverError('specific error message'))

		expect(next.status).to.equal(2)
		expect(next.serverError).to.equal('specific error message')
	})

	it('loginError', () => {
		let next = server(initialState, {
			type: serverActions.LOGIN_ERROR,
			error: 'specific error message'
		})

		expect(next.status).to.equal(2)
		expect(next.serverError).to.equal('specific error message')
	})

	it('loginSuccess', () => {
		let next = server(initialState, {
			type: serverActions.LOGIN_SUCCESS
		})

		expect(next.status).to.equal(0)
		expect(next.loggedIn).to.equal(true)
		expect(next.serverError).to.equal(null)
	})


})
