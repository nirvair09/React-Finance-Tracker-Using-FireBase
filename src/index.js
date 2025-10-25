import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
    <ToastContainer />
    <App />
    </>
)