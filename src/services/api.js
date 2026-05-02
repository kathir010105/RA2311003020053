import { Log } from '../middleware/logger';
import { authenticate } from './auth';

export const fetchNotifications = async (page = 1, limit = 10, type = 'All') => {
  // Construct the URL with query parameters
  const baseUrl = '/evaluation-service/notifications';
  const url = new URL(baseUrl, window.location.origin);
  
  url.searchParams.append('page', page);
  url.searchParams.append('limit', limit);
  
  if (type && type !== 'All') {
    url.searchParams.append('notification_type', type);
  }

  const endpoint = url.toString();

  try {
    // Authenticate before calling API
    const token = await authenticate();

    Log("frontend", "info", "api", `API Request: GET ${endpoint}`);

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
    Log("frontend", "info", "api", `API Response: ${response.status} for ${endpoint} count: ${data.notifications?.length || 0}`);
    
    // Map the PascalCase response to camelCase expected by our UI
    return (data.notifications || []).map(notif => ({
      id: notif.ID,
      type: notif.Type,
      message: notif.Message,
      timestamp: notif.Timestamp
    }));
  } catch (error) {
    Log("frontend", "error", "api", `API Request failed for ${endpoint}: ${error.message}`);
    throw error;
  }
};
