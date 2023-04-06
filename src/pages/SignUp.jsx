import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const SignUp = () => {
  let[userInfo] = useState({});
  let[isValidUserName, setIsValidUserName] = useState(true);
  let[isValidEmail, setIsValidEmail] = useState(true);
  let[isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  let[isValidPassword, setIsValidPassword] = useState(true);

  const navigate = useNavigate();

  const formValidationHandler = (e) => {
    e.preventDefault();
   if(userNameHandler(userInfo.username))
    if(emailHandler(userInfo.email))
      if(phoneNumberHandler(userInfo.number))
        if(passwordHandler(userInfo.password)){
          //save data here..
          uploadDataInToDataBase(userInfo);
          navigate('/');
        }
  };

  const uploadDataInToDataBase = async(userData) => {
    const options = {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(userData)
    }

    await fetch('https://document-app-server.onrender.com/api/users', options)
    .then(() => {
      console.log('data uploaded');
    })
    .catch(() => {
      console.log('error while uploading data');
    })
  };


  // user input values
  const takeInputValue = (e) => {
    userInfo[e.target.id] = e.target.value;
  };

  //user name validation
  const userNameHandler = (username) => {
    if(username.length < 4){
      setIsValidUserName(false);
      return false;
    }
    return true;
  };

  // email validation
  const emailHandler = (email)=>{
    const sample = '@gmail.com';
    const emailLenght = email.length;
    const substr = email.substring(emailLenght-sample.length);
    for(let i=0; i<sample.length; i++){
      if(substr.charAt(i) !== sample.charAt(i)){
        setIsValidEmail(false);
        return false;
      }
    }
    return true;
  };

  //phone number validation
  const phoneNumberHandler = (phoneNumber) => {
    var regx = /^[6-9]\d{9}$/;
    if(!regx.test(phoneNumber)){
      setIsValidPhoneNumber(false);
      return false;
    }
    return true;
  };

  // password validation
  const passwordHandler = (password)=>{
    if(password.length < 6){
      setIsValidPassword(false);
      return false;
    }
    return true;
  };


  return (
    <Container>
      <div className="container flex column a-center j-center">
        <div className="form-container flex column a-center j-center">
          <div className="title">
            <h3>Registration form</h3>
          </div>
            <form action="" onSubmit={formValidationHandler} className="flex column">
              <label htmlFor="username">User Name: </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
                onClick={() => setIsValidUserName(true)}
                onChange={takeInputValue}
              />{(!isValidUserName) && (<p>username must be atleast 4 character</p>)}
              <label htmlFor="email">Email Address: </label>
              <input
                type="email"
                id="email"
                placeholder="Email address"
                required
                onClick={() => setIsValidEmail(true)}
                onChange={takeInputValue}
              />
              {(!isValidEmail) && (<p>invalid email</p>)}
              <label htmlFor="number">Phone Number: </label>
              <input
                type="tel"
                id="number"
                placeholder="Phone number"
                maxLength={10}
                required
                onClick={() => setIsValidPhoneNumber(true)}
                onChange={takeInputValue}
              />
              {(!isValidPhoneNumber) && (<p>invalid number</p>)}
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                onClick={() => setIsValidPassword(true)}
                onChange={takeInputValue}
              />{(!isValidPassword) && (<p>password must be between 6 to 12 character</p>)}
              <input className="button" type="submit" value={"Submit"} />
            </form>
          </div>
      </div>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  .container{
    height: 85vh;
    gap: 20px;
    .form-container{
      gap: 20px;
      padding: 30px;
      width: 400px;
      .title{
        text-align: center;
        font-size: 18px;
      }
      form{
        label{
          padding: 10px 0 0 0;
        }
        input{
          padding: 8px 10px;
          width: 300px;
          font-size: 15px;
        }
        p{
          color: red;
        }
        .button{
          margin-top: 20px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 5px;
          :hover{
            color: blue;
          }
        }
      }
    }
  }
`