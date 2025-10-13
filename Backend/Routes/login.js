const express = require("express");
const dbQuery = require("../database/dbhelper");
const Router  = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {SECRET} = require("../constants.js");



Router.post("/",async function(request,response){
    try {
        console.log("request.originalUrl = ",request.originalUrl);
        console.log("request.method = ",request.method);
        console.log("request.body = ",request.body);
        const {username , password} = request.body;
        if(username && password){
            let query = "select * from users where username = ?";
            let params = [username];
            let outputFromDB = await dbQuery(query,params);
            console.log("Checking if user Exist or not = ",outputFromDB);

            if(outputFromDB.length !== 0){
                if(bcrypt.compareSync(password,outputFromDB[0].password)){
                    response.send({
                        message: "Login successfull",
                        body : {userId : outputFromDB[0].userId , username : outputFromDB[0].username },
                        token : jwt.sign({userId : outputFromDB[0].userId, username : outputFromDB[0].username,},SECRET)
                    });
                } else {
                    throw "Incorrect Password";
                }
            } else {
                throw "username doesnt Exist in Database";
            }

        } else{
            throw "Enter every field properly Backend"
        }



    } catch (error) {
        console.log("loginPage error(POST) = ",error);
        response.status(500).send(error);
    }
})

module.exports = Router;