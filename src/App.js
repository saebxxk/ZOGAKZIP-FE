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


export default App;
