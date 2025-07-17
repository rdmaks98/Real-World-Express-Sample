import express from "express";
import {
    createRole,
    getRoles,
    updateRole,
    deleteRole,
    singleRole,
} from "../controllers/role.controller.js";
import { authentication } from "../middleware/authentication.middleware.js";

const roleRoute = express.Router();

roleRoute.post("/", createRole);
roleRoute.get("/", getRoles);
roleRoute.put("/:id", authentication, updateRole);
roleRoute.get("/:id", authentication, singleRole);
roleRoute.delete("/:id", authentication, deleteRole);

export default roleRoute;
