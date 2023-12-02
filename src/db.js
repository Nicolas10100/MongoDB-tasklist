require("dotenv").config();
const mongoose = require("mongoose");

const connectDB =  async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    return connection;
};

module.exports = connectDB;