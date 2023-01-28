import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const TODO = () => {
  const { user, setUser, tasks, setTasks } = useContext(UserContext);

  // add part
  const [name, setName] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  // edit part
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const navigateTo = useNavigate();

  const handleLogout = () => {
    // console.log(userLogin);
    axios.get("http://localhost:5001/api/v1/logout").then((res) => {
      alert(res.data.msg);
    });
    navigateTo("/login");
  };

  //  get all tasks of user after login
  useEffect(() => {
    // console.log(userLogin);
    axios.post("http://localhost:5001/api/v1/getalltodos", user).then((res) => {
      setTasks(res.data);
    });
  }, [isSubmit]);

  // creating task
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      userId: user._id,
      taskid: new Date().getTime().toString(),
      name,
    };
    // console.log(data);
    if (!editMode) {
      axios.post("http://localhost:5001/api/v1/create", data).then((res) => {
        const response = {
          taskid: res.data.msg.taskid,
          task: res.data.msg.name,
        };
        document.getElementById("task").value = "";
        setTasks([...tasks, response]);
        setIsSubmit(true);
        // console.log(response);
      });
    } else {
      currentTask.task = name;
      // console.log(currentTask);
      const taskobj = JSON.stringify(currentTask);
      axios
        .patch(`http://localhost:5001/api/v1/edit/${user._id}/${taskobj}`)
        .then((res) => {
          setEditMode(false);
          document.getElementById("task").value = "";
          setCurrentTask({});
          setIsSubmit(true);
          alert(res.data.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setIsSubmit(false);
  }, [isSubmit]);

  // edit task
  const editTask = (task) => {
    setEditMode(true);
    document.getElementById("task").value = task.task;
    setName(task.task);
    setCurrentTask(task);

    // if (isEditing) {

    // }
  };

  // delete tasks
  const deleteTask = (userId, taskId) => {
    // console.log(id);
    const newtasks = tasks.filter((task) => task.taskid !== taskId);
    setTasks(newtasks);
    // console.log(userId);s
    // console.log(taskId);
    axios
      .delete(`http://localhost:5001/api/v1/delete/${userId}/${taskId}`)
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        alert(res.data.msg);
      });
  };

  return (
    <>
      <div className="w-auto m-auto">
        {/* <div className=" flex justify-around"> */}
        <h1 className="text-3xl"> To-Do List </h1>
        <section className="">
          <form
            className="p-10"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              id="task"
              placeholder="add task"
              onChange={(e) => setName(e.target.value)}
              className="border border-blue-500 h-10 p-2 outline-none"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
              onClick={handleSubmit}
            >
              {editMode ? "Edit Task" : "Add Task"}
            </button>
          </form>

          <div className="">
            {tasks.length > 0 &&
              tasks.map((task, index) => {
                return (
                  <section key={index} className="m-4 flex justify-center">
                    <div className="flex justify-center w-[400px]">
                      {/* <div className="p-5 flex justify-center border border-black"> */}
                      <p className="p-2 h-10 w-60 border border-blue-500 text-left">
                        {" "}
                        {task.task}
                      </p>
                      <div className="">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
                          onClick={() => {
                            editTask(task);
                          }}
                        >
                          {" "}
                          Edit{" "}
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                          onClick={() => {
                            deleteTask(user._id, task.taskid);
                          }}
                        >
                          {" "}
                          Delete{" "}
                        </button>
                      </div>
                    </div>
                  </section>
                );
              })}
          </div>
        </section>
      </div>
      <button
        className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
};

export default TODO;
