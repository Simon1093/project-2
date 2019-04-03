import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { exit } from "../store/actions/logout";

import 'bootstrap/dist/css/bootstrap.css'

class Header extends PureComponent {
  logoutClick = (e) =>{
    e.preventDefault();
    this.props.exit()
  };
  render () {
    const {success, firstName, secondName} = this.props;

    return (
      <header className="App-header">
        <div className='header container'>
            <Link to='/news'>
              <span className='App-link nav-link float-left'>
                News
              </span>
            </Link>
            <Link to='/profile'>
              <span className='App-link float-left nav-link'>
                My profile
              </span>
            </Link>
          {!success ? <div>
            <Link to='/registration'>
              <span className='App-link float-right nav-link'>
                Sign up
              </span>
            </Link>

            <Link to='/login'>
              <span className='App-link float-right nav-link'>
                Sign in
              </span>
            </Link>
          </div>
            :<div className='App-link float-right nav-link'>
              {firstName+" "+secondName}
              <div>
                <Link to='/' onClick={this.logoutClick}>
                  logout
                </Link>
              </div>
            </div>
          }
        </div>
      </header>
    )
  }
}

const mapStateToProps = store => ({
  success: store.authReducer.success,
  firstName: store.authReducer.firstName,
  secondName: store.authReducer.secondName
});

const mapDispatchToProps = {
  exit
};
export default connect(mapStateToProps, mapDispatchToProps)(Header)
