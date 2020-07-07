
// import Base64 from "./base64"
export const GET = async (endpoint, params = {}, headers = {}) => {
  const token = sessionStorage.jwt;
  headers['Content-Type'] = 'application/json';
  headers['Authorization'] = token;
  let url = new URL(endpoint);
  console.log(params);
  if (Object.keys(params).length !== 0) {
  Object.keys(params).forEach(key => {url.searchParams.append(key, params[key]); })
}
  return fetch (url, {
    method: 'GET',
    headers: headers,
  }).then (res => res.json ());
};

export const POST = async (endpoint, params = {}, headers = {}, body = {}) => {
  const token = sessionStorage.jwt;
  headers['Content-Type'] = 'application/json';
  headers['Authorization'] = token;
  return fetch (endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify (body),
  }).then (res => res.json ());
};

export const POST_NOBODY = async (endpoint, params = {}, headers = {}, body = {}) => {
  headers["Content-Type"] = "application/json";
  const token = sessionStorage.jwt;
  headers["Authorization"] = token;
  return fetch(endpoint, {
     method: "POST",
     headers: headers,
     body: JSON.stringify(body)
  });
};


export const POSTLOGIN = async (
  endpoint,
  headers = {},
  body = {}
) => {
  headers['Content-Type'] = 'application/json';
  return fetch (endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify (body),
  });
};

export const PUT = async (endpoint, params = {}, headers = {}, body = {}) => {
  const token = sessionStorage.jwt;
  headers['Content-Type'] = 'application/json';
  headers['Authorization'] = token;
  return fetch (endpoint, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify (body),
  });
};

export const DELETE = (endpoint, params = {}, headers = {}) => {
  const token = sessionStorage.jwt;
  headers['Authorization'] = token;
  return fetch (endpoint, {
    method: 'DELETE',
    headers: headers,
  });
};
