import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import styled from 'styled-components';

const Documents = () => {
  const[noteValues] = useState({});
  const[notes, setNotes] = useState([]);
  const[title, setTitle] = useState('');
  const[text, setText] = useState('');
  const[isNewDocument, setIsNewDocument] = useState(false);
  const titleRef = useRef('');
  const textRef = useRef('');

  useEffect(() => {
    fetch('https://document-app-server.onrender.com/api/notes')
    .then((res) => res.json())
    .then(data => {
      setNotes(data);
    })
  },[isNewDocument]);

  const deleteNote = (e) => {
    e.target.parentElement.parentElement.parentElement.remove();
    const title = e.target.parentElement.parentElement.children[0].innerHTML;
    fetchAndDelete(title);
  }

  const getTargetNoteData = (e) => {
    const title = e.target.parentElement.parentElement.children[0].innerHTML;
    noteValues.oldTitle = title;
    setTitle(title);
    const text = e.target.parentElement.parentElement.parentElement.children[1].innerHTML;
    setText(text);
  }

  const editNote = (e) =>{
    setIsNewDocument(true);
    getTargetNoteData(e)
  }

  const btnHandler = () => {
    const newNoteValue = {};
    newNoteValue.title = titleRef.current.value;
    newNoteValue.text = textRef.current.value;
    noteValues.newNoteValue = newNoteValue;
    updateDataInToDatabase(noteValues);
    setIsNewDocument(false);

  }
  
  // update note data into database
  const updateDataInToDatabase = (newNoteValue) => {
    const options = {
      method: 'PUT',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(newNoteValue),
    }

    fetch('https://document-app-server.onrender.com/api/notes', options);
  }

  //fetch and delete data
  const fetchAndDelete = (titleValue) => {
    fetch(`https://document-app-server.onrender.com/api/notes/${titleValue}`, {method:'delete'})
  }


  return (
    <>

    {
      (isNewDocument) === true ? 
      <Container1>
        <div className="container flex j-center">
            <div className="input-container flex column">
                <div className='input-box flex column'>
                    <p>Take Your Note-</p>
                    <input name='title' type="text" defaultValue={title} ref={titleRef}/>
                    <textarea name='text' defaultValue={text} autoFocus id='todo' cols="40" rows="15"  ref={textRef}></textarea>
                </div>
                <button onClick={btnHandler}>Submit</button>

            </div>
        </div>
    </Container1>
      
      :

      <Container>
      <Navbar />
      <div className="notes-container x">
        {
          notes.map((obj, idx) => {
            return <div id={idx} key={idx} className="notes flex column">
            <div className='flex j-between'>
            <p id='title'>{obj.title}</p>
            <div className='buttons flex'>
              <button onClick={editNote}>edit</button>
              <button onClick={deleteNote}>delete</button>
            </div>
            </div>
            <p id='text'>{obj.text}</p>
          </div>
          })
        }
      </div>
      </Container>
    }
    </>
  )
}

export default Documents

const Container = styled.div`
  .notes-container{
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    gap: 10px;
    margin-top: 10px;
    .notes{
      margin-bottom: 10px;
      background-color: #f7f2f2;
      border: 1px solid black;
      padding: 5px 10px;
      cursor: pointer;
      .buttons{
        gap: 10px;
        button{
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 15px;
        }
      }
      p:first-child{
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
`

const Container1 = styled.div`
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