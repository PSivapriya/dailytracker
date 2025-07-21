// App.js
// import React, { useRef } from 'react';
import './App.css';
import { About } from './components/About/About.jsx';
import { Blogs } from './components/Blogs/Blogs.jsx';
import { Hero } from './components/HeroSection.js/Hero.jsx';
import Nav from './components/Navbar/Nav.jsx';
import { User } from './components/UserPage/User.jsx';
// import { Routes, Route } from 'react-router-dom';

function App() {
  // const inputRef = useRef();
  return (
    <div className='App'>
      {/* <Nav />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/user" element={<User />} />
      </Routes> */}
 {/* <input ref={inputRef} /> */}
      <Nav/>
      
      <Hero />
      <About/>
      <Blogs/>
      
    <User/>
    </div>
  );
}

export default App;
