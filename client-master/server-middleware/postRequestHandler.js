const qs = require('querystring');

export default function (req, res, next) {

    let body = '';

    req.on('data', (data) => {
        body += data
    });

    req.on('end', () => {
        req.body = qs.parse(body) || {};
        next();
    });
};