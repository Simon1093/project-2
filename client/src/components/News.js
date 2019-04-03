import React, {PureComponent} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {Link} from "react-router-dom";

export default class News extends PureComponent {


  render() {
    const {name, author, tags, text, image} = this.props.news;
    return (
      <div className='w-100 mt-3'>
        <div className='card'>
          <div className='card-header'>
            <div className='float-left position-absolute'>
              <Link to={`/profile/${author.id}`}>
              {author.name}
              </Link>
            </div>
            <div>
              {name}
            </div>
          </div>
          <div className='card-text w-75 container p-3'>
            <div className='text-left'>
              <img src={`http://127.0.0.1:3000/${image}`} alt='news' className='w-25 float-left card-img mr-3'/>
              {text}
            </div>
          </div>
          <div className='card-footer text-left'>
            {tags.map((tag, index)=>
              <span key={index}>
                #
                <label to={`/news/${tag}`}>
                  {tag}&nbsp;
                </label>
              </span>)
            }
          </div>
        </div>
      </div>
    )
  }
}
