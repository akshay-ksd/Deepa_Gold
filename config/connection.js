const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();

const connectDatabase = async () => {
    try {
    //   mongoose.set("useNewUrlParser", true);
      
      await mongoose.connect(process.env.DATABASE_URL);
  
      console.log("connected to database");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
};

module.exports = connectDatabase;
  