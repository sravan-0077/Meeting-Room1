// API Base URL - Uses relative path '/api/auth' (proxied by NGINX) or direct EC2 backend URL
const API_BASE_URL = window.location.origin.includes('localhost:5173') || window.location.origin.includes('localhost:5174')
  ? 'http://localhost:8088/api/auth'
  : '/api/auth';

export async function signUpUser({ fullName, email, password }) {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullName, email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to sign up. Please try again.');
  }

  return data;
}

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Invalid email or password.');
  }

  return data;
}

export async function fetchCurrentUser(token) {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Session expired or invalid.');
  }

  return data;
}
