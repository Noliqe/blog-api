import '../App.css';
import React, { useState, useEffect } from 'react';
import Post from "./post";

const Posts = () => {
    const [apiResponse, setApiResponse] = useState([]);
  
      useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetch("http://localhost:9000/posts");
                const result = await response.json();
                let data = result;
                let dataForm = [];
                data.forEach(element => {
                    if (element.public) {
                        dataForm.push(
                            <Post 
                            key={element._id}
                            data={element}/>
                        )
                    }
                });
                setApiResponse(dataForm);

            } catch (error) {
                console.error("Error:", error);
            }
        }
        getPosts();
      }, []);
  
return (
    <div className='posts'>
        {apiResponse.length > 0 ? apiResponse : "There are no posts..."}
    </div>
)};
  
export default Posts;