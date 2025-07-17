import Role from "../models/role.model.js";

export const createRole = async (iData) => {
    return await Role.create(iData);
};

export const getAllRoles = async (search = "") => {
    return await Role.find({
        rolename: { $regex: search, $options: "i" }
    });
};

export const updateRole = async (id, data) => {
    return await Role.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRole = async (id) => {
    return await Role.findByIdAndDelete(id);
};

export const getSingleRole = async (id) => {
    return await Role.findById(id);
};
