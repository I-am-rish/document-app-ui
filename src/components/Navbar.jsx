import React from 'react'
import {NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  const navigate = useNavigate();


  return (
    <Container>
        <div className="navbar flex a-center j-between">
            <NavLink to={'/home'}>WebApp</NavLink>
            <div className='link-button flex a.center j-between'>
              <div className='links flex'>
                  <NavLink to={'/newdocument'}>New Document</NavLink>
                  <NavLink to={'/documents'}>Documents</NavLink>
              </div>
              <button onClick={() => navigate('/')}>Log out</button>
            </div>
        </div>
    </Container>
  )
}

export default Navbar

const Container = styled.div`
  .navbar{
    height: 50px;
    color: #262626bf;
    padding: 0 95px;
    font-size: 16px;
    a{
        text-decoration: none;
    }

    .link-button{
        width: 500px;
        .links{
        gap: 40px;
        a{
            text-decoration: none;
            :hover{
                color: black;
            }
        }
    }
        button{
            border: none;
            background: transparent;
            font-size: 16px;
            color: #262626bf;
            cursor: pointer;
            :hover{
                color: #ff0000;
            }
        }
    }
  }
`