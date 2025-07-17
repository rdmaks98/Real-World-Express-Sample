import express from "express";
import {
    createRole,
    getRoles,
    updateRole,
    deleteRole,
    singleRole,
    addAccessModule,
    removeAccessModule
} from "../controllers/role.controller.js";

const roleRoute = express.Router();

roleRoute.post("/", createRole);
roleRoute.get("/", getRoles);
roleRoute.put("/:id", updateRole);
roleRoute.get("/:id", singleRole);
roleRoute.patch("/add-access/:id", addAccessModule);
roleRoute.patch("/remove-access/:id", removeAccessModule);
roleRoute.delete("/:id", deleteRole);

export default roleRoute;
