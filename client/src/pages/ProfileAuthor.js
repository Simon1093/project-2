import React, {PureComponent} from 'react';
import {connect} from "react-redux";

import 'bootstrap/dist/css/bootstrap.css';
import News from "../components/News";
import { findNews } from "../store/actions/findNews";
import { getUser } from "../store/actions/getUser";
import defaultImage from '../img/stranger_avatar.jpg'


class ProfileAuthor extends PureComponent {

  componentDidMount() {
    const {findNews, getUser} = this.props;
    const id = this.props.authorId;
    getUser(id);
    findNews(id);
  }

  render() {
    const {firstName, secondName, email, news, avatar} = this.props;
    return (
      <div className='mb-3'>
      {!firstName
        ? <div>Wait</div>
          :
        <div className='container'>
          <div className='card card-group w-100 mt-1 p-1'>
            <div className='w-25' style={{minWidth:300}}>
              <img
                src={!!avatar ? avatar: defaultImage}
                className='w-100 border border-dark'
                alt='page'/>
            </div>
            <div className='card w-75 ml-1 d-flex justyfy-content-center' style={{minWidth:300}}>
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
          <div>
            {
              news.length!==0 && news.map(item =>
                <News
                  key={item._id}
                  news={item}
                />
              )
            }
          </div>
        </div>
      }
      </div>
    )
  }
}

const mapStateToProps = store => ({
  userId: store.getAuthorReducer.userId,
  firstName: store.getAuthorReducer.firstName,
  secondName: store.getAuthorReducer.secondName,
  avatar: store.getAuthorReducer.avatar,
  email: store.getAuthorReducer.email,
  // news: store.findNewsReducer.news
});
const mapDispatchToProps = {
  findNews,
  getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAuthor)
