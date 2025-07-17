import dotenv from "dotenv";
dotenv.config()
import app from "./loaders/app.js";
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})