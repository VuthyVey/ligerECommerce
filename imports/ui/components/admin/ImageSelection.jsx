import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {withTracker} from 'meteor/react-meteor-data';
import {Images} from '/imports/api/images/images.js';
import connectMeteor from 'react-redux-meteor-data';
import userReducer, {action, productsReducer} from '/imports/startup/client/redux.js';
import { bindActionCreators } from 'redux';

class ImageSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedImageId: "vTnLBX6ofyPP9y9PJ" //apple
    };
    this.fileInput = React.createRef();
    this.toggle = this.toggle.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  selectImage(imageId) {
    this.toggle();
    this.setState({selectedImageId: imageId});
  }

  uploadImage(event) {
    const file = this.fileInput.current.files[0] // get object from file input
    var currentThis = this;
    if (file) {
      var fsFile = new FS.File(file); // convert to FS.File
      fsFile.updatedAt(moment().unix()); // change updatedAt format to timestamp
      fsFile.owner = Meteor.userId(); // default doesn't include, add owner to the image object
      Images.insert(fsFile, function(err, res) { //insert image // proper way is to call meteor method
        if (err) {
          throw new Meteor.Error(err);
        } else {
          console.log("Hello " + res._id);
          // Session.set('selectedImageId', res._id);
          setTimeout(() => {

            currentThis.setState({
              selectedImageId : res._id
            });

          }, 1000);
        }
      });
    }
  }

  imagesList() {
    const images = this.props.images;

    const imageList = images.map((image) => {
      const id = image._id;
      const url = "/cfs/files/images/" + id + "?store=thumb";
      return (<div className="col col-md-3" key={id} onClick={this.selectImage.bind(this, id)}>
        <a href="#"><img src={url}/></a>
      </div>)
    });

    return imageList;
  }

  selectedImage () {
    const selectedImage = this.props.currentImage;
    console.log(selectedImage)
    if (selectedImage != null && selectedImage.isUploaded) {
      return <img id="imageDisplay" src={"/cfs/files/images/" + this.state.selectedImageId + "?store=thumb"} alt=""/>
    } else {
      return <h5>Loading...</h5>
    }
  }

  onUserChange () {
    console.log("hi")
    this.props.onUserChange();
  }

  render() {
    return (
    <div>
      {this.selectedImage()}


      <label htmlFor="upload">
        <a className="btn btn-primary">Upload</a>
        <input type="file" id="upload" ref={this.fileInput} style={{display: 'none'}} onChange={this.uploadImage}/> {/* <!-- event handler listen to this input change in newProduct.js --> */}
      </label>

      <Button className="btn btn-secondary mb-1" onClick={this.toggle}>
        Select Image
      </Button>
      <Button className="btn btn-secondary mb-1" onClick={this.onUserChange}>
        {this.props.user}
      </Button>

      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>
          <div className="row">
            {this.imagesList()}
          </div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </div>
    )
  }
}
const mapTrackerToProps = (props)=> {
  Meteor.subscribe('images');
  return {
    images: Images.find({}, {sort: {uploadedAt: -1}}).fetch(),
    currentUser: "Vuthy"
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    imageId: state.imageId
  }
}

const mapDispatchToProps = (dispatch) => {
  return { onUserChange: bindActionCreators(action, dispatch) }

}


export default connectMeteor(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(ImageSelection)
