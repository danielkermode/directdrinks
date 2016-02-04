import React, {Component} from 'react';


export class ProductBox extends Component {

	removeProduct = () => {
		this.props.actions.removeProduct(this.props.index, this.props.name)
	};

	render() {
		return (
			<div className='well'>
				<div> Name: {this.props.name} </div>
				<div> Price($): {this.props.price} </div> 
				<div> <img src={this.props.picture} /> </div>
				<button className='btn btn-danger' onClick={this.removeProduct}> Remove Product </button>
			</div>
		);
	}
}

