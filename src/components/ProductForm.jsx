import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {ImageUploadContainer} from './ImageUpload'

export const fields = ['name', 'price','picture'];

class ProductForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    serverError: PropTypes.string
  };

  componentDidMount() {
    this.props.actions.resetStatus();
    this.props.actions.resetError();
  };

  addProduct = () => {
    this.props.actions.toggleAddForm();
    this.props.actions.addProduct(this.props.values.picture, this.props.values.name, this.props.values.price);
  };

  onEnter = (e) => {
    if(e.keyCode === 13){
      //13 is enter
      this.addProduct()
    }
  };

  render() {
    const {
      fields: {name, price, picture},
      handleSubmit,
      resetForm,
      submitting
      } = this.props;
    return (<div>
        <fieldset className="form-group">
          <label>Name</label>
          <div>
            <input className="form-control" type="text" placeholder="Name" {...name} />
          </div>
        </fieldset>
        <fieldset className="form-group">
          <label>Price($)</label>
          <div>
            <input type="number" name="currency" min="0" max="999999" step="0.01" size="6" 
                title="CDA Currency Format" {...price} />
          </div>
        </fieldset>
        <fieldset className="form-group">
          <label>Image</label>
          <div>
            <ImageUploadContainer field='picture'/>
          </div>
        </fieldset>
        <button className="btn btn-primary" onClick={this.addProduct}>
         {this.props.submitText}
        </button>
        <hr/>
        {this.props.productsError? <div className="alert alert-danger"> Adding product failed. 
        <br/>
        <b>Error:&nbsp;&nbsp;</b><i>{this.props.productsError}</i> </div> : <div></div>}
      </div>
    );
  }
}

export default reduxForm({
  form: 'ProductForm',
  fields
})(ProductForm);