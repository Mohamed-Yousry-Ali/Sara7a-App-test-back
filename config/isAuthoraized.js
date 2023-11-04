const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const rbac = require("../rbac/rbac");

module.exports = (endPoint) => {
    return async (req, res, next) => {
        // console.log(req.headers);
        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "Send a valid Bearer token in the Authorization header" });
            }

            const token = authorizationHeader.split(" ")[1];

            if (!token) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "Send a valid Bearer token in the Authorization header" });
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

            if (!decodedToken.isLogin) {
                return res.status(StatusCodes.FORBIDDEN).json({ message: "Login first" });
            }

            if (!decodedToken.isVerified) {
                return res.status(StatusCodes.FORBIDDEN).json({ message: "Verify your account first" });
            }

            const isAllowed = await rbac.can(decodedToken.role, endPoint);
            // console.log(isAllowed)
            if (isAllowed) {
                // console.log(next())
                req.user = decodedToken
                next();
            } else {
                res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error", error: error.message });
        }
    };
};
