import React, { Suspense } from 'react';
const DashBoard = React.lazy(() => import('./page/Dashboard'));
import { ToastContainer } from 'react-toastify';
import Container from '@mui/material/Container';
import 'react-toastify/dist/ReactToastify.css'; // make sure to import CSS
import ErrorBoundary from './components/error-boundary/ErrorBoundary';

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
      <ErrorBoundary>
        <Suspense fallback={<div>Loading dashboard...</div>}>
          <DashBoard />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
};

export default App;
