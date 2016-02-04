import React, {Component} from 'react';
import {Map} from 'immutable';

// redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as serverActions from '../redux/reducers/server'
import * as productsActions from '../redux/reducers/products'

//components
import {ProductBox} from '../components/ProductBox'
import ProductForm from '../components/ProductForm'

/* create container as stateless function to indicate pure component */
export class ProductsPage extends Component {

	constructor(props) {
	    super(props);
	    this.state = {showAddForm: false};
	  }

	resetError = () => {
		this.props.actions.resetStatus(); this.props.actions.resetError()
	};

	toggleAddForm = () => {
		this.props.actions.toggleAddForm()
	};

	render() {
		return (
			<div>	  
			  {this.props.products.addFormVisible?
			  <div>
				  <button className='btn btn-warning' onClick={this.toggleAddForm}> Cancel </button>
				  <ProductForm actions={this.props.actions} productsError={this.props.products.productsError} submitText='Add Product'/>
				</div>
			  :
			  <div>
			  	<button className='btn btn-info' onClick={this.toggleAddForm}> Add Product </button>
			  	<hr />
			  </div>
			  }
			  <h3 style={{color: "brown"}}> Products </h3>
			  	{Object.keys(this.props.products.list).map((index) => {
			  		return <ProductBox
			  			index={index}
			  			key={index}
			  			picture={this.props.products.list[index].picture}
			  			name={this.props.products.list[index].name}
			  			price={this.props.products.list[index].price}
			  			actions={this.props.actions}
			  		/>
			  	})}	  	
			</div>
		);
	}
}

/* NOTE: Add <DevTools /> in before the last div to debug with Redux Devtools */

function mapStateToProps(state) {
  return {
      server: state.server,
      products: state.products
  };
}

//actions are array for mapDispatchToProps
const actions = [serverActions, productsActions];

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export const ProductsPageContainer = connect(mapStateToProps, mapDispatchToProps)(ProductsPage)