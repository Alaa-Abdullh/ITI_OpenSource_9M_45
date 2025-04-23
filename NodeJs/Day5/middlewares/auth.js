const jwt = require('jsonwebtoken')


exports.auth = function (req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ status: 'faild', message: 'Authorization header is missing' });
    }

    try {
        let decoded = jwt.verify(authorization, process.env.Secret);
        console.log(decoded);

        req.id=decoded.id
        req.role=decoded.role

        next();
    } catch (error) {
        res.status(401).json({ status: 'faild', message: error.message });
    }
}


exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.role)) {
        return res.status(403).json({
          status: 'failed',
          message: 'You do not have permission to perform this action'
        });
      }
      next();
    };
  };
  
