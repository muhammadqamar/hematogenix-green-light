import { post, get } from './http';
import { errorHandling } from './error';

const login = async (data) => {
  try {
    return await post(`identity/login`, data, {
      TenantId: process.env.REACT_APP_TENANT_ID,
    });
  } catch (err) {
    errorHandling(err?.response);
    return err?.response?.data;
  }
};

const checkDomain = async (domain) => {
  try {
    return await get(`identity/tenants/${domain}`, {
      TenantId: process.env.REACT_APP_TENANT_ID,
    });
  } catch (err) {
    // errorHandling(err?.response)
    return err?.response?.data;
  }
};

const verifyAzureToken = async (domain) => {
  try {
    return await post(`identity/token`, undefined, {
      Authorization: `Bearer ${domain}`,
      TenantId: process.env.REACT_APP_TENANT_ID,
    });
  } catch (err) {
    errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};
const refreshToken = async (data) => {
  try {
    return await post(`identity/refresh-token`, data, {
      TenantId: process.env.REACT_APP_TENANT_ID,
    });
  } catch (err) {
    // errorHandling(err?.response?.data);
    return err?.response?.data;
  }
};

export { login, checkDomain, verifyAzureToken, refreshToken };
