import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.css';
import Navigation from "./navigation";
import PageContent from "./page-content";

function App() {
  return (
    <BrowserRouter>
       <div>
        <h1>DevCamp React Starter</h1>
        <Navigation />
        <PageContent/>
      </div>
    </BrowserRouter>
   
  );
}

export default App;
