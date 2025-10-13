import { useEffect, useState } from "react"
import axios from "axios"
import { TaskInput } from "./taskInput";
import { TaskCard } from "./taskCard";
import { EmptyTaskList } from "./EmptyTaskList.jsx"
import { useNavigate } from "react-router";

export function DashboardPage(){
    const navigate = useNavigate();
    const [Dashboard,setDashboard] = useState({
        taskList : [],
        Isloading : true
    });

    console.log("Dashboard = ",Dashboard);

    let token = localStorage.getItem("token");
    console.log("Dashboard token = ", token)
    useEffect( ()=>{
        if(token){
            axios.get("http://localhost:4000/getTask",{
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response)=>{
                console.log("response = ",response); 
                setDashboard( (prevState)=>{
                    return {
                        ...prevState,
                        Isloading : false,
                        taskList : response.data
                    }
                });
            })
            .catch((error)=>{
                console.log("error = ",error);
            })
        } else{
            navigate("/herosection");
        }    
    },[])

    function handleDeletingTask(taskId){
        console.log("taskId = ",taskId);
        axios({
            method : "DELETE",
            url : `http://localhost:4000/deleteTask?taskId=${taskId}`,
            headers : {
                Authorization : localStorage.getItem("token")
            },

        })
        .then(function(response){
            console.log("delete response = ",response);
            axios.get("http://localhost:4000/getTask",{
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response)=>{
                console.log("response = ",response); 
                setDashboard( (prevState)=>{
                    return {
                        ...prevState,
                        taskList : response.data
                    }
                });
            })
            .catch((error)=>{
                console.log("error = ",error);
            })
        })
        .catch(function(error){
            console.log(error);
        })
    }

    function handleAddingAnItemIntoDB(title,description){
        axios({
            method : "POST",
            url : "http://localhost:4000/addTask",
            data : {title,description},
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then(function(response){
            console.log("response = ",response);
            alert(response.data);
            axios.get("http://localhost:4000/getTask",{
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response)=>{
                console.log("Fetching justAfter AddingTask response.data = ",response.data); 
                setDashboard( (prevState)=>{
                    return {
                        ...prevState,
                        taskList : response.data
                    }
                });
            })
            .catch((error)=>{
                console.log("error = ",error);
            })
        })
        .catch(function(error){
            console.log("error = ",error);
        })
    }


    return (
        <>
            <TaskInput addingAnItemIntoDB={handleAddingAnItemIntoDB}></TaskInput>

            {Dashboard.Isloading ? (
                <>
                    <h1 className="text-3xl font-semibold text-center mt-6 text-gray-800 tracking-wide">
                        🗂️ Fetching all tasks of current logged-in user</h1>
                </>
            ) : (
                <>
                    {Dashboard.taskList.length === 0 && <EmptyTaskList></EmptyTaskList>}
                    {Dashboard.taskList.map( (item)=>{return  <TaskCard key={item.taskId} {...item} deleteTask={handleDeletingTask} ></TaskCard>})}
                </>
            ) }    
        </>
    )
}