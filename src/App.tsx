import React from 'react';
import MainPage from '@pages/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OAuthRedirect from '@pages/OAuthRedirect';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/oauth/google/callback' element={<OAuthRedirect/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
