import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from "./routes"
import ParticlesBackground from './components/ParticlesBackground';

const App = () => { 

  return (
    <>
      <ParticlesBackground fpsLimit={120} speed={3}/>
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
