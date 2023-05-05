import { LogLevel } from '@azure/msal-browser';
export const msalConfig = (clientId, tenentId, redirectUri) => {
  return {
    auth: {
      clientId: clientId,
      authority: `https://login.microsoftonline.com/${tenentId}`,
      redirectUri: redirectUri,
    },
    // cache: {
    //   cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    //   storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    // },
    system: {
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
            default:
              return;
          }
        },
      },
    },
  };
};
