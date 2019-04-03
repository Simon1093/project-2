import React, {PureComponent} from 'react';
import {connect} from "react-redux";

import 'bootstrap/dist/css/bootstrap.css';

import News from "../components/News";
import ModalNews from "../components/NewsModal";
import ModalEdit from "../components/ModalEdit";

import {findNews} from "../store/actions/findNews";
import {uploadImage} from "../store/actions/uploadImage";
import {uploadAvatar} from "../store/actions/uploadAvatar";
import ProfileAuthor from "./ProfileAuthor"

import defaultImage from '../img/stranger_avatar.jpg'
import ReactPaginate from 'react-paginate';


class ProfileId extends PureComponent {
  constructor (props) {
    super (props);

    this.state = {
      selectForm:'All',
      refSearch: '',
      filterName: '',
      news: [],
      pageCount: 0,
      offset:0,
      perPage:5,
      errorAvatar: false,
    };
  }
  static getDerivedStateFromProps (props, state) {
    const { news: propsNews } = props
    const {perPage, offset} =state;
    let allNews, trueNews='';
    if (state.selectForm === 'All' && state.refSearch)
      trueNews = propsNews
        .filter(news =>
          Object.keys(news).some(key =>
            news.author.name.toLowerCase().includes(state.refSearch)
            || news[key].toString().toLowerCase().includes(state.refSearch)));
    else if (state.selectForm==='Authors' && state.refSearch)
      trueNews = propsNews
        .filter(news => news.author.name.toLowerCase().includes(state.refSearch));
    else if (state.selectForm === 'Tags' && state.refSearch)
      trueNews = propsNews
        .filter(news =>
          news.tags.some(tag =>
            tag.includes(state.refSearch)
          ));
    allNews = trueNews || propsNews;
    let news = trueNews ? trueNews.filter((news, index) => index>=offset && index<(offset+perPage))
      : propsNews.filter((news, index) => index>=offset && index<(offset+perPage));
    const pageCount=Math.ceil(allNews.length/5);
    return {
      news,
      pageCount
    }
  }

  changeAvatar =avatar=>{
    const fd = new FormData();
      fd.append('avatar', avatar, avatar.name);
      this.props.uploadAvatar({
        id: this.props.userId,
        avatar: fd,
        token: localStorage.getItem('token')
    })
  };

  selectedImage = event => {
    const avatar = event.target.files[0];
    if (!avatar.type.includes('image')) this.setState({errorAvatar:'incorrect file'});
    else if (avatar.size>200000) this.setState({errorAvatar:'Big size'});
    else if (avatar) this.changeAvatar(avatar);
    setTimeout(()=>this.setState({errorAvatar:false}), 3000)
  };

  findNews =() =>{

    this.props.findNews(this.props.match.params.id)
  };
  handleClick = event => {
    event.preventDefault();
    this.inputFiles.click()
  };
  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({ offset: offset },
    );
  };

  componentDidMount() {
    const {findNews} = this.props;
    findNews(this.props.match.params.id);
  }

  render() {
    const {firstName, secondName, email, avatar, userId} = this.props;
    const {news, pageCount, errorAvatar} = this.state;
    const authorId = this.props.match.params.id;
    const guest = authorId !== userId;
    return (
      <div>
        {guest
          ? <ProfileAuthor authorId={authorId} news={news}/>
          : <div className='container'>
            <div className='card card-group w-100 mt-1 p-1'>
              <div className='w-25' style={{minWidth:300}}>
                <img
                  src={!!avatar ? avatar : defaultImage}
                  className='w-100 border border-dark'
                  alt='page'/>
                <input
                  style={{display: 'none'}}
                  type='file'
                  ref={inputFiles => this.inputFiles = inputFiles}
                  onChange={this.selectedImage}
                />
                <label className='text-danger'>{errorAvatar}</label>
                <button
                  onClick={this.handleClick}
                  className='btn btn-dark w-100 mt-1'>
                  Change avatar
                </button>
                <ModalEdit/>
                <ModalNews findNews={this.findNews}/>
              </div>
              <div className='card w-75 ml-1' style={{minWidth:300}}>
                <div className='card-header'>
                  First name
                </div>
                <div className='card-body'>
                  {firstName}
                </div>
                <div className='card-header'>
                  Second name
                </div>
                <div className='card-body'>
                  {secondName}
                </div>
                <div className='card-header'>
                  email
                </div>
                <div className='card-body'>
                  {email}
                </div>
              </div>
            </div>
            <div className='mb-3'>
              {
                news.length !== 0 && news.map(item =>
                  <News
                    key={item._id}
                    news={item}
                  />
                )
              }
            </div>
          </div>
        }
        {news.length!==0 && <ReactPaginate
          previousLabel='previous'
          nextLabel='next'
          breakLabel='...'
          breakClassName='break-me'
          pageCount={pageCount}
          marginPagesDisplayed={10}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName='container'
          pageClassName='d-inline'
          pageLinkClassName='page-link d-inline'
          previousClassName='d-inline'
          previousLinkClassName='page-link d-inline'
          nextClassName='d-inline'
          nextLinkClassName='page-link d-inline'
          activeClassName='btn-green'
          activeLinkClassName='alert-link'
        />}
      </div>
    )
  }
}

  const
  mapStateToProps = store => ({
    success: store.authReducer.success,
    userId: store.authReducer.userId,
    firstName: store.authReducer.firstName,
    secondName: store.authReducer.secondName,
    avatar: store.authReducer.avatar,
    email: store.authReducer.email,
    news: store.findNewsReducer.news
  });
  const
  mapDispatchToProps = {
    findNews,
    uploadImage,
    uploadAvatar
  };

  export default connect(mapStateToProps, mapDispatchToProps)(ProfileId)
