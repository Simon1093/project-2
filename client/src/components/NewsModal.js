import React from 'react';
import Modal from 'react-modal';
import { connect } from "react-redux";
import { addNews } from "../store/actions/addNews";
import { uploadImage } from "../store/actions/uploadImage";

import '../styles/style.css'
import 'bootstrap/dist/css/bootstrap.css'

const customStyles = {
  content: {
    minWidth:'300px',
    top: '50%',
    display: 'flex',
    justifyContent:'center',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '40%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

class ModalNews extends React.Component {
  constructor(props) {
    super(props);

    this.inputName = React.createRef();
    this.inputText = React.createRef();
    this.inputTags = React.createRef();

    this.state = {
      modalIsOpen: false,
      selectedFile: null,
      nameSelectedFile: '',
      nameEmpty: false,
      textEmpty: false,
      tagsEmpty: false,
      notImage: false,
      errorMsgFile: false
    };
  }
  openModal = () => {
    this.setState({modalIsOpen: true});
  };

  afterOpenModal = () => {
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      nameEmpty: false,
      textEmpty: false,
      tagsEmpty: false,
      notImage: false,
      selectedFile: null,
      nameSelectedFile: '',
      errorMsgFile: false,});
  };

  fileSelectHandler = event => {
    const image = event.target.files[0];
    if (image!==undefined) this.addImage(image)
  };

  addImage = (image) => {
    this.setState({
      selectedFile: image,
      nameSelectedFile: image.name
    })
  };

  checkNews = (e)=>{
    e.preventDefault();
    const notEmpty = !!this.inputTags.current.value.trim()
      &&!!this.inputName.current.value.trim()
      &&!!this.inputText.current.value.trim()
      &&!!this.state.selectedFile;
    const {selectedFile} = this.state;
    if (notEmpty) {
    if (!selectedFile.type.includes('image')) this.setState({errorMsgFile:'incorrect file'});
    else
      if (selectedFile.size>200000) this.setState({errorMsgFile:'Big size'});
        else this.sendNews();
  } else{
      this.setState({
        nameEmpty: !this.inputName.current.value.trim(),
        textEmpty: !this.inputText.current.value.trim(),
        tagsEmpty: !this.inputTags.current.value.trim(),
        notImage: !this.state.selectedFile,
      })
    }
  };

  sendNews = () => {
    let tags = this.inputTags.current.value.trim().split(' ');
    const fd = new FormData();
    const {selectedFile, } = this.state;
    fd.append('image', selectedFile, selectedFile.name);
    this.props.addNews({
      newsData: {
        name: this.inputName.current.value,
        text: this.inputText.current.value,
        tags,
        author: {...this.props.author},
      },
      image: fd,
      token: localStorage.getItem('token'),
    });
    this.closeModal();
  };

  render() {
    const {nameEmpty, textEmpty, tagsEmpty, notImage, errorMsgFile, nameSelectedFile}=this.state;

    return (
      <div className=''>
        <button
          className='btn btn-dark w-100'
          onClick={this.openModal}>
          Add news
        </button>
        <div className='w-100'>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className='modal-style'>
              <button onClick={this.closeModal} className='float-right mb-2 btn btn-dark'>&#10006;</button>
              <form className=''>

                <label>
                  Name news&nbsp;
                  {nameEmpty &&
                  <label className="text-danger small">
                    Required field
                  </label>}
                </label>
                <div className='modal-text mb-3 border-0'>
                  <input
                    ref={this.inputName}
                    maxLength='100'
                    className={`modal-text ${nameEmpty&&'border-danger'}`}/>
                </div>
                <label>
                  Your news&nbsp;
                  {textEmpty &&
                  <label className="text-danger small">
                    Required field
                  </label>
                  }
                </label>
                <div className='mb-3 border-0'>
                  <textarea
                    ref={this.inputText}
                    className={`modal-text ${textEmpty&&'border-danger'}`} style={{height: 200}}/>
                </div>
                <div className=''>
                  <label>
                    Tags *&nbsp;
                    {tagsEmpty &&<label className="text-danger small">Required field</label>}
                  </label>
                  <input
                    ref={this.inputTags}
                    className={`modal-text ${tagsEmpty&&'border-danger'}`}/>
                </div>
                <p className='text-info small'>* Separate tags with spaces.</p>
                <label className='text-danger'>{errorMsgFile}</label>
                <input type='file'
                       style={{display: 'none'}}
                       ref={inputFiles => this.inputFiles = inputFiles}
                       onChange={this.fileSelectHandler}/>
                <button className='btn btn-dark m-0'
                  onClick={(e) => {
                  e.preventDefault();
                  this.inputFiles.click()
                }}>
                  Choose image
                </button>
                {!!nameSelectedFile&&<label className='card card-text text-dark  d-inline ml-3'>{nameSelectedFile}</label>}
                <button
                  className='btn btn-dark d-block m-0 mt-1 float-right'
                  onClick={this.checkNews}
                  style={{margin: 10}}>
                  Send news
                </button>
                {notImage &&<label className="text-danger small d-block">Choose image</label>}
              </form>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  author: {
    name: `${store.authReducer.firstName} ${store.authReducer.secondName}`,
    id: store.authReducer.userId
  }
});

const mapDispatchToProps = {
  addNews, uploadImage
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalNews)
