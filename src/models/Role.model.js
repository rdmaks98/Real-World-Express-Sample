import mongoose from "mongoose";
const roleSchema = new mongoose.Schema({
    rolename: { type: String, required: true, unique: true },
    accessmodules: [String],
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Role = mongoose.model("Role", roleSchema);

export default Role;
