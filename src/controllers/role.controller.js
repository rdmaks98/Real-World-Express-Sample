import { createRoleSchema, updateRoleSchema } from "../validation/role.valdation.js";
import * as roleService from '../services/role.service.js';
import ErrorHandler from "../utils/error.handler.js";

// 1. insert role
// 2. get roleList
// 3. update role via roleid
// 4. remove role via roleid
// 5. single role via roleid

export const createRole = async (req, res, next) => {
    try {
        const { error } = createRoleSchema.validate(req.body);
        if (error) return res.status(400).json({ success: false, message: error.message });

        const role = await roleService.createRole(req.body);
        res.status(201).json({ success: true, data: role, message: "Role Create Successfully" });
    } catch (err) {
        console.log("create role error:", err)
        next(err);
    }
};

export const getRoles = async (req, res) => {
    try {
        const search = req.query.search || "";
        const roles = await roleService.getAllRoles(search);
        res.status(200).json({ success: true, data: roles, message: "Roles find successfully using a rolename" });
    }
    catch (err) {
        console.log("get roles error:", err)
        next(err);
    }

};

export const updateRole = async (req, res) => {
    try {
        const id = req.params.id;
        const { error } = updateRoleSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const findRole = await roleService.getSingleRole(id);
        if (!findRole) {
            return next(new ErrorHandler("Role is not Found", 404));
        }
        const role = await roleService.updateRole(id, req.body);
        res.status(200).json({ success: true, data: role, message: "Role Update Successfully" });
    } catch (err) {
        console.log("update role error:", err)
        next(err);
    }
};

export const deleteRole = async (req, res) => {
    try {
        const id = req.params.id;
        const findRole = await roleService.getSingleRole(id);
        if (!findRole) {
            return next(new ErrorHandler("Role is not Found", 404));
        }
        await roleService.deleteRole(id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        console.log("delete role error:", err)
        next(err);
    }
};

export const singleRole = async (req, res, next) => {
    try {
        const id = req.params.id;
        const role = await roleService.getSingleRole(id);
        if (!role) {
            return next(new ErrorHandler("Role is not Found", 404));
        }
        res.status(200).json({ success: true, data: role, message: "Role find Successfully" });
    } catch (err) {
        console.log("single role error:", err)
        next(err);
    }
};
