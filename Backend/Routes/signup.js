const express = require("express");
const Router = express.Router();
const dbQuery = require("../database/dbhelper.js")
const bcrypt = require("bcrypt")
const {SALTROUND,SECRET} = require("../constants.js");


Router.post("/",async function(request,response){
    try {
        console.log("request.originalUrl = ",request.originalUrl);
        console.log("request.method = ",request.method);
        console.log("request.body = ",request.body);
        const {firstname,age,gender,username,email,password} = request.body;

         if(firstname && age && gender && username && email && password){
            let query = "select * from users where username = ?";
            let params = [username];
            let outputFromDB = await dbQuery(query,params);
            console.log("Checking if user Exist or not = ",outputFromDB);
            if(outputFromDB.length === 0){
                query = "insert into users(firstname,age,gender,username,email,password,provider) values(?,?,?,?,?,?,?)";
                params = [firstname,age,gender,username,email,bcrypt.hashSync(password,SALTROUND),"local"];
                await dbQuery(query,params);
                response.send({
                    message : "User Added into database successfully",
                })
            } else{
                throw "User Already exist try another Username";
            }
         } else{
            throw "Enter every field properly"
        }
    } catch (error) {
        console.log("SignupPage error(Post) = ",error);
        response.status(500).send(error);
    }
})

module.exports = Router;
