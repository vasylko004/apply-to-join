import React from 'react';
import AppHeader from "../components/header";
import logo from '../logo.svg';

export default function Home(){
    return <div className="App">
      <AppHeader />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
               
      </header>
    </div>
}