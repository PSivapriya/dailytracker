import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import './index.css';
import App from './App';
import { AuthProvider } from './components/context/AuthContext';
import { HabitsProvider } from './components/context/HabitsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <AuthProvider>
        <HabitsProvider>
            <Router>
                 <App />
             </Router>  
        </HabitsProvider>  
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

