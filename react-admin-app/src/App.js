import React, { useState, useEffect } from 'react';
import './App.css';
import BlogList from './components/blog-list';
import CreatePost from './components/create-post';
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
