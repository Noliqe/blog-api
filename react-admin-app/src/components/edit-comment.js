import React, { useState, useEffect } from 'react';
import '../App.css';
import { useParams, useNavigate } from "react-router-dom";

function EditComment() {
    const [textValue, setTextValue] = useState('');
    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:9000/admin/comment/${id}`)
        .then(res => res.json())
        .then(res => setTextValue(res.text))
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(`http://localhost:9000/admin/edit-comment`, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                text: event.target[0].value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            event.target[0].value = '';
            navigate(`/`);
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    const handleChange = (event) => {
        setTextValue(event.target.value)
    }
 
  return (
    <div className="editComment">
         <form className="formCreatePost" id="formCreatePost" onSubmit={handleSubmit}>
            <label htmlFor="text">Text</label>
            <textarea name="text" onChange={handleChange} maxLength="200" title="Maximum of 200 characters" value={textValue} required></textarea>
            <input type="submit" className="submitPost"></input>
        </form>
    </div>
  );
}

export default EditComment;