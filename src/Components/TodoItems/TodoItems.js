import React, { useState } from "react";
import { motion } from "framer-motion";
import "./TodoItems.css";
import { useSelector, useDispatch } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { BsCheck2All } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { deleteTodo, updateTodo, completeTodo } from "../../Redux/TodoSlice";
export default function TodoItems() {
  const todoLists = useSelector((state) => state.todoLists.todoItems);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState();
  const [filter, setFilter] = useState("all");

  const filteredList = todoLists.filter((todoList) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !todoList.completed;
    } else if (filter === "complete") {
      return todoList.completed;
    }
    return false;
  });

  return (
    <div>
      <div className="d-flex flex-row justify-content-center">
        <motion.button
          className="filter-btn"
          onClick={() => setFilter("all")}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          All
        </motion.button>
        <motion.button
          className="filter-btn mg"
          onClick={() => setFilter("active")}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          Active
        </motion.button>
        <motion.button
          className="filter-btn"
          onClick={() => setFilter("complete")}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          Complete
        </motion.button>
      </div>
      <div>
        {filteredList.length > 0 &&
          filteredList.map((todoList) => (
            <motion.div
              initial={{
                x: "100vw",
                transition: { type: "spring", duration: 2 },
              }}
              animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
              whileHover={{
                scale: 0.9,
                transition: { type: "spring", duration: 0.1 },
              }}
              className=" card"
            >
              <h3 style={{ fontSize: "1.2rem" }}>{todoList.task}</h3>
              <div className="todo-icons" key={todoList.id}>
                <motion.button
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setIsEdit(true);
                    setId(todoList.id);
                  }}
                  style={{ all: "unset" }}
                >
                  <AiFillEdit style={{ color: " rgb(150, 109, 109) " }} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    dispatch(completeTodo({ id: todoList.id }));
                  }}
                  style={{ all: "unset" }}
                >
                  <BsCheck2All style={{ color: "green", margin: "0 8" }} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(deleteTodo({ id: todoList.id }))}
                  style={{ all: "unset" }}
                >
                  <MdDelete style={{ color: "red" }} />
                </motion.button>
              </div>
              {isEdit && id == todoList.id && (
                <>
                  <input
                    className="input-update"
                    type="text"
                    placeholder="Updated Task"
                    onChange={(e) => setUpdatedTask(e.target.value)}
                  />
                  <button
                    className="button-update"
                    onClick={() => {
                      dispatch(
                        updateTodo({ id: todoList.id, task: updatedTask })
                      );
                      setIsEdit(false);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}

              {todoList.completed && <span className="completed">Done</span>}
            </motion.div>
          ))}
      </div>
    </div>
  );
}
