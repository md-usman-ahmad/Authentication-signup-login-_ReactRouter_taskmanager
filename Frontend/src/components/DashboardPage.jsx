import { useEffect, useState } from "react"
import axios from "axios"
import { useRef } from "react";
import { TaskInput } from "./taskInput";
import { TaskCard } from "./taskCard";
import { EmptyTaskList } from "./EmptyTaskList.jsx"
import { useNavigate } from "react-router";

export function DashboardPage(){
    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    console.log("Dashboard token = ", token)

    useEffect( ()=>{
        if(!token){
            navigate("/herosection");
        }
    },[])


    const [taskList,setTaskList] = useState([]);
    console.log("taskList = ",taskList);
    const titleRef = useRef();
    const descriptionRef = useRef();

    // useEffect( ()=>{
    //     axios.get("http://localhost:4000/getTask",{
    //     headers: {
    //       Authorization: localStorage.getItem("token"),
    //     },
    //   })
    //     .then((response)=>{
    //         console.log("response = ",response); 
    //         setTaskList(response.data);
    //     })
    //     .catch((error)=>{
    //         // console.log("error.response.data = ",error.response.data);
    //         // alert(error.response.data);
    //     })
    // },[])

    function addingAnItemIntoDB(title,description){
        axios.post("http://localhost:4000/addTask",{
            title,description,
        },{
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        .then((response)=>{
            console.log("response = ",response); 
            setTaskList(response.data);
        })
        .catch((error)=>{
            console.log("error.response.data = ",error.response.data);
            alert(error.response.data);
        })
    }



    return (
        <>
            <TaskInput></TaskInput>
            {taskList.length === 0 && <EmptyTaskList></EmptyTaskList>}
            {taskList.length > 0 && <TaskCard></TaskCard>}
        </>
    )
}