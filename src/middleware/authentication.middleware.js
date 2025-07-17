import ErrorHandler from "../utils/error.handler.js";
import { verifyToken } from "../utils/token.handler.js";

export const authentication = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "Not logged in" });

    const token = header.split(" ")[1];
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        console.log(req.user, "request user")
        next();
    } catch {
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
};
