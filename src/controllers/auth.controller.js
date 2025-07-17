import bcrypt from "bcryptjs";
import * as authService from "../services/auth.service.js"
import * as userService from "../services/user.service.js"
import { registerSchema, loginSchema } from "../validation/auth.validation.js";
import ErrorHandler from "../utils/error.handler.js";
import { generateToken } from "../utils/token.handler.js";


// 1. register user
// 2. login user

export const signup = async (req, res, next) => {
    try {
        // validation
        const { error } = registerSchema.validate(req.body);
        if (error) return next(new ErrorHandler(error.details[0].message, 400));

        const { email, password } = req.body;

        // check exist or not (email)
        const existingUser = await userService.findUserByEmail({ email });
        if (existingUser) return next(new ErrorHandler("User already exists", 409));

        // genearte becrypt secure password
        const hashedPassword = await bcrypt.hash(password, 10);

        // add user
        const user = await authService.createUser(req.body, hashedPassword);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    try {
        // validation
        const { error } = loginSchema.validate(req.body);
        if (error) return next(new ErrorHandler(error.details[0].message, 400));

        const { email, password } = req.body;

        // find user (email)
        const user = await userService.findUserByEmail({ email });
        if (!user) return next(new ErrorHandler("Invalid credentials", 401));

        // match password in user model
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new ErrorHandler("Invalid credentials", 401));

        // generate auth token
        const token = generateToken({
            userId: user._id,
            username: user.username,
            email: user.email,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            // user: {
            //     id: user._id,
            //     username: user.username,
            //     email: user.email,
            // },
        });
    } catch (error) {
        next(error);
    }
};