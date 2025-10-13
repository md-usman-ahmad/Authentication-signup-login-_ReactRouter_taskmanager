const jwt = require("jsonwebtoken");
const {SECRET} = require("./constants.js")

async function AuthMiddleware(request,response,next){
        try {
            const token = request.headers.authorization;
            const payload = jwt.verify(token,SECRET);
            console.log("payload = ",payload);
            request.currentLoggedInuserId = payload.userId;
            request.currentLoggedInusername = payload.username;
            next();
        } catch (error) {
            console.log("middleware error = ",error);
            next();
        }
}

module.exports = {
    AuthMiddleware
};