import React, { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import "./Todo.css";
import { FaPlus } from "react-icons/fa";
import todoAnimation from "../../animation/todoAnimation.json";
import { addTodo } from "../../Redux/TodoSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Todo() {
  const [task, setTask] = useState(" ");
  const dispatch = useDispatch();
  const todoLists = useSelector((state) => state.todoLists.todoItems);

  return (
    <div className=" d-flex flex-column">
      <ToastContainer />
      <motion.div
        initial={{ y: -150 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        <Lottie
          style={{ height: "150px", marginTop: "20px" }}
          animationData={todoAnimation}
          loop={true}
        />
      </motion.div>
      <motion.h1
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1 }}
        whileHover={{ scale: 1.1 }}
        className="todo-heading"
      >
        To Do List
      </motion.h1>
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.5 }}
        className="todo-add d-flex justify-content-center"
      >
        <input
          type="text"
          value={task}
          className="todo-input align-self-center"
          onChange={(e) => setTask(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="todo-add-btn d-flex justify-content-center align-items-center"
          onClick={() => {
            if (!task.trim()) {
              toast.error("Input is Empty", {
                position: toast.POSITION.TOP_CENTER,
              });
            } else {
              dispatch(
                addTodo({
                  id: todoLists.length + 1,
                  task,
                })
              );
              setTask("");
            }
          }}
        >
          <FaPlus />
        </motion.button>
      </motion.div>
    </div>
  );
}
