const express = require("express");
const { AuthMiddleware } = require("../middleware.js");
const Router = express.Router();
const dbQuery = require("../database/dbhelper.js");


Router.get("/", AuthMiddleware ,async function(request,response){
    try {
        console.log("request.originalUrl = ",request.originalUrl);
        console.log("request.method = ",request.method);
        console.log("request.body = ",request.body);
                
        const {currentLoggedInuserId , currentLoggedInusername} = request;
        let query = "select * from tasks where createdBy = ?";
        let params = [currentLoggedInuserId];
        let outputFromDB = await dbQuery(query,params);
        console.log(`${currentLoggedInusername} , userId-${currentLoggedInuserId} Tasks = `,outputFromDB);

        setTimeout( ()=>{
            response.send(outputFromDB);
        },3000)
        
    } catch (error) {
        console.log("getTask error = ",error);
        response.status(500).send(error);
    }
})



module.exports = Router;