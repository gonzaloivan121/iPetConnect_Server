function authorization(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "You are unauthorized to access the requested resource.",
            details: {},
            description: "You tried accessing this resource without an authorization header.",
            code: "ERROR.UNAUTHORISED",
            http_response: {
                message: "You are unauthorized to access the requested resource.",
                code: 401
            }
        });
    }

    if (req.headers.authorization !== `Bearer ${process.env.API_KEY}`) {
        return res.status(401).json({
            message: "You are unauthorized to access the requested resource.",
            details: {},
            description: "You tried accessing this resource with an incorrect authorization header.",
            code: "ERROR.UNAUTHORISED",
            http_response: {
                message: "You are unauthorized to access the requested resource.",
                code: 401
            }
        });
    }

    next();
}

module.exports = authorization;