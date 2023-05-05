import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Error from '../pages/Error';
import LightApproval from '../pages/LightApproval';
import Layout from '../components/Layout';
import hematogenix from '../assets/images/HematogenixRed.svg';

const App = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return !ready ? (
    <div className="flex items-center justify-center h-screen bg-primary2">
      <img src={hematogenix} alt="logo" />
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<LightApproval />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};
export default App;
