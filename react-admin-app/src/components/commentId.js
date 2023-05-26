import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import '../App.css';
import { useNavigate } from 'react-router-dom';

function CommentId() {
    const [apiResponse, setApiResponse] = useState('');
    const [updateList, setUpdateList] = useState(0);
    let { id } = useParams();
    const navigate = useNavigate();

    const deleteComment = (commentId) => {
        console.log(commentId);
        fetch(`http://localhost:9000/admin/delete-comment`, {
            method: 'POST',
            body: JSON.stringify({
                postId: id,
                commentId: commentId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            setUpdateList(updateList +1);
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    const editComment = (commentId) => {
        navigate(`/comments/${id}/comment/${commentId}`);
    }

    useEffect(() => {
        fetch(`http://localhost:9000/admin/comments/${id}`)
        .then(res => res.json())
        .then(res => {
            const dataArray = [];
            if (res.comments !== undefined) {
                res.comments.forEach(element => {
                    dataArray.push(
                        <div className='comment' key={element._id}>
                            <div className='commentEdit'>
                                <button style={{color: 'grey'}} onClick={() => {editComment(element._id)}}> Edit</button>
                                <button style={{color: "red"}} onClick={() => {deleteComment(element._id)}}>X</button>
                            </div>
                            <div className='commentData'>
                                <p>{element.name}</p>
                                <p>{element.text}</p>
                            </div>
                    </div>
                    )
                })
            }
            setApiResponse(dataArray);
        })
    }, [updateList]);
 
  return (
    <div className="commentId">
        {apiResponse}
    </div>
  );
}

export default CommentId;