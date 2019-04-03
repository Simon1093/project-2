import React, {PureComponent} from 'react';
import { connect } from "react-redux";
import { signInUser } from "../store/actions/signInUser";
import {Redirect} from "react-router";
import {changeStatus} from "../store/actions/changeStatus";
import GoogleLogin from 'react-google-login';
import {googleAuth} from "../store/actions/oauthGoogle";
import {validateEmail} from '../validation/validationEmail'

class Auth extends PureComponent {
  constructor(props) {
    super(props);
    this.loginRef=React.createRef();
    this.passwordRef=React.createRef();
    this.state={
      msgErrorEmail: false,
      msgErrorPassword: false,
    }
  }

  loginUser = (event) => {
    event.preventDefault();
    const email = this.loginRef.current.value.trim();
    const password = this.passwordRef.current.value.trim();
    const error =
      {msgErrorEmail: false,
      msgErrorPassword: false};
    if (password.length<6) error.msgErrorPassword='Incorrect password';
    if (!password) error.msgErrorPassword='Required field';
    if (!validateEmail(email)) error.msgErrorEmail="Incorrect email";
    if (!email) error.msgErrorEmail="Required field";
    if (!error.msgErrorEmail&&!error.msgErrorPassword) this.props.signInUser(email, password);
    this.setState(error);
  };

  responseGoogle = (res) => {
    this.props.googleAuth(res.accessToken);
  };

  componentDidMount() {
    if (this.props.status) this.props.changeStatus()
  }

  render() {
    const {error, userId, success} = this.props;
    const {msgErrorPassword, msgErrorEmail} = this.state;
    return (
      <div>
        <label className='text-danger card-body w-25'>{error}</label>
        <form className='container card w-25 border-success mb-3'  style={{minWidth:300}}>
        <label className='col-form-label'>
          Email&nbsp;
          <label className='text-danger small'>{msgErrorEmail}</label>
        </label>
          <input type='text'
               name='username'
               autoComplete="off"
               ref={this.loginRef}
               className={`d-block container w-100 input-group-text ${msgErrorEmail&& 'border-danger'}`}
               placeholder='Email'
        />
        <label className='col-form-label'>
          Password&nbsp;
          <label className='text-danger small'>{msgErrorPassword}</label>
        </label>
        <input type='password'
               name='password'
               autoComplete="off"
               ref={this.passwordRef}
               className={`d-block container w-100 input-group-text ${msgErrorPassword&& 'border-danger'}`}
               placeholder='Password'
        />
        <label className='text-left text-info small'>* min length 6 symbols</label>
        <button
          className='btn btn-dark mt-3 mb-3'
          onClick={this.loginUser}>
          Sign in
        </button>
        </form>
        <GoogleLogin
          clientId="772896074949-mbb0bq76bls8p1d1a7mctv93p6e0vc70.apps.googleusercontent.com"
          buttonText="Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          className="btn btn-outline-danger"
        />
        {success && <Redirect to={`/profile/${userId}`}/>}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  userId: store.authReducer.userId,
  success: store.authReducer.success,
  status: store.authReducer.status,
  error: store.authReducer.error
});

const mapDispatchToProps = {
  signInUser, changeStatus, googleAuth
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth)
