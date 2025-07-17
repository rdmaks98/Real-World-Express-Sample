import * as roleService from '../services/role.service.js';
import * as userService from '../services/user.service.js';
import ErrorHandler from "../utils/error.handler.js";

// 1. list users via search username
// 2. add accemodule value (profile)
// 3. remove accessmodule value (blogs)
// 4. check moduel access using value (dashboard)
// 5. update all users with same data
// 6. update many users using many fields and id

export const listUsers = async (req, res, next) => {
    try {
        const search = req.query.username || "";
        const users = await userService.getUsersWithRole(search);
        res.json({ success: true, data: users });
    } catch (err) {
        next(err);
    }
};

export const addAccessModule = async (req, res, next) => {
    try {
        const { roleId } = req.params;
        const { modules } = req.body;

        if (!Array.isArray(modules)) {
            return next(new ErrorHandler("Modules must be an array", 400));
        }

        const role = await roleService.getSingleRole(roleId);
        if (!role) {
            return next(new ErrorHandler("Role is not Found", 404));
        }

        const updatedRole = await roleService.updateRole(
            roleId,
            { $addToSet: { accessmodules: { $each: modules } } },
        );

        if (!updatedRole) return next(new ErrorHandler("Role not found", 404));

        res.status(200).json({
            success: true,
            message: "Modules added successfully",
            data: updatedRole,
        });
    } catch (error) {
        next(error);
    }
};

export const removeAccessModule = async (req, res, next) => {
    try {
        const { roleId } = req.params;
        const { module } = req.body;

        if (!module) {
            return next(new ErrorHandler("Module is required", 400));
        }

        const role = await roleService.getSingleRole(roleId);
        if (!role) {
            return next(new ErrorHandler("Role is not Found", 404));
        }

        if (!role.accessmodules.includes(module)) {
            return next(new ErrorHandler("Module value not in the acessmodule array", 404));
        }
        const updatedRole = await roleService.updateRole(
            roleId,
            { $pull: { accessmodules: module } },
        );

        if (!updatedRole) return next(new ErrorHandler("Role not found", 404));

        res.status(200).json({
            success: true,
            message: "Module removed successfully",
            data: updatedRole,
        });
    } catch (error) {
        next(error);
    }
};

export const checkModuleAccess = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const { moduleName } = req.params;
        const user = await userService.findUserById(userId);
        const userAccess = user?.role?.accessmodules?.includes(moduleName);
        const moduleList = user?.role?.accessmodules
        if (!userAccess) {
            return next(new ErrorHandler("You haven't access this modules", 404));
        }
        res.status(200).json({
            success: true,
            message: "Module list get successfully",
            data: moduleList,
        });
    } catch (error) {
        console.log("check user access module list", error)
        next(error);
    }
};

export const updateAllUsersSameData = async (req, res, next) => {
    try {
        const modifiedCount = await userService.updateAllUsersSameDataService(req.body);

        // Step 2: Get last 5 users (recently created)
        const last5Users = await userService.listUsers()
        res.status(200).json({
            message: "All users updated",
            data: {
                updateUserCount: modifiedCount,
                lastFiveUsers: last5Users
            }
        });
    } catch (error) {
        next(error);
    }
};

export const updateMultipleUsersDifferentData = async (req, res, next) => {
    try {
        const result = await userService.updateMultipleUsersDifferentfields(req.body);
        res.status(200).json({ message: "Bulk update Multi Users", result });
    } catch (error) {
        next(error);
    }
};
