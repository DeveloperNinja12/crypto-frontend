import React from 'react';
import DashBoard from './page/Dashboard';
import { ToastContainer } from 'react-toastify';
import Container from '@mui/material/Container';
import 'react-toastify/dist/ReactToastify.css'; // make sure to import CSS

const App: React.FC = () => {
  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <DashBoard />
    </Container>
  );
};

export default App;
