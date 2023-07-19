import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { required } from 'react-admin';
import 'rsuite/dist/styles/rsuite.min.css';
import 'rsuite/dist/rsuite-no-reset.min.css';


// const express=required("express")
// const app=express();
// const cors = require("cors");
// app.use(cors());
ReactDOM.render(
  
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
