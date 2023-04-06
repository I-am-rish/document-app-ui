import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogIn = () => {
  const [error, setError] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogIn = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if(emailHandler(email)){
      if(passwordHandler(password)){
        // fetch data
        // find user in database
        findUserAndMatchData(email, password);
      }
    }
  };


  const findUserAndMatchData = (email, password)=>{
    fetch('https://document-app-server.onrender.com/api/users')
    .then((res) => res.json())
    .then((value) => {
      const user = value.filter((obj) => obj.email === email);
      if(user.length !== 0){
        if(user[0].password === Number(password)){
          navigate("/home");
        }else{
          setIsCorrectPassword(false);
        }
      }else{
        setError(true);
      }
    })
    
  }

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
  }

  const passwordHandler = (password)=>{
    if(password.length === 0){
      return false;
    }
    return true;
  }


  return (
    <Container>
      <div className="form-container flex column a-center j-center">
        <div className="form flex column a-center j-center">
          <div className="title">
            <h3>Log In</h3>
          </div>
          <div className="input-container flex column">
            <div>
            <input
              type="text"
              id="email"
              placeholder="your email address"
              ref={emailRef}
              onClick={() => setIsValidEmail(true)}
              onChange={() => setError(false)}
              required
            />{(!isValidEmail) && (
              <p>invalid email</p>
            )}
            </div>
            <div>
            <input
              type="password"
              id="password"
              placeholder="your password"
              ref={passwordRef}
              onClick={() => setIsCorrectPassword(true)}
              required
            />{(!isCorrectPassword) && (
              <p>incorrect password</p>
            )}
            </div>
            <button onClick={handleLogIn}>Login</button>
          </div>
          {error && (
            <p>
              user not found with this email, Please <Link to="/signup">Register</Link>
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default LogIn;

const Container = styled.div`
  .form-container {
    height: 85vh;
    gap: 30px;

    .form {
      padding: 30px;
      width: 400px;
      gap: 30px;

      .input-container {
        gap: 30px;
        input {
          padding: 8px 15px;
          width: 300px;
          font-size: 15px;
        }
        p{
          color: #e90808;
        }
        button {
          padding: 8px 15px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          font-weight: 700;
          font-size: 16px;
        }
      }
    }
  }
`;
