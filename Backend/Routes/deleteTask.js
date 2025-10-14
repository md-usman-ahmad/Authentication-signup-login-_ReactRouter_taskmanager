const express = require("express");
const Router = express.Router();
const {AuthMiddleware} =  require("../middleware.js");
const dbQuery = require("../database/dbhelper.js");

Router.delete("/", AuthMiddleware  ,async function(request,response){
    try {
        console.log("request.originalUrl = ",request.originalUrl);
        console.log("request.method = ",request.method);
        console.log("request.query = ",request.query);

        const {currentLoggedInuserId,currentLoggedInusername} = request;
        const {taskId} = request.query;
        console.log("currentLoggedInuserId = ",currentLoggedInuserId);


                    // METHOD - 1
        // let query = "select * from tasks where taskId = ?";
        // let params = [taskId];
        // let deletingTaskDetails = await dbQuery(query,params);
        // if(currentLoggedInuserId === deletingTaskDetails[0].createdBy){
        //     query = "delete from tasks where taskId = ?";
        //     params = [taskId];
        //     await dbQuery(query,params);
        //     response.send(`${currentLoggedInusername}(userId-${currentLoggedInuserId}) taskId-${taskId} deletedSuccessfully`)
        // } else {
        //     throw "This Task is not from your TaskList hence you cant delete";
        // }

                                // METHOD - 2
        let query = "delete from tasks where taskId = ? AND createdBy = ?";
        let params = [taskId,currentLoggedInuserId];
        await dbQuery(query,params);
        response.send(`${currentLoggedInusername}(userId-${currentLoggedInuserId}) taskId-${taskId} deletedSuccessfully`)

    } catch (error) {
        console.log("deleteTask error = ",error);
        response.status(500).send(error);
    }
})


module.exports = Router;