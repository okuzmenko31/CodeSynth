import React from 'react';
import Routes from "./routes"
import ParticlesBackground from './components/ParticlesBackground';

const App = () => { 

  return (
    <>
      <ParticlesBackground fpsLimit={120} speed={3}/>
      <div className="App">
          <Routes />
      </div>
    </>
  );
}

export default App;
