import React, { useState, useEffect } from 'react';
import './App.css';
import BlogList from './components/blog-list';
import CreatePost from './components/create-post';
import CommentId from './components/commentId';
import EditComment from './components/edit-comment';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
 
  return (
    <div className="App">
        <div className='header'>
          <a href='/'>Home</a>
          <a href='/create-post'>Create Post</a>
        </div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<BlogList/>} />
          <Route path="/create-post" element={<CreatePost/>} />
          <Route path="/comments/:id" element={<CommentId/>}/>
          <Route path="/comments/:id/comment/:id" element={<EditComment/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
