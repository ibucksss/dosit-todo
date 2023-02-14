import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import EdiText from "react-editext";
import styled from "styled-components";

function App() {
  const [todo, setTodo] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  //Add Task Function
  const addTask = () => {
    if (newTask) {
      let num = todo.length + 1;
      let newEntry = {
        id: num,
        title: newTask,
        status: false,
      };

      setTodo([...todo, newEntry]);
      setNewTask("");
    }
  };
  //Delete Task Funtion
  const deleteTask = (id) => {
    let newTaskList = todo.filter((task) => task.id !== id);
    setTodo(newTaskList);
  };
  //Mark Task
  const markTask = (id) => {
    let newTask = todo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTodo(newTask);
  };

  const updateTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  const StyledEdiText = styled(EdiText)`
    button {
      background: transparent;
      border-radius: 5px;
      border: none;
      font-size: 2vh;
    }

    button[editext="edit-button"] {
      color: #4b88a2;
      font-size: 2vh;
      background: transparent;
      &:hover {
        color: #b1a9a9;
      }
    }

    button[editext="save-button"] {
      font-size: 2vh;
      &:hover {
        background: greenyellow;
      }
    }

    button[editext="cancel-button"] {
      font-size: 2vh;
      &:hover {
        background: crimson;

        color: #fff;
      }
    }

    input,
    textarea {
      background: transparent;

      color: #b1a9a9;

      font-weight: bold;

      border-radius: 5px;
    }

    div[editext="view-container"],
    div[editext="edit-container"] {
      background: transparent;
      width: 40vw;
      padding: 15px;

      border-radius: 5px;

      color: #fff;
    }
  `;
  return (
    <div className="container App">
      <div></div>
      <br></br>
      <h2 className="title">Doist</h2>
      <br></br>
      <div className="input">
        <h4 className="input-title">Add a New Task</h4>
        <input
          type="text"
          className="textbox"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="submit-btn" onClick={addTask}>
          Add
        </button>
      </div>

      {/* {Display Todo Here} */}
      {todo && todo.length ? " " : "Add Tasks..."}
      {todo &&
        todo.map((task, index) => {
          return (
            <div
              key={task.id}
              className={task.status ? "task-container done" : "task-container"}
            >
              {task.status ? (
                <span className="task">{task.title}</span>
              ) : (
                <span>
                  <StyledEdiText
                    style={{
                      textAlign: "left",
                      fontSize: "3vh",
                      padding: "15px",
                      width: "45vw",
                      backgroundColor: "transparent",
                      color: "#B1A9A9",
                      outline: "none",
                      border: "none",
                    }}
                    type="text"
                    value={task.title}
                    onChange={updateTask}
                  ></StyledEdiText>
                </span>
              )}
              <div className="icons-wrapper">
                <span>
                  <FontAwesomeIcon
                    onClick={() => markTask(task.id)}
                    className="check-btn"
                    icon={faCircleCheck}
                  />
                </span>

                <span className="delete-btn">
                  <FontAwesomeIcon
                    onClick={() => deleteTask(task.id)}
                    icon={faTrashCan}
                  />
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
