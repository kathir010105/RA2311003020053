import { logger } from '../middleware/logger';

export const authenticate = async () => {
  const token = import.meta.env.VITE_ACCESS_TOKEN;
  
  if (!token) {
    logger.logError('AUTH_FAILED', { error: 'Missing VITE_ACCESS_TOKEN in environment variables.' });
    throw new Error('Missing VITE_ACCESS_TOKEN in environment variables.');
  }

  return token;
};

export const clearToken = () => {
  logger.logInfo('TOKEN_CLEARED', { message: 'Access token cleared (no-op as token is in env)' });
};
