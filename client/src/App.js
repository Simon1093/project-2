import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import AllNews from './pages/AllNews'
import Header from './pages/Header'
import ProfileId from './pages/ProfileId'
import Registration from './pages/Registration'
import Auth from './pages/Auth'
import Home from "./components/Home";
import {connect} from "react-redux";
import { getCreatedUser } from './store/actions/createdUser'
// import Profile from './pages/Profile'

class App extends Component {
  componentDidMount() {
    if (localStorage.length !== 0)
    this.props.getCreatedUser(localStorage.getItem('token'))
  }

  render() {
    return (
      <div className="App">

        <BrowserRouter>
          <Header/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/news' component={AllNews}/>
            <Route exact path='/registration' component={Registration}/>
            <Route exact path='/login' component={Auth}/>
            <Route exact path='/profile' component={Auth}/>
            <Route path='/profile/:id' component={ProfileId}/>
          </Switch>
        </ BrowserRouter>
      </div>
  );
  }
}

const mapDispatchToProps = {
  getCreatedUser
}

export default connect(null, mapDispatchToProps)(App)
// import { createStore } from 'redux';
//
  // function playlist (state = []) {
//
//   return state;
// }
// const store = createStore();
//
// console.log(store.getState());
// store.subscribe(()=>{
//   console.log('subscribe', store.getState())
// });
// store.dispatch({type: 'ADD_TRACK', payload: 'Smells like spirit'});


