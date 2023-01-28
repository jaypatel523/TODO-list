import React, { useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([{ id: 1, content: "default-task" }]);
  const [name, setName] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [idx, setIdx] = useState(null);

  const deleteTask = (id) => {
    if (id === 1) {
      alert("you can not delete default task");
      return;
    }
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
  };

  const editTask = (index) => {
    setName(tasks[index].content);
    setIdx(index);
    setToggleButton(true);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (name.length > 0) {
      if (toggleButton) {
        tasks[idx].content = name;
      } else {
        tasks.push({ id: new Date().getTime().toString(), content: name });
      }
      setToggleButton(false);
      setIdx(null);
      document.getElementById("task").value = "";
      setName("");
    }
    setToggleButton(false);
  };

  return (
    <>
      <h1 className="text-3xl mb-16"> To-Do List </h1>
      <section className="">
        <form className="p-10">
          <input
            type="text"
            id="task"
            placeholder="add task"
            className="border border-blue-500 h-10 p-2 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
            onClick={addTask}
          >
            {toggleButton ? "Edit Task" : "Add Task"}
          </button>
        </form>

        <div className="">
          {tasks.map((task, index) => {
            return (
              <section key={index} className="m-4">
                <div className="flex justify-center">
                  {/* <div className="p-5 flex justify-center border border-black"> */}
                  <p className="p-2 h-10 w-60 border border-blue-500 text-left">
                    {" "}
                    {task.content}
                  </p>
                  <div className="">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
                      onClick={() => {
                        editTask(index);
                      }}
                    >
                      {" "}
                      Edit{" "}
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                      onClick={() => {
                        deleteTask(task.id);
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
    </>
  );
};

export default Home;
