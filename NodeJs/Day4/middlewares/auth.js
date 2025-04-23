const jwt = require('jsonwebtoken')

exports.auth = function (req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ status: 'faild', message: 'Authorization header is missing' });
    }

    try {
        let decoded = jwt.verify(authorization, process.env.Secret);
        console.log(decoded);
        next();
    } catch (error) {
        res.status(401).json({ status: 'faild', message: error.message });
    }
}
