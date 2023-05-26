import React, { useState, useEffect } from 'react';
import '../App.css';

function BlogList() {
  const [apiResponse, setApiResponse] = useState("");
  const [updatePublic, setUpdatePublic] = useState(0);

  const handlePublic = (boolean, id) => {
    fetch(`http://localhost:9000/admin/public`, {
            method: 'POST',
            body: JSON.stringify({
                public: boolean,
                id: id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            setUpdatePublic(updatePublic + 1);
        })
        .catch((err) => {
            console.log(err.message);
        })
  }
  
  useEffect(() => {
    const getPosts = async () => {
        try {
            const response = await fetch("http://localhost:9000/posts");
            const result = await response.json();
            let data = result;
            let dataForm = [];
            data.forEach(element => {
                dataForm.push(
                    <div className='blogList' key={element._id}>
                      <a href={"/comments/" + element._id}>{element.title}</a>
                      <button 
                      style={{ backgroundColor: element.public ? "green" : "red"}}
                      onClick={() => {handlePublic(element.public ? "false" : "true", element._id)}}
                      >{element.public ? "unpublish" : "publish"}</button>
                    </div>
                )
            });
            setApiResponse(dataForm);

        } catch (error) {
            console.error("Error:", error);
        }
    }
    getPosts();
  }, [updatePublic]);
  return (
    <div className="Posts">
      {apiResponse}
    </div>
  );
}

export default BlogList;
