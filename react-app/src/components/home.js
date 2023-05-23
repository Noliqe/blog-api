import '../App.css';
import React, { useState, useEffect } from 'react';

const Home = () => {
    const [apiResponse, setApiResponse] = useState('');
  
      useEffect(() => {
          fetch("http://localhost:9000/")
          .then(res => res.text())
          .then(res => setApiResponse(res))
      }, []);
  
return (
<div className='home'>
    <p>Hello!</p>
    <p>{apiResponse}</p>
</div>
);
}
  
  export default Home;