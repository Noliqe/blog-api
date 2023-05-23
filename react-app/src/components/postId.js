import { useParams } from "react-router-dom";
import '../App.css';
import React, { useState, useEffect } from 'react';
import Comment from "./comment";

const Post = (props) => {
    const [apiResponse, setApiResponse] = useState('');
    const [apiComments, setApiComments] = useState('');
    const [apiCommentsArray, setApiCommentsArray] = useState('');
    const [commentsLength, setCommentsLength] = useState(0);
    let { id } = useParams();
  
    useEffect(() => {
        fetch(`http://localhost:9000/posts/${id}`)
        .then(res => res.json())
        .then(res => setApiResponse(res))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:9000/posts/${id}/comments`)
        .then(res => res.json())
        .then(res => setApiComments(res))
    }, []);

    useEffect(() => {
        if (apiResponse !== '') {
            setCommentsLength(apiResponse.comments.length);
        }
    }, [apiResponse]);

    useEffect(() => {
        if (apiComments !== '') {
            const commentsArray = [];
            apiComments.comments.forEach(element => {
                commentsArray.push(
                    <Comment 
                    key={element._id}
                    data={element}/>
                )
            });
            setApiCommentsArray(commentsArray);
        }
    }, [apiComments]);

    const updateComments = () => {
        fetch(`http://localhost:9000/posts/${id}/comments`)
        .then(res => res.json())
        .then(res => setApiComments(res))
    }

    const handleForm = (event) => {
        event.preventDefault()
        fetch(`http://localhost:9000/posts/${id}/comments`, {
            method: 'POST',
            body: JSON.stringify({
                name: event.target[0].value,
                text: event.target[1].value,
                id: id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then(() => {
            event.target[0].value = '';
            event.target[1].value = '';
            updateComments();
            setCommentsLength(commentsLength +1);
        })
        .catch((err) => {
            console.log(err.message);
        })
    }


return (
    <div className='postId'>
        <div className="postIdContainer">
            <div className="postIdTitle">
                <h2>{apiResponse.title}</h2>
            </div>
            <div className="postIdSubTitle">
                {apiResponse.timestamp || "date"} | {commentsLength} comments
            </div>
            <div className="postIdImage">
                <p>Image</p>
            </div>
            <div className="postIdText">
                <p>{apiResponse.text}</p>
            </div>
        </div>
        <div className="postIdLine"></div>
        <div className="postIdComments">
            <div className="postIdCommentsForm">
                <h3>Join the discussion</h3>
                <form className="formComments" id="formComments" onSubmit={handleForm}>
                    <input type="text" className="inputName" maxLength="30" placeholder="Name*" required></input>
                    <textarea className="inputText" maxLength="200" placeholder="Your message..." title="Maximum of 200 characters" required></textarea>
                    <input type="submit" className="submitFormComments"></input>
                </form>
            </div>
            <div className="postIdLine"></div>
            <div className="postIdCommentsContainer">
                {apiCommentsArray}
            </div>
        </div>
    </div>
)};
  
export default Post;