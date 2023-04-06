import React from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components'

const Home = () => {
  return (
    <Container>
      <Navbar />
        <div className='bg'>
          <div className='content flex column a-center j-center'>
            <h1>A New Way to Learn</h1>
            <p>
              "The best way to find yourself is to lose yourself in the service of others.
              <span> "Mahatma Gandhi"</span>
            </p>
          </div>
        </div>
    </Container>
  )
}

export default Home

const Container = styled.div`
  .content{
    color: white;
    font-weight: 500;
    gap: 20px;
    width: 50%;
    h1{
      margin-top:180px;
      font-weight: 500;
    }
    p{
      font-weight: 400;
      span{
        color: #0011ff;
      }
    }
  }
`
