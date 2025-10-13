const express = require("express");
const app = express();

const constants = require("./constants.js");
const bodyParser = require("body-parser");
const cors = require("cors");


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);


const signupRouter = require("./Routes/signup.js");
const loginRouter = require("./Routes/login.js");
const getTaskRouter = require("./Routes/getTask.js");
const addTaskRouter = require("./Routes/addTask.js");
app.use("/signup",signupRouter);
app.use("/login",loginRouter);
app.use("/getTask",getTaskRouter);
app.use("/addTask",addTaskRouter);

app.listen(constants.PORT,function(){
    console.log(`server is working on PORT : ${constants.PORT}`);
})


