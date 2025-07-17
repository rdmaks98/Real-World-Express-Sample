import User from "../models/User.model.js";


export const findUserByEmail = async (email) => {
    return await User.findOne(email);
};


export const findUserById = async (id) => {
    return await User.findById(id).populate("role", "rolename accessmodules");
};

export const getUsersWithRole = async (search) => {
    return await User.find({ username: { $regex: search, $options: "i" } }, { isdelete: false })
        .select("-password -_id -__v") // exclude fields
        .populate({
            path: "role",
            select: "rolename accessmodules -_id" // Exclude _id from role
        });
};


export const listUsers = async () => {
    return await User.find().sort({ updatedAt: -1 }) // recently updated
        .limit(5)
        .select("_id firstname lastname");;
}

export const checkUserAccess = async (userId, module) => {
    const user = await User.findById(userId).populate("role");
    return user?.role?.accessmodules.includes(module);
};

export const updateAllUsersSameDataService = async (data) => {
    const result = await User.updateMany({}, { $set: data });
    return result.modifiedCount;
};

export const updateMultipleUsersDifferentfields = async (updatePayload) => {
    const bulkOps = updatePayload.map(({ _id, fields }) => {
        return {
            updateOne: {
                filter: { _id },
                update: { $set: fields },
            }
        };
    });


    const result = await User.bulkWrite(bulkOps);
    return {
        updatedCount: result.modifiedCount || 0,
        updatedUsers: updatePayload.map(({ _id, fields }) => ({ _id, fields }))
    };
};
