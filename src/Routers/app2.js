import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import AppRouter from './appRouter';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from '../msConfig';

const App = () => {
  const { common } = useSelector((state) => state);
  const [tenantIsActive, setTenantIsACtive] = useState(null);

  useEffect(() => {
    if (common.tenant) {
      setTenantIsACtive(common.tenant);
    }
  }, [common]);

  return tenantIsActive ? (
    <MsalProvider
      instance={
        new PublicClientApplication(
          msalConfig(
            tenantIsActive.azureClientId,
            tenantIsActive.azureTenantId,
            'http://localhost:3000/login'
          )
        )
      }
    >
      <AppRouter />
    </MsalProvider>
  ) : (
    <AppRouter />
  );
};

export default App;
