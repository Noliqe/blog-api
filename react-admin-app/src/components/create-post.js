import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function CreatePost() {
    const navigate = useNavigate();

    const handleForm = (event) => {
        event.preventDefault()
        fetch(`http://localhost:9000/admin/create-post`, {
            method: 'POST',
            body: JSON.stringify({
                title: event.target[0].value,
                text: event.target[1].value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            event.target[0].value = '';
            event.target[1].value = '';
            navigate(`/`);
        })
        .catch((err) => {
            console.log(err.message);
        })
    }
 
  return (
    <div className="App">
        <form className="formCreatePost" id="formCreatePost" onSubmit={handleForm}>
            <label htmlFor="title">Title</label>
            <input type="title" name="title" maxLength="30" required></input>
            <label htmlFor="text">Text</label>
            <textarea name="text" maxLength="200" title="Maximum of 200 characters" required></textarea>
            <input type="submit" className="submitPost"></input>
        </form>
    </div>
  );
}

export default CreatePost;