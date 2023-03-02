const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function (id) {
    const token = jwt.sign({_id: id},process.env.TOKEN_SECRET)
    return token;
}