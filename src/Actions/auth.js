import { login, checkDomain, verifyAzureToken, refreshToken } from '../Services/auth';
import { setDomainTenant } from '../Store/reducers/common';
import { store } from '../Store';

const LoginAction = async (data) => {
  try {
    const result = await login(data);

    return result;
  } catch (err) {
    return err;
  }
};

const checkDomainAction = async (domain) => {
  const result = await checkDomain(domain);
  if (result.status === 200) {
    store.dispatch(setDomainTenant(result.data));
  }
  return result;
};

const verifyAzureTokenAction = async (domain) => {
  const result = await verifyAzureToken(domain);
  return result;
};
const refreshTokenAction = async () => {
  const result = await refreshToken({
    token: localStorage.getItem('hema-token'),
    refreshToken: localStorage.getItem('hema-token-refresh'),
  });
  return result;
};

export { LoginAction, checkDomainAction, verifyAzureTokenAction, refreshTokenAction };
