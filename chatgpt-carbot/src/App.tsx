import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Col, Row } from 'antd';
import Chat from './Chat';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ask our assistant</h1>
        <main>
          <Chat />
        </main>
      </header>
      
    </div>
  );
}

export default App;
