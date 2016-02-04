import Backend from '../backend'
import Promise from 'bluebird'
import { routeActions } from 'react-router-redux'

const theBackend = new Backend();

const initialState = {
	status: 0,
	loggedIn: false,
	serverError: null,
	user: null
}

/* error actions */
/* *************************** */
export const SERVER_SUCCESS = 'server/SERVER_SUCCESS'
export const serverSuccess = () => {
	return {
		type: SERVER_SUCCESS
	}
}

export const SERVER_ERROR = 'server/SERVER_ERROR'
export const serverError = (error) => {
	return {
		type: SERVER_ERROR,
		error
	}
}

export const RESET_STATUS = 'server/RESET_STATUS'
export const resetStatus = () => {
	return {
		type: RESET_STATUS
	}
}

export const RESET_ERROR = 'server/RESET_ERROR'
export const resetError = () => {
	return {
		type: RESET_ERROR
	}
}

/* *************************** */

/* backend actions */
/* *************************** */

export const LOGIN_SUCCESS = 'server/LOGIN_SUCCESS'
export const LOGIN_ERROR = 'server/LOGIN_ERROR'
export const login = (username, password) => {
	return dispatch => {
		// loginToParse. first index of array is email, second is phrase pairs stored with user.
		theBackend.login(username,password).then(result => {
			return dispatch({
				user: {
				  email: result+'@'+result+'.'+result,
				  username: result,
				  password: 'hidden'
				},
				type: LOGIN_SUCCESS
			})
		}).then(state => {
			return dispatch(routeActions.push('/products'))
		}).catch(error => {
			return dispatch({
				type: LOGIN_ERROR,
				error: error
			})
		})
	}
}

export const LOGOUT = 'server/LOGOUT'
export const logout = () => {
	return dispatch => {
		theBackend.logout().then(success => {
			return dispatch({
				type: LOGOUT,
				user: null
			})
		}).then(state => {
			return dispatch(routeActions.push('/home'))
		})
	}
}


/* ************************* */

export const server = (state = initialState, action) => {
	let user = state.user;	

	// if (action == undefined) return state
	switch (action.type) {

		case SERVER_SUCCESS:
			return {
				...state,
				status: 1,
				serverError: null
			}

		case SERVER_ERROR:
			return {
				...state,
				status: 2,
				serverError: action.error
			}

		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.user,
				loggedIn: true
			}

		case LOGIN_ERROR:
			return {
				...state,
				status: 2,
				serverError: action.error
			}

		case LOGOUT:
			return {
				...state,
				user:  action.user,
				loggedIn: false
			}

		case RESET_STATUS:
			return {
				...state,
				status: 0
			}

		case RESET_ERROR:
			return {
				...state,
				serverError: null
			}

		default:
			return state
	}
}
