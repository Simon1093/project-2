import React from 'react';
import Modal from 'react-modal';
import {connect} from "react-redux";
import {addNews} from "../store/actions/addNews";
import {uploadImage} from "../store/actions/uploadImage";
import {editUser} from "../store/actions/editUser";
import {validateEmail} from "../validation/validationEmail"
import '../styles/style.css'
import 'bootstrap/dist/css/bootstrap.css'

const customStyles = {
  content: {
    minWidth:'300px',
    width:'20%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

class ModalEdit extends React.Component {
  constructor(props) {
    super(props);

    this.inputFirstName = React.createRef();
    this.inputSecondName = React.createRef();
    this.inputEmail = React.createRef();

    this.state = {
      modalIsOpen: false,
      selectedFile: null,
      emptyFirstName:false,
      emptySecondName:false,
      msgEmail:''

    };
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  };

  afterOpenModal = () => {
  };

  closeModal = () => {
    this.setState({modalIsOpen: false});
  };

  editInformation = (e) => {
    e.preventDefault();
    let msgEmail='';
    const firstName = this.inputFirstName.current.value.trim();
    const secondName = this.inputSecondName.current.value.trim();
    const email = this.inputEmail.current.value.trim();
    const notEmpty = firstName.length&&secondName.length&&email.length&&validateEmail(email);
    if (!validateEmail(email)) msgEmail='Incorrect email';
    if (!email.length) msgEmail='Required field';
    if (notEmpty){
    this.props.editUser({
      user: {
        firstName,
        secondName,
        email},
      id: this.props.userId,
      token: localStorage.getItem('token')
    });
    this.closeModal();
    }
    else {
      this.setState({
        emptyFirstName:firstName.length<1,
        emptySecondName:secondName.length<1,
        msgEmail
      })
    }
  };

  render() {
    const {firstName, secondName, email} = this.props;
    const {emptyFirstName, emptySecondName, msgEmail} = this.state;

    return (
      <div className=''>
        <button
          onClick={this.openModal}
          className='btn btn-dark w-100 mb-1 mt-1'
        >
          Edit information
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={this.closeModal} className='float-right btn btn-dark mb-2'>&#10006;</button>
          <form>
            <label>
              First name&nbsp;
              {emptyFirstName&&
              <label className='text-danger small'>Required field</label>}
            </label>
            <div className='modal-text border-0 mb-3'>
              <input
                ref={this.inputFirstName}
                className='modal-text'
                placeholder='First name'
                defaultValue={firstName}/>
            </div>
            <label>
              Last name&nbsp;
              {emptySecondName&&
              <label className='text-danger small'>Required field</label>}
            </label>
            <div className='mb-3'>
                  <input
                    type='text'
                    ref={this.inputSecondName}
                    className='modal-text'
                    placeholder='Last name'
                    defaultValue={secondName}
                  />
            </div>
            <div className=''>
              <label>
                Email&nbsp;
                {msgEmail.length&&
                <label className='text-danger small'>{msgEmail}</label>}
              </label>
              <input
                ref={this.inputEmail}
                className='modal-text'
                placeholder='Email'
                defaultValue={email}/>
            </div>
            <button
              className='btn btn-dark float-right m-0 mt-3'
              onClick={this.editInformation}
              style={{margin: 10}}>
              edit
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  firstName: store.authReducer.firstName,
  secondName: store.authReducer.secondName,
  email: store.authReducer.email,
  userId: store.authReducer.userId,
  token: store.authReducer.token
});

const mapDispatchToProps = {
  addNews, uploadImage, editUser
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit)
