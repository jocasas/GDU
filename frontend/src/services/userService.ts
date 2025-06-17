const API_URL = 'http://localhost:3000/api/users';

export const getUsers = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const getUserByRut = async (rut: string) => {
  const response = await fetch(`${API_URL}/${rut}`);
  return response.json();
};

export const createUser = async (user: any) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const updateUser = async (rut: string, user: any) => {
  const response = await fetch(`${API_URL}/${rut}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUser = async (rut: string) => {
  await fetch(`${API_URL}/${rut}`, {
    method: 'DELETE',
  });
};