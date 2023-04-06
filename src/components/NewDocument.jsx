import React, { useRef} from 'react'
import styled from 'styled-components';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const NewDocument = () => {
    const navigate = useNavigate();
    const titleRef = useRef();
    const textRef = useRef();

    const btnHandler = ()=> {
        let currentTitleValue = titleRef.current.value;
        let currentTextValue = textRef.current.value;
        if(currentTitleValue !== ""){
            if(currentTextValue.length > 0){
                const note = {};
                note.title = currentTitleValue;
                note.text = currentTextValue;
                uploadDataInToDataBase(note);
                navigate('/documents')
            }
        }
    }

    //post data into database
    const uploadDataInToDataBase = async(noteData) => {
        const options = {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(noteData)
        }
    
        await fetch('https://document-app-server.onrender.com/api/notes', options)
        .then(() => {
          console.log('note uploaded');
        })
        .catch(() => {
          console.log('error while uploading note');
        })
      };


  return (
    <Container>
        <Navbar />
        <div className="container flex j-center">
            <div className="input-container flex column">
                <div className='input-box flex column'>
                    <p>Take Your Note-</p>
                    <input type="text" placeholder='Enter title' ref={titleRef}/>
                    <textarea autoFocus id='todo' cols="40" rows="15" ref={textRef} placeholder='Enter here...'></textarea>
                </div>
                <button onClick={btnHandler}>Submit</button>

            </div>
        </div>
    </Container>
  )
}

export default NewDocument;

const Container = styled.div`
    .container{
        height: 80vh;

        .input-container{
            height: 300px;
            gap: 20px;
            padding: 20px;

            .input-box{
                gap: 10px;
                p{
                font-size: 20px;
                }
                input{
                    padding: 5px 5px;
                    font-size: 15px;
                }
                textarea{
                    border: 1px solid black;
                    padding: 5px;
                    font-size: 16px;
                }
            }
            button{
                padding: 8px 0;
                font-size: 16px;
                border:none;
                border-radius: 5px;
                font-weight: 700;
                cursor: pointer;
                :hover{
                    color: blue;
                }
            }
        }
    }
`