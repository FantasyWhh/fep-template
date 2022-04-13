import React from 'react';
import logo from '../assets/images/logo.svg';

function App() {
  const click = () => {
    window.location.href = '/mall.html';
  };

  return (
    <div className="app">
      <div className="content">
        <img src={logo} alt="" />
        <h1>This is your app!</h1>
        <button onClick={click}>change page</button>
      </div>
    </div>
  );
}

export default App;
