import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Button from "../../components/Button";
import Input from "../../components/Input";

const ToDoList = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const changeText = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task.trim() === "") {
      alert("Enter any task");
    } else {
      const taskObj = {
        userId: 1,
        title: task,
        completed: false,
      };

      axios
        .post("https://jsonplaceholder.typicode.com/todos", taskObj)
        .then((res) => {
  const newTask = {
    ...res.data,
    id: Date.now(), // generate a unique id
  };
  setTaskList([...taskList, newTask]);
  setTask("");
})

        .catch((err) => console.log(err));
    }
  };

  const deleteTask = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        setTaskList((prev) => prev.filter((task) => task.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleReplace = (id) => {
    const replacedTask = {
      userId: 1,
      title: "Replaced Task Title",
      completed: true,
    };

    axios
      .put(`https://jsonplaceholder.typicode.com/todos/${id}`, replacedTask)
      .then((res) => {
        setTaskList((prev) =>
          prev.map((task) => (task.id === id ? res.data : task))
        );
      })
      .catch((err) => console.log(err));
  };

  const handlePatch = (id) => {
    const updateStatus = {
        completed: true,
              title: "Completion status updated",
      }
    axios
      .patch(`https://jsonplaceholder.typicode.com/todos/${id}`, updateStatus)
      .then((res) => {
        setTaskList((prev) =>
          prev.map((task) => (task.id === id ? res.data : task))
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => {
        setTaskList([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-start gap-2 mb-10">
        <div className="w-full">
          <Input
            type="text"
            value={task}
            placeholder="Enter task"
            onChange={changeText}
          />
        </div>
        <Button onClick={addTask} disabled={task.trim() === ""}>
          Add
        </Button>
      </div>

      {taskList.length === 0 ? (
        <div>Task Loading...</div>
      ) : (
        taskList.map((t) => {
          return (
            <div
              key={t.id}
              className="flex items-center justify-between border border-black mt-3"
            >
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id={`id-${t.id}`}
                  className="ml-2 cursor-pointer"
                />
                <label htmlFor={`id-${t.id}`} className="cursor-pointer">
                  {t.title}
                </label>
              </div>
              <div className="flex gap-2 mt-2 mr-2">
                <button
                  className="px-1 text-black cursor-pointer"
                  onClick={() => deleteTask(t.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>

                <Button onClick={() => handleReplace(t.id)}>Replace</Button>
                <Button onClick={() => handlePatch(t.id)}>Patch</Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ToDoList;