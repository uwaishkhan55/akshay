
const jwt = require('jsonwebtoken');
const authenticateJWT = (req, res, next) => {
    const authHeader = req.cookies['token'];

    if (authHeader) {
        console.log(authHeader)
        const token = authHeader;

        jwt.verify(token, 'akshay', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports=authenticateJWT