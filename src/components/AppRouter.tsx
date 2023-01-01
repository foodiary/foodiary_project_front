import MainPage from '@pages/MainPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;