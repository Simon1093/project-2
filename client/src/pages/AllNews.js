import React, {PureComponent, createRef} from 'react';
import {connect} from "react-redux";
import ReactPaginate from 'react-paginate';

import {getNews} from '../store/actions/news'
import News from "../components/News";

import 'bootstrap/dist/css/bootstrap.css'



class AllNews extends PureComponent {
  constructor (props) {
    super (props);
    this.input = createRef();
    this.searchInput = createRef();

    this.state = {
      selectForm:'all',
      refSearch: '',
      filterName: '',
      news: [],
      pageCount: 0,
      offset:0,
      perPage:5,
    };
  }
  static getDerivedStateFromProps (props, state) {
    const { news: propsNews } = props
    const {perPage, offset} =state;
    let allNews, trueNews='';
      if (state.selectForm === 'all' && state.refSearch)
        trueNews = propsNews
          .filter(news =>
            Object.keys(news).find(key =>
              {
              if (key==='image') return null;
              return news.author.name.toLowerCase().includes(state.refSearch)
              || news[key].toString().toLowerCase().includes(state.refSearch)
              }));
      else if (state.selectForm==='authors' && state.refSearch)
        trueNews = propsNews
          .filter(news => news.author.name.toLowerCase().includes(state.refSearch));
      else if (state.selectForm === 'tags' && state.refSearch)
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

  handleChange =(e) => {
    const { name, value } = e.target;
    this.setState({[name]: value.trim().toLowerCase()})
  };

  componentDidMount() {
    this.props.getNews();
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.perPage);

    this.setState({ offset: offset },
      );
  };

  render() {
    const {news, pageCount} = this.state;

    return (
      <div>

        <div className='w-100 d-flex justify-content-center mt-3'>
          <input type='text' autoComplete="off"
                 className='input-group-text text-left w-25 d-inline-block'
                 ref = {this.searchInput}
                 name='refSearch'
                 placeholder='Search...'
                 onChange={this.handleChange}/>
          <select name='selectForm' className='w-auto custom-select bg-dark text-light' onChange={this.handleChange}>
            <option>All</option>
            <option>Authors</option>
            <option>Tags</option>
          </select>
        </div>
        {news.length!==0 ?
          <div>
        <ul className='container '>
          {
            news.map(item =>
              <News key={item._id} news={item} />
            )

          }
        </ul>
        <ReactPaginate
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
        />
          </div>
        :<div className=''>Sorry! No news...</div>}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  news: store.newsReducer.news,
});

const mapDispatchToProps = {
  getNews,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllNews);
