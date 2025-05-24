// src/api/api.js

const API_BASE = 'https://localhost:8400/api/v1'; // Endpoint explícito y real

async function request(endpoint, { method = 'GET', body, token, ...customConfig } = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Basic ${token}` } : {}),
  };
  const config = {
    method,
    headers,
    ...customConfig,
  };
  if (body) config.body = JSON.stringify(body);

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  if (response.status === 204) {
    return null; // No Content
  }
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw error || { message: response.statusText };
  }
  return response.json();
}

// Auth
export function loginApi(data) {
  return request('/Auth/login', { method: 'POST', body: data });
}
export function logoutApi(token) {
  return request('/Auth/logout', { method: 'POST', token });
}

// Users
export function getUsersApi(token) {
  return request('/User/all', { token });
}
export function createUserApi(data, token) {
  return request('/User', { method: 'POST', body: data, token });
}
export function editUserApi(id, data, token) {
  return request(`/User/${id}`, { method: 'PUT', body: data, token });
}
export function deleteUserApi(id, token) {
  return request(`/User/${id}`, { method: 'DELETE', token });
}

// Puedes agregar más funciones para otros endpoints
