import express from "express";
import {
    addAccessModule,
    checkModuleAccess,
    listUsers,
    removeAccessModule,
    updateAllUsersSameData,
    updateMultipleUsersDifferentData
} from "../controllers/user.controller.js";
import { authentication } from "../middleware/authentication.middleware.js";

const userRoutes = express.Router();

userRoutes.get("/list", authentication, listUsers);
userRoutes.get("/check-access/:moduleName", authentication, checkModuleAccess);
userRoutes.patch("/add-access/:roleId", authentication, addAccessModule);
userRoutes.patch("/remove-access/:roleId", authentication, removeAccessModule);
userRoutes.put("/update-all-user", authentication, updateAllUsersSameData);
userRoutes.put("/bulk-update", authentication, updateMultipleUsersDifferentData);

export default userRoutes;
