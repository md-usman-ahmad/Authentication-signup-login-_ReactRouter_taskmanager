const express = require("express");
const Router = express.Router();
const {AuthMiddleware} = require("../middleware.js");
const dbQuery = require("../database/dbhelper.js");

Router.patch("/", AuthMiddleware  ,async function(request,response){
    try {
        console.log("request.originalUrl = ",request.originalUrl)
        console.log("request.method = ",request.method)
        console.log("request.body = ",request.body)

        const {taskId , updatedTitle , updatedDescription } = request.body;
        const { currentLoggedInuserId , currentLoggedInusername } = request;


                                                //Method - 1 Long way
        // let query = "select * from tasks where taskId = ?";
        // let params = [taskId]
        // let updatingTaskDetails = await dbQuery(query,params);
        // if(currentLoggedInuserId === updatingTaskDetails[0].createdBy){
        //     query = `update tasks
        //             set title = ? , description = ? , updatedAt = ?
        //             where taskId = ?
        //             `
        //     params = [updatedTitle , updatedDescription , new Date().toISOString().slice(0, 19).replace("T", " ") , taskId];
        //     await dbQuery(query , params);
        //     response.send(`${currentLoggedInusername} (userId-${currentLoggedInuserId}) taskId-${taskId} updatedSuccessfully`);
        // } else {
        //     throw "This Task is not from your TaskList hence you cant UPDATE";
        // }

                                            //Method - 2 SHort Way
        let query = `update tasks
                     set title = ? , description = ? , updatedAt = ?
                     where taskId = ? AND createdBy = ?
                     `
        let params = [updatedTitle,updatedDescription,new Date().toISOString().slice(0, 19).replace("T", " "),taskId,currentLoggedInuserId];
        await dbQuery(query,params);
        response.send(`${currentLoggedInusername} (userId-${currentLoggedInuserId}) taskId-${taskId} updatedSuccessfully`);

    } catch (error) {
        console.log("updatedTask(PATCH) error = ",error);
        response.status(500).send(error);
    }
})

module.exports = Router;