import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home';
import Posts from './components/posts';
import PostId from './components/postId';

function App() {
  const [apiResponse, setApiResponse] = useState('');

    useEffect(() => {
        fetch("http://localhost:9000/posts")
        .then(res => res.text())
        .then(res => setApiResponse(res))
    }, []);
    const routeHome = () => {
      fetch("http://localhost:9000/posts")
        .then(res => res.text())
        .then(res => setApiResponse(res))
    }

  return (
    <div className="App">
      <div className='header'>
        <a href='/'>Home</a>
        <a href='/posts'>Blog</a>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/posts" element={<Posts/>} />
          <Route path="/posts/:id" element={<PostId/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
