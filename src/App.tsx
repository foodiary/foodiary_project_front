import AppRouter from '@components/AppRouter';
import MainTitle from '@pages/MainTitle';
import React from 'react';
function App() {
  return (
    <div className="App">
      <MainTitle/>
      <AppRouter/>
    </div>
  )
}

export default App;
