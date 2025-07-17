import User from "../models/User.model.js";

export const createUser = async (iData, password) => {
    const user = await User.create({
        ...iData,
        password
    });
    return user;
};