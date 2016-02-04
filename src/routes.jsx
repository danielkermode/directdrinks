import React     from 'react';
import { Route } from 'react-router';
//containers
import {AppContainer} from './containers/App'
import {HomePageContainer} from './containers/HomePage'
import {ProductsPageContainer} from './containers/ProductsPage'
import {OrdersPageContainer} from './containers/OrdersPage'
import {SettingsPageContainer} from './containers/SettingsPage'

export default (
  <Route path="/" component={AppContainer}>
    <Route path="/home" component={HomePageContainer} />
    <Route path="/products" component={ProductsPageContainer} />
    <Route path="/orders" component={OrdersPageContainer} />
	<Route path="/settings" component={SettingsPageContainer} />
  </Route>
);



		  