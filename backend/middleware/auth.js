const { verifyToken } = require('../utils/jwt');
const { AppError } = require('../utils/errors');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('AUTHENTICATION_REQUIRED', 'Missing or invalid authorization header', 401);
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    next(new AppError('AUTHENTICATION_REQUIRED', 'Invalid or expired token', 401));
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('AUTHENTICATION_REQUIRED', 'Authentication required', 401));
    }

    // if (!roles.includes(req.user.role)) {
    //   return next(new AppError('INSUFFICIENT_PERMISSIONS', 'Insufficient permissions', 403));
    // }

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
