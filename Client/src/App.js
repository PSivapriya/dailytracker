import {Route, Routes } from 'react-router-dom';
import './App.css';
import { About } from './components/About/About.jsx';
import { Blogs } from './components/Blogs/Blogs.jsx';
import { Hero } from './components/HeroSection/Hero.jsx';
import Nav from './components/Navbar/Nav.jsx';
import { NavDash, User } from './components/UserPage/User.jsx';
import UserHome from './components/UserPage/UserHome.jsx';
import ManageHabits from './components/UserPage/ManageHabit.jsx';
import DailyActivities from './components/UserPage/DailyActivities.jsx';
import History from './components/UserPage/History.jsx';
import OurSchedule from './components/UserPage/OurSchedule.jsx';

function App() {
  return (
    <div className='App'>
            
            <Routes>
             
              <Route path="/" element={<> <Nav/><Hero /><About /><Blogs /></>} />
              {/* <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup/>} /> */}
              <Route path="/user" element={<User/>} />
              <Route path="" element = {<NavDash />}>
              <Route path="/userHome" element={<UserHome />} />
              <Route path="/manageHabits" element={<ManageHabits />} />
              <Route path="/dailyActivities" element={<DailyActivities />} />
              <Route path="/history" element={<History />} />
              <Route path="/ourSchedule" element={<OurSchedule />} />
              </Route>
            </Routes>
      {/* /* <Hero />
      <About/>
      <Blogs/>
      
    <User/> */ }
    </div>
  );
}

export default App;
