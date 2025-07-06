require('dotenv').config();
JWT_SECRET='MehranKhan'
module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  mongoURI: process.env.MONGO_URI
};