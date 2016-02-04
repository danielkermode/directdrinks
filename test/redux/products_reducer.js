import {expect} from 'chai'

import {products} from '../../src/redux/reducers/products'
import * as productsActions from '../../src/redux/reducers/products'

describe('products reducer', () => {

	let initialState
	beforeEach(() => {
		const action = {
			type: 'dummy'
		}
		initialState = products({list: [{product: 'a product'}, {product: 'another'}], addFormVisible: false, status: 1, productsError: null}, action)
	})

	it('remove products success', () => {
		let next = products(initialState, {
			index: 1,
			name: 'asd',
			type: productsActions.REMOVE_PRODUCT_SUCCESS
		})
		expect(next.status).to.equal(1)
		expect(next.list.length).to.equal(1)
		expect(next.list[0].product).to.equal('a product')
	})

	it('add products success', () => {
		let next = products(initialState, {
			picture: 'nice pic',
			name: 'lemonade',
			price: 123,
			type: productsActions.ADD_PRODUCT_SUCCESS
		})
		expect(next.list.length).to.equal(3)
		expect(next.list[2].picture).to.equal('nice pic')
		expect(next.list[2].price).to.equal(123)
	})

	it('toggles add form', () => {
		let next = products(initialState, {
			type: productsActions.TOGGLE_ADD_FORM
		})
		expect(next.addFormVisible).to.equal(true)
	})
})