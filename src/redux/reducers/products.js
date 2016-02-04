import Backend from '../backend'
import Promise from 'bluebird'

const theBackend = new Backend();

/* asynchronous actions */
/* *************************** */
const initialState = {list: [], addFormVisible: false, status: 1, productsError: null}

export const ADD_PRODUCT_SUCCESS = 'products/ADD_PRODUCT_SUCCESS'
export const ADD_PRODUCT_ERROR = 'products/ADD_PRODUCT_ERROR'
export const addProduct = (picture, name, price) => {
	return dispatch => {
		theBackend.addProduct(picture, name, price).then(result => {
			return dispatch({
				picture: result.picture,
				name: result.name,
				price: result.price,
				type: ADD_PRODUCT_SUCCESS})
			})
		.catch(error => {
			return dispatch({
				error: error,
				type: ADD_PRODUCT_ERROR
			})
		})
	}
}

export const REMOVE_PRODUCT_SUCCESS = 'products/REMOVE_PRODUCT_SUCCESS'
export const REMOVE_PRODUCT_ERROR = 'products/REMOVE_PRODUCT_ERROR'
export const removeProduct = (index, name) => {
	return dispatch => {
		theBackend.removeProduct(index, name).then(result => {
			return dispatch({
				index,
				name: result.name,
				type: REMOVE_PRODUCT_SUCCESS})
			})
		.catch(error => {
			return dispatch({
				error: error,
				type: REMOVE_PRODUCT_ERROR
			})
		})
	}
}

/* ************Sync*************** */

export const TOGGLE_ADD_FORM = 'products/TOGGLE_ADD_FORM'
export const toggleAddForm = () => {
	return ({
		type: TOGGLE_ADD_FORM
	})
}

/* products reducer */

export const products = (state = initialState, action) => {
	let newProducts = state.list.slice()
	let toggleState = state.addFormVisible

	switch(action.type) {

	case ADD_PRODUCT_SUCCESS:
		newProducts.push({
			picture: action.picture,
			name: action.name,
			price: action.price
		})
		return {...state, list: newProducts}

	case ADD_PRODUCT_ERROR:
		return {
			...state,
			status: 2,
			productsError: action.error
		}

	case REMOVE_PRODUCT_SUCCESS:
		newProducts.splice(action.index, 1)
		return {...state, list: newProducts}

	case REMOVE_PRODUCT_ERROR:
		return {
			...state,
			status: 2,
			productsError: action.error
		}

	case TOGGLE_ADD_FORM:
		toggleState = !toggleState
		return {...state, addFormVisible: toggleState}

	default:
		return state

	}
}
