const express = require("express");
const Router = express.Router();
const {AuthMiddleware} = require("../middleware.js");
const dbQuery = require("../database/dbhelper.js");


Router.post("/", AuthMiddleware ,async function(request,response){
    try {
        console.log("request.originalUrl = ",request.originalUrl);
        console.log("request.method = ",request.method);
        console.log("request.body = ",request.body);
        const {title , description} = request.body;
        const {currentLoggedInuserId,currentLoggedInusername} = request;
        let query = "insert into tasks(title,description,createdAt,createdBy) values(?,?,?,?)";
        let params = [title,description,new Date().toISOString().slice(0, 19).replace("T", " "),currentLoggedInuserId];
        await dbQuery(query,params);

        setTimeout( ()=>{
            response.send("Task added into database");
        },3000)

    } catch (error) {
        console.log("addTask error(POST) = ",error);
        response.status(500).send(error);
    }
})



module.exports = Router;