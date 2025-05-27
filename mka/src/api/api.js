// src/api/api.js


// dev API connection - localhost
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

// AdsUpload
// Elimina la versión antigua si no se usa, o renómbrala si necesitas ambas
// export function uploadFileApi(data, token) {
//   return request('/UploadAds/AdsUpload', { method: 'POST', body: data, token });
// }

// Subida de archivo CSV al backend
export async function uploadFileApi(file) {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE}/UploadAds/AdsUpload`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Basic ${token}` } : {}),
      // No poner Content-Type, el navegador lo gestiona con FormData
    },
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw error || { message: response.statusText };
  }
  return response.json();
}

// Report
export async function getReportApi({ startDate, endDate, campaignId, platformId, region }) {
  const token = localStorage.getItem('token');
  const params = new URLSearchParams();
  if (startDate) params.append('StartDate', startDate);
  if (endDate) params.append('EndDate', endDate);
  if (campaignId) params.append('CampaignId', campaignId);
  if (platformId) params.append('PlatformId', platformId);
  if (region) params.append('Region', region);
  const response = await fetch(`${API_BASE}/Report/Generate?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Basic ${token}` } : {}),
    },
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw error || { message: response.statusText };
  }
  return response.json();
}
