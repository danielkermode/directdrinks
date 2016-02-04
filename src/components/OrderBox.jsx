import React, {Component} from 'react';


export class OrderBox extends Component {

	render() {
		return (
			<div className='well'>
				<div> <h4 style={{color: "brown"}}> User </h4>
					<div> Name: {this.props.order.user.name} </div>
					<div> Address: {this.props.order.user.address} </div>
					<div> Email: {this.props.order.user.email} </div>
				</div>
				<hr />
				<div> <h4 style={{color: "brown"}}> Products </h4>
				<hr/>
				{Object.keys(this.props.order.products).map((index) => {
          return (<div key={index}>
	          				<div>Name: {this.props.order.products[index].name}</div>
	          				<div>Quantity: {this.props.order.products[index].quantity}</div>
	          				<hr/>
          				</div>)
        	})}
           </div>
				<div> Time Ordered: {this.props.order.timeStamp} </div> 
				<div> Delivery Date: {this.props.order.deliveryDate} </div>	
			</div>
		);
	}
}