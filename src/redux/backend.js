/* Backend Factory
*  NOTE: all methods return promises.
*/
import Promise from 'bluebird'
import Parse from 'parse/node'
import _, * as Underscore from 'underscore';

//Parse example if you had these classes in parse

//let Numb = Parse.Object.extend('Numb')
//let allNumbs = new Parse.Query(Numb)

//helper functions! these are used inside the backend class only, so I seperated them from the class.

function getUrl(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    console.log(req)
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

/* getStateFromBackend (eg. Parse) */
/* ******************************************** */
const getState = (user) => {

  return new Promise((resolve, reject) => {

  
    let state = {}
  	console.log("getting state from backend")
  	resolve(state)
  })

}
/* ******************************************** */

export default class Backend {

	constructor() {
		/* PARSE CREDS */

	}

	login(username, password) {
		return new Promise((resolve, reject) => {
		  resolve(username)
		})
	}

	logout(user) {
		return new Promise((resolve, reject) => {
		  resolve(user)
		})
	}

	addProduct(name, fromLanguage, toLanguage) {

	  return new Promise((resolve, reject) => {	
	    
		})
	}

	receiveOrders(currentTranslation) {
		return new Promise((resolve, reject) => {
			resolve('orders arrived!')
		})
	}

	deleteTranslation(objTodelete) {
		return new Promise((resolve, reject) => {
			const current = Parse.User.current();
			const phrasePairs = current.get('PhrasePairs');
			let pairs = phrasePairs.map(function(obj, index){ 
					if(Underscore.isEqual(obj, objTodelete)){
						return;
						} else {
						return obj;
					}
			  });
			pairs = Underscore.compact(pairs)
			current.set('PhrasePairs', pairs)
		  current.save(null, {
		    success: function(current) {
		      // Execute any logic that should take place after the object is saved.
		      resolve(pairs)
		    },
		    error: function(current, error) {
		      // Execute any logic that should take place if the save fails.
		      // error is a Parse.Error with an error code and message.
		      reject(error)
		    }
		  });
		})
	}

}