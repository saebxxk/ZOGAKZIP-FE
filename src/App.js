import React, { useState } from 'react';
import AppRouter from './routes/AppRouter';

import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import logo from './assets/icons/logo.svg';
import './App.css';


function App() {
  return(
    <div className="App">
      <Header />
      <main>
        <AppRouter />
      </main>
      <Footer />
    
    </div>
  );
}



function Modal(){
  return(
    <div className="box">
      <h4>Title</h4>
      <p>Contents</p>
      <span>Date</span>
    </div>
  )
}






export default App;
