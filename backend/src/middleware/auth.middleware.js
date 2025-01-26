import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Retrieve the token from cookies
        const token = req.cookies.jwt;

        // Check if the token exists
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // Verify the token using the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token is valid
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        // Find the user in the database using the `id` from the decoded token
        const user = await User.findOne({
            where: { id: decoded.userId }, // Use Sequelize query syntax for PostgreSQL
            attributes: { exclude: ['password'] } // Exclude the password field from the result
        });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User Not Found" });
        }

        // Attach the user to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};
