require('dotenv').config();
module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  mongoURI: process.env.MONGO_URI,
  PORT:process.env.PORT || 3000
};