import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Error from '../pages/Error';
import LightApproval from '../pages/LightApproval';
import Layout from '../components/Layout';
import { refreshTokenAction } from '../Actions/auth';
import PrivateRoute from './privateRoutes';
import OpenRoute from './openRouter';
import hematogenix from '../assets/images/HematogenixRed.svg';

const App = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      if (localStorage.getItem('hema-token')) {
        const refreshToken = await refreshTokenAction();
        setReady(true);
        if (refreshToken.status === 200) {
          localStorage.setItem('hema-token', refreshToken.data.token);
          localStorage.setItem(
            'hema-token-refresh',
            refreshToken.data.refreshToken
          );
        } else {
          localStorage.removeItem('hema-token');
          localStorage.removeItem('hema-token-refresh');
          window.location.reload();
        }
      } else {
        setReady(true);
      }
    })();
  }, []);
  return !ready ? (
    <div className="flex items-center justify-center h-screen bg-primary2">
      <img src={hematogenix} alt="logo" />
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path=""
          element={
            <PrivateRoute>
              <LightApproval />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Error />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
    // </BrowserRouter>
  );
};
export default App;
