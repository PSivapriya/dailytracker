import React, { useState } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { NavbarMenu } from "../Data/data";
import { MobileIcon } from "./NavbarStyle";
import { FaBars } from 'react-icons/fa';
import { Signup } from "../Register/Signup";
import { Login } from "../Register/Login";
import ErrorBoundary from "../Error/ErrorBoundary";

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] =useState(false);

  return (
    <nav className="bg-white py-4 shadow">
      <div className="container flex justify-between item-center ">
        <div className="text-lg flex items-center font-bold uppercase space-x-2">
          <CalendarMonthIcon />
          <p className="text-primary">Devify</p>
          <p className="text-secondary">Tracker</p>
        </div>
          
        <div className="flex items-center">
          <ul className="hidden md:flex items-center space-x-2">
            {NavbarMenu.map((item) =>{
                return <li key={item.id}>
                    <a href={item.link} className="py-1 py-3 hover:text-secondary ">{item.title}</a>
                </li>
            })
            }
          </ul>
        </div>

        <div className="space-x-2 flex items-center">
            <button className="hover:bg-secondary hover:text-white text-primary rounded-md border-2 border-secondary px-1 py-0.5" onClick={()=>{setShowSignup(true)}}>SignUp</button>
            {showSignup && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white rounded-xl overflow-hidden w-full max-w-3xl shadow-lg relative">
                  <button onClick={()=>setShowSignup(false)} className="absolute top-2 right-3 text-xl font-bold text-primary hover:text-third"> X </button>
                 <Signup isModal={true}/> 
                 
                </div>
              </div>
            )
            }

            <button className="hover:bg-secondary hover:text-white text-primary rounded-md border-2 border-secondary px-1 py-0.5" onClick={()=>{setShowLogin(true)}}>Login</button>
            {showLogin && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <button onClick={()=>setShowLogin(false)} className="float-right"> X </button>
                  <ErrorBoundary>
                  <Login/>
                  </ErrorBoundary>

                </div>
              </div>
               )
             }

             <div className="space-x-2">
            <button className="hover:bg-third hover:text-white text-white rounded-md border-2 border-secondary bg-secondary px-1 py-0.5">Get Started</button>
        </div>
        </div>
       <MobileIcon>
         <FaBars className="md:hidden" onClick={()=>{setIsOpen(!isOpen)}}/>
       </MobileIcon>
        {isOpen && (
        <div className="absolute top-16 right-0 w-1/2 text-black">
          <ul className="flex flex-col items-center rounded-3xl gap-6 py-4 text-lg bg-secondary">
            {NavbarMenu.map((item) => (
              <li key={item.id}>
                <a className="bg-secondary text-white " href={item.link}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
       </div>

    </nav>

    
  );
};

export default Nav;
