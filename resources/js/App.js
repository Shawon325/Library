import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './routes/AppRoute';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
      <BrowserRouter>
            <NavBar/>
            <AppRoute/>
            <ToastContainer />
      </BrowserRouter>
  );
}

export default App;
