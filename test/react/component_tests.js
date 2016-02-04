import React from 'react';
import {renderIntoDocument} from 'react-addons-test-utils';

import {expect} from 'chai';

import setup_fake_dom from './setup_fake_dom';

let TestUtils = require('react-addons-test-utils');
let assert = require('assert');

import {OrderBox} from '../../src/components/OrderBox';

// CommonJS syntax is used for importing rewire for compatibility
// with babel-loader.
//
// See https://github.com/jhnns/rewire-webpack/issues/12#issuecomment-95797024
// for an explanation
let rewire = require('rewire');

const dummyOrders = []
const aDate = new Date
let aDateOne = new Date
aDateOne.setDate(aDateOne.getDate() + 1)
const dummyOrderOne = {
    products: [{name: 'lemonade', quantity: 10}, {name: 'fanta', quantity: 1}, {name: 'juice', quantity: 1}],
    timeStamp: aDate.toString(),
    deliveryDate: aDateOne.toString(),
    user: {name: "someone", address: "23 italy road", email: 'asd@asd.asd'}
  }

describe('OrderBox', () => {
  it('should render an order', () => {
    const item = renderIntoDocument(
      <OrderBox order={dummyOrderOne}/>
    );
    expect(item.props.order.user.name).to.equal("someone")
  });
});