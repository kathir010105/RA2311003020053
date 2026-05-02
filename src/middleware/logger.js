export const Log = (stack, level, pkg, message) => {
  const token = import.meta.env.VITE_ACCESS_TOKEN;
  
  // Enforce message length constraints (5-48 chars)
  let safeMsg = String(message || 'event');
  if (safeMsg.length < 5) safeMsg = safeMsg.padEnd(5, '.');
  if (safeMsg.length > 48) safeMsg = safeMsg.substring(0, 45) + '...';

  const payload = { stack, level, package: pkg, message: safeMsg };

  // Log to console locally
  const logMethod = console[level] || console.log;
  logMethod(`[${level.toUpperCase()}] [${pkg}] ${message}`);

  if (token) {
    fetch('/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
    .then(async (res) => {
      if (!res.ok) {
        const errText = await res.text();
        console.error(`Log API Error (${res.status}):`, errText);
      }
    })
    .catch(err => {
      console.error('Failed to send log to server:', err);
    });
  }
};
