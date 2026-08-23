const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const registerUser = async (userData: any) => {
  const registerResponse = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    }),
  });

  const registerData = await registerResponse.json();
  if (!registerResponse.ok) {
    throw new Error(registerData.error?.message || 'Registration failed');
  }

  return registerData;
};

export const loginUser = async (identifier: string, password: string) => {
  const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Login failed');
  }
  return data;
};

export const getMe = async (token: string) => {
  const response = await fetch(`${STRAPI_URL}/api/users/me`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return await response.json();
};

export const getUserData = async (token: string, email: string) => {
  // Fetch user-profile filtered by email
  const profileRes = await fetch(`${STRAPI_URL}/api/user-profiles?filters[email][$eq]=${email}&populate=*`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const profileData = await profileRes.json();

  // Fetch processes filtered by email
  const processRes = await fetch(`${STRAPI_URL}/api/processes?filters[email][$eq]=${email}&populate=*`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const processData = await processRes.json();

  return {
    profile: profileData.data?.[0] || null,
    processes: processData.data || []
  };
};

export const getCustomerQueries = async (token: string, email: string) => {
  const res = await fetch(`${STRAPI_URL}/api/custmerqueiries?filters[email][$eq]=${email}&sort[0]=createdAt:desc`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const data = await res.json();
  return data.data || [];
};

export const updateProfile = async (token: string, documentId: string, profileData: any) => {
  const response = await fetch(`${STRAPI_URL}/api/user-profiles/${documentId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: profileData }),
  });
  return response.json();
};

export const getSupportInfo = async (token: string) => {
  const res = await fetch(`${STRAPI_URL}/api/supports`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const data = await res.json();
  return data.data?.[0] || null;
};

export const createCustomerQuery = async (token: string, data: any) => {
  const res = await fetch(`${STRAPI_URL}/api/custmerqueiries`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: { ...data, active: true, publishedAt: new Date() } }),
  });
  return res.json();
};

export const updateCustomerQuery = async (token: string, documentId: string, comments: any[]) => {
  const res = await fetch(`${STRAPI_URL}/api/custmerqueiries/${documentId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: { comments } }),
  });
  return res.json();
};

export const createUserProfile = async (token: string, profileData: any) => {
  const response = await fetch(`${STRAPI_URL}/api/user-profiles`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ data: profileData }),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'Failed to create profile');
  }
  return data;
};

export const getAddProcesses = async (token: string, email: string) => {
  const res = await fetch(`${STRAPI_URL}/api/addprocesses?filters[email][$eq]=${email}&populate=*`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const data = await res.json();
  return data.data || [];
};
