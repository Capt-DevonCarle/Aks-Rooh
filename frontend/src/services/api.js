const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4000/api';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request(path, { token, ...options } = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const response = await fetch(`${baseUrl}${path}`, { ...options, headers });
  const body = response.status === 204 ? null : await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(body?.error || 'Unable to complete that request.', response.status);
  }

  return body;
}

export default {
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  deleteAccount: (token) => request('/auth/me', { method: 'DELETE', token }),
  entries: (token) => request('/entries', { token }),
  createEntry: (token, entry) => request('/entries', { method: 'POST', token, body: JSON.stringify(entry) }),
  deleteEntry: (token, id) => request(`/entries/${id}`, { method: 'DELETE', token }),
  insights: (token) => request('/insights', { token }),
  exportData: (token) => request('/export', { token }),
};
