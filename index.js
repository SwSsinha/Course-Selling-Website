require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const { courseRouter } = require("./routes/course");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
}

main();
