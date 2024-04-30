const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/blogApp";

connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(dbUrl);
    console.log("Database Connection Established Successfully");
  } catch (error) {
    console.log("Database Connection Error : " + error);
  }
};
connectToMongo();
module.exports = connectToMongo;
