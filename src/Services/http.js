import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_VERSION;

const http = axios.create({ baseURL: `${baseURL}/` });

function getAuthHeader() {
  const accessToken = localStorage.getItem("green-light-auth");
  let authHeader = { "Content-Type": "application/json" };
  if (accessToken) {
    authHeader = { Authorization: `Bearer ${accessToken}` };
  }
  return authHeader;
}
function getBlob(url, headers = {}, params = {}, signal = {}) {
  return http.get(url, {
    responseType: "blob",
    headers: { ...getAuthHeader(), ...headers },
  });
}

function get(url, headers = {}, params = {}, signal = null) {
  return http.get(url, {
    params,
    signal,
    headers: { ...getAuthHeader(), ...headers },
  });
}

function post(url, data, headers = {}, params = {}) {
  return http.post(url, data, {
    ...params,
    headers: { ...getAuthHeader(), ...headers },
  });
}

function put(url, data, headers = {}) {
  return http.put(url, data, { headers: { ...getAuthHeader(), ...headers } });
}

function remove(url, data, headers = {}) {
  return http.delete(url, {
    headers: { ...getAuthHeader(), ...headers },
    data,
  });
}

export { http, get, post, put, remove ,getBlob};
