const jwt = require('jsonwebtoken');
const db = require('../db');

function authenticate(request, response, next) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return response.status(401).json({ error: 'Authentication is required.' });
  try {
    request.user = jwt.verify(token, process.env.JWT_SECRET);
    if (!db.get('SELECT id FROM users WHERE id = ?', [request.user.sub])) {
      return response.status(401).json({ error: 'Your session is invalid or has expired.' });
    }
    return next();
  } catch {
    return response.status(401).json({ error: 'Your session is invalid or has expired.' });
  }
}

module.exports = { authenticate };
