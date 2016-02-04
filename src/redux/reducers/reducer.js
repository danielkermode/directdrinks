import { combineReducers } from 'redux'
import {products} from './products'
import {server} from './server'
import {orders} from './orders'
import { routeReducer } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'

export const reducers = combineReducers({
	products,
	server,
	orders,
	routing: routeReducer,
	form: formReducer
})

