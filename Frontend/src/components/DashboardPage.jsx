import { useEffect, useState } from "react";
import axios from "axios";
import { TaskInput } from "./taskInput";
import { TaskCard } from "./taskCard";
import { EmptyTaskList } from "./EmptyTaskList.jsx";
import { useNavigate } from "react-router";

export function DashboardPage() {
  const navigate = useNavigate();
  const [Dashboard, setDashboard] = useState({
    taskList: [],
    Isloading: true,
  });

  console.log("Dashboard = ", Dashboard);

  let token = localStorage.getItem("token");
  console.log("Dashboard token = ", token);
  console.log("process.env.API_NAME = ", process.env);
  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.REACT_APP_API_NAME}/gettask`, {
          headers: {
            Authorization: localStorage.getItem("token"),
            "ngrok-skip-browser-warning": "true",
          },
        })
        .then((response) => {
          console.log("response = ", response);
          setDashboard((prevState) => {
            return {
              ...prevState,
              Isloading: false,
              taskList: response.data,
            };
          });
        })
        .catch((error) => {
          console.log("error = ", error);
        });
    } else {
      navigate("/herosection");
    }
  }, []);

  function handleDeletingTask(taskId) {
    console.log("taskId = ", taskId);
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_NAME}/deleteTask?taskId=${taskId}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then(function (response) {
        console.log("delete response = ", response);
        alert(response.data);
        axios
          .get(`${process.env.REACT_APP_API_NAME}/getTask`, {
            headers: {
              Authorization: localStorage.getItem("token"),
              "ngrok-skip-browser-warning": "true",
            },
          })
          .then((response) => {
            console.log("response = ", response);
            setDashboard((prevState) => {
              return {
                ...prevState,
                taskList: response.data,
              };
            });
          })
          .catch((error) => {
            console.log("error = ", error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleAddingATaskIntoDB(title, description) {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_NAME}/addTask`,
      data: { title, description },
      headers: {
        Authorization: localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then(function (response) {
        console.log("response = ", response);
        alert(response.data);
        axios
          .get(`${process.env.REACT_APP_API_NAME}/getTask`, {
            headers: {
              Authorization: localStorage.getItem("token"),
              "ngrok-skip-browser-warning": "true",
            },
          })
          .then((response) => {
            console.log(
              "Fetching justAfter AddingTask response.data = ",
              response.data
            );
            setDashboard((prevState) => {
              return {
                ...prevState,
                taskList: response.data,
              };
            });
          })
          .catch((error) => {
            console.log("error = ", error);
          });
      })
      .catch(function (error) {
        console.log("error = ", error);
      });
  }

  function handleUpdatingTask(taskId, updatedTitle, updatedDescription) {
    console.log(taskId, updatedTitle, updatedDescription);
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API_NAME}/updateTask`,
      data: {
        taskId,
        updatedTitle,
        updatedDescription,
      },
      headers: {
        authorization: localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then(function (response) {
        console.log("updatedTask response = ", response);
        alert(response.data);
        axios
          .get(`${process.env.REACT_APP_API_NAME}/getTask`, {
            headers: {
              Authorization: localStorage.getItem("token"),
              "ngrok-skip-browser-warning": "true",
            },
          })
          .then((response) => {
            console.log(
              "Fetching justAfter UpdatingTask response.data = ",
              response.data
            );
            setDashboard((prevState) => {
              return {
                ...prevState,
                taskList: response.data,
              };
            });
          })
          .catch((error) => {
            console.log("error = ", error);
          });
      })
      .catch(function (error) {
        console.log("updatedTask error = ", error);
      });
  }

  return (
    <>
      <TaskInput addingATaskIntoDB={handleAddingATaskIntoDB}></TaskInput>

      {Dashboard.Isloading ? (
        <>
          <h1 className="text-3xl font-semibold text-center mt-6 text-gray-800 tracking-wide">
            🗂️ Fetching all tasks of current logged-in user
          </h1>
        </>
      ) : (
        <>
          {Dashboard.taskList.length === 0 && <EmptyTaskList></EmptyTaskList>}
          {Dashboard.taskList.map((item) => {
            return (
              <TaskCard
                key={item.taskId}
                {...item}
                deleteTask={handleDeletingTask}
                updatingTask={handleUpdatingTask}
              ></TaskCard>
            );
          })}
        </>
      )}
    </>
  );
}
