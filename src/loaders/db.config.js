import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const connectDB = {
    async init() {
        mongoose
            .connect(process.env.DB_URL)
            .then(() => {
                console.log('Database Connected Successfully');
                console.log('\n\n');
            })
            .catch((err) => {
                console.error('Database Error', err);
            });
    },
};

export default connectDB;
