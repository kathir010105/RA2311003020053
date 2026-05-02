/**
 * Logger Middleware
 * Provides structured logging for the application.
 */

class Logger {
  log(level, action, status, details) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      action,
      status,
      details,
    };

    // In a real app, this might send data to a remote logging service.
    // For now, we log to the console with appropriate formatting.
    const message = `[${timestamp}] [${level}] ${action} - ${status}`;

    switch (level) {
      case 'INFO':
        console.log(message, details);
        break;
      case 'WARNING':
        console.warn(message, details);
        break;
      case 'ERROR':
        console.error(message, details);
        break;
      default:
        console.log(message, details);
    }
  }

  logInfo(action, details = {}) {
    this.log('INFO', action, 'SUCCESS', details);
  }

  logWarning(action, details = {}) {
    this.log('WARNING', action, 'WARNING', details);
  }

  logError(action, error = {}) {
    this.log('ERROR', action, 'FAILED', error);
  }

  logApiRequest(url, method = 'GET', details = {}) {
    this.log('INFO', 'API_REQUEST', 'PENDING', { url, method, ...details });
  }

  logApiResponse(url, status, data = {}) {
    this.log('INFO', 'API_RESPONSE', 'SUCCESS', { url, status, data });
  }
}

export const logger = new Logger();
