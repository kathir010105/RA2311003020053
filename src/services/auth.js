import { Log } from '../middleware/logger';

export const authenticate = async () => {
  const token = import.meta.env.VITE_ACCESS_TOKEN;
  
  if (!token) {
    Log("frontend", "error", "auth", "Missing VITE_ACCESS_TOKEN in environment variables.");
    throw new Error('Missing VITE_ACCESS_TOKEN in environment variables.');
  }

  return token;
};

export const clearToken = () => {
  Log("frontend", "info", "auth", "Access token cleared (no-op as token is in env)");
};
