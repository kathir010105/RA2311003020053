import { logger } from '../middleware/logger';
import { authenticate } from './auth';

export const fetchNotifications = async (page = 1, limit = 10, type = 'All') => {
  // Construct the URL with query parameters
  const baseUrl = 'http://20.207.122.201/evaluation-service/notifications';
  const url = new URL(baseUrl);
  
  url.searchParams.append('page', page);
  url.searchParams.append('limit', limit);
  
  if (type && type !== 'All') {
    url.searchParams.append('notification_type', type);
  }

  const endpoint = url.toString();

  try {
    // Authenticate before calling API
    const token = await authenticate();

    logger.logApiRequest(endpoint, 'GET', { headers: { Authorization: `Bearer ***` } });

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    logger.logApiResponse(endpoint, response.status, { count: data.notifications?.length || 0 });
    
    // Map the PascalCase response to camelCase expected by our UI
    return (data.notifications || []).map(notif => ({
      id: notif.ID,
      type: notif.Type,
      message: notif.Message,
      timestamp: notif.Timestamp
    }));
  } catch (error) {
    logger.logError('API_REQUEST_FAILED', { endpoint, error: error.message });
    throw error;
  }
};
