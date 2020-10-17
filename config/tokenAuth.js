var jwt = require('jsonwebtoken');
var config = require('./config');

verifyToken = function(req, res, next) {
    var token = req.headers['authorization'];
    if (!token) return res.status(401).send({ auth : false, message : 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth : false, message : 'Failed to authenticate token.' });
        next();
    });
}
module.exports = verifyToken;