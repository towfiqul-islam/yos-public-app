import React from 'react';
import './App.css';
import Home from './components/home/Home';
import AppState from './context/AppState';

function App() {
  return (
    <>
      <AppState>
        <Home />
      </AppState>
    </>
  );
}

export default App;
