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

	addProduct(picture, name, price) {

	  return new Promise((resolve, reject) => {	
	    resolve({picture, name, price})
		})
	}

	getOrders(user) {
		return new Promise((resolve, reject) => {
      const dummyOrders = []
      const aDate = new Date
      let aDateOne = new Date
      aDateOne.setDate(aDateOne.getDate() + 1)
      const dummyOrderOne = {
          products: [{name: 'lemonade', quantity: 10}, {name: 'fanta', quantity: 1}, {name: 'juice', quantity: 1}],
          timeStamp: aDate.toString(),
          deliveryDate: aDateOne.toString(),
          user: {name: "dan", address: "23 italy road", email: 'asd@asd.asd'}
        }
      let aDateTwo = new Date
      aDateTwo.setDate(aDateTwo.getDate() + 1)
      const dummyOrderTwo = {
          products: [{name: 'lemonade', quantity: 2}],
          timeStamp: aDate.toString(),
          deliveryDate: aDateTwo.toString(),
          user: {name: "marco", address: "22 italy road", email: 'dsa123@das.dsa'}
        }
      dummyOrders[0] = dummyOrderOne
      dummyOrders[1] = dummyOrderTwo
			resolve(dummyOrders)
		})
	}

	removeProduct(index, name) {
		return new Promise((resolve, reject) => {
			resolve({name})
		})
	}

}