import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: { type: String, unique: true },
    isdelete: {
        type: Boolean,
        default: false,
    },
    password: String,
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
