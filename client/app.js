import React from 'react';

import {Navbar} from './components';
import Routes from './routes';


const App = () => {
  return (
    <div className="site-container">
      <Navbar />
      <div className="site-container">
      <Routes />
      </div>
    </div>
  );
};

export default App;
