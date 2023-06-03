import { useState } from "react";
import "./App.css";
import Component from "./components";
import TODO from "./components/todo_db";
import { UserContext } from "./UserContext";

const App = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [tasks, setTasks] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  return (
    <UserContext.Provider value={{ user, setUser, tasks, setTasks }}>
      {/* <div class="bg-gray-200 min-h-screen flex items-center justify-center">
        <div class="w-full max-w-sm">
          <h1 class="text-3xl font-medium mb-2 text-center">Welcome</h1>
          <div class="bg-white rounded-lg p-6">
            <button class="bg-blue-500 text-white rounded-lg py-2 px-4 mr-2">
              Login
            </button>
            <button class="bg-blue-600 text-white rounded-lg py-2 px-4">
              Signup
            </button>
          </div>
        </div>
      </div> */}
      <Component />
      {/* <TODO /> */}
    </UserContext.Provider>
  );
};

export default App;
