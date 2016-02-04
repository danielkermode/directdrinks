import React, {Component, PropTypes} from 'react';

// redux
import {connect} from 'react-redux'
import {change} from 'redux-form'

export class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      badFile: false
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {

      const extension = file.name.substring(file.name.lastIndexOf('.'));
      const validFileType = ".jpg , .jpeg , .png , .bmp";
      let badFile = false
      if (validFileType.toLowerCase().indexOf(extension) < 0) {
          badFile = "Please select a valid file type. The supported file types are .jpg , .jpeg , .png , .bmp.";
      }

      this.setState({
        file: file,
        imagePreviewUrl: !badFile && reader.result,
        badFile: badFile
      });

      this.updateMainForm(reader.result);
    }

    reader.readAsDataURL(file);
    
  }

  updateMainForm = (imagePreviewUrl) => {
    //arg has value (2 letters, eg. en) and label (name of language, eg. english). we want to dispatch value
    this.props.dispatch(change('ProductForm', this.props.field, imagePreviewUrl)); 
  };

  render() {
    let {imagePreviewUrl} = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} />);
    }
    return (
      <div>
        <input type="file" onChange={this.handleImageChange} />
        {this.state.badFile && <span style={{color: 'red'}}> {this.state.badFile} </span>}
        {imagePreview}
      </div>
    )
  }

}

export const ImageUploadContainer = connect()(ImageUpload)