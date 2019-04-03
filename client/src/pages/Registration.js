import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {addUser} from "../store/actions/addUser";
import {Redirect} from "react-router";
import GoogleLogin from 'react-google-login';
import {googleAuth} from "../store/actions/oauthGoogle";
import {validateEmail} from '../validation/validationEmail'

class Registration extends PureComponent {
  constructor (props) {
    super(props);

    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.repeatPasswordRef = React.createRef();
    this.firstNameRef = React.createRef();
    this.secondNameRef = React.createRef();

    this.state = {
      incorrectFirstName:false,
      incorrectSecondName:false,
      incorrectEmail:false,
      incorrectPassword:false,
      incorrectComparePassword:false,
      msgPassword: '',
      msgEmail:''
    }
  }

  validatePassword=()=>{
    const password = this.passwordRef.current.value;
    const repeatPassword = this.repeatPasswordRef.current.value;
    let msgPassword ='';
    if (password.length<6) msgPassword='Incorrect password';
    if (!password) msgPassword= 'Required field';
    this.setState({
      incorrectComparePassword: password!==repeatPassword,
      incorrectPassword: password.length<6,
      msgPassword
    });
    return password===repeatPassword && password.length>=6
  };

  responseGoogle = (res) => {
    this.props.googleAuth(res.accessToken);

  };

  addUser =  (e) => {
    e.preventDefault();
    let msgEmail=''
    const password = this.passwordRef.current.value.trim();
    const email = this.emailRef.current.value.trim();
    const firstName = this.firstNameRef.current.value.trim();
    const secondName = this.secondNameRef.current.value.trim();
    if (!validateEmail(email)) msgEmail='Incorrect email'
    if (!email) msgEmail = 'Required field';
    this.setState({
      incorrectEmail:!validateEmail(email),
      incorrectFirstName:firstName.length===0,
      incorrectSecondName:secondName.length===0,
      msgEmail
    });
    const trim = firstName.length===0 && secondName.length===0;
    if (this.validatePassword() && validateEmail(email) && password.length>=6 &&!trim){

      this.props.addUser(firstName, secondName, email, password);
      this.setState({
        incorrectEmail:false,
        incorrectFirstName:false,
        incorrectSecondName:false,
        msgEmail:'',
        msgPassword:'',
        incorrectPassword:false,
        incorrectComparePassword:false
      })
    }
  };


  render() {
    const {status, error, success, userId} = this.props;

    const {
      incorrectPassword,
      incorrectComparePassword,
      incorrectEmail,
      incorrectFirstName,
      incorrectSecondName,
      msgEmail,
      msgPassword} = this.state;

    return (
      <div>
        {!!error&&<div>{error}</div>}
        <form className='text-left text-success container w-25 card border border-success mt-2 mb-3' style={{minWidth:300}}>
          <label className='col-form-label'>
            First name&nbsp;
            { incorrectFirstName&&
            <label className='col-form-label text-danger small'>
             Required field
            </label>}
          </label>
          <input className={`form-text input-group-text d-block container w-100 ${incorrectFirstName&&'border-danger'}`}
                 ref={this.firstNameRef}
                 placeholder='First name'/>
          <label className='col-form-label'>
            Last name&nbsp;
            { incorrectSecondName&&
            <label className=' small col-form-label text-danger'>
              Required field
            </label>}
          </label>
          <input className={`input-group-text d-block container w-100 ${incorrectSecondName&&'border-danger'}`}
                 ref={this.secondNameRef}
                 placeholder='Last name'/>

          <label className='col-form-label'>
            Email&nbsp;
            { incorrectEmail&&
            <label className='col-form-label text-danger small'>
              {msgEmail}
            </label>}
          </label>
          <input className={`form-text input-group-text d-block container w-100 ${incorrectEmail&&'border-danger'}`}
                 ref={this.emailRef}
                 placeholder='Email'/>

          <label className='col-form-label'>
            Password&nbsp;
            { incorrectPassword&&
            <label className='small col-form-label text-danger'>
              {msgPassword}
            </label>}
          </label>

          <input className={`form-text input-group-text d-block container w-100 ${incorrectPassword&&'border-danger'}`}
                 type='password'
                 autoComplete='off'
                 ref={this.passwordRef}
                 placeholder='Password'/>
                 <label className='text-info small'>* min length 6 symbol</label>

          <label className='col-form-label'>
            Confirm password&nbsp;
            { incorrectComparePassword&&
            <label className='col-form-label text-danger'>
              Dsn`t  match confirm password
            </label>}
          </label>
          <input className={`form-text input-group-text d-block container w-100 ${incorrectComparePassword&&'border-danger'}`}
                 type='password'
                 autoComplete='off'
                 ref={this.repeatPasswordRef}
                 placeholder='repeat password'/>
          <label className='text-info small'>* min length 6 symbol</label>

          <button
            className='btn btn-dark w-100 mt-3 mb-3'
            onClick={this.addUser}>
            Sign Up
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
        {status && <Redirect to='/login'/>}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  userId: store.authReducer.userId,
  status: store.authReducer.status,
  error: store.authReducer.error,
  success: store.authReducer.success
});

const mapDispatchToProps = {
  addUser, googleAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
