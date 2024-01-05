import { createSlice } from "@reduxjs/toolkit";

export const TodoSlice = createSlice({
  name: "todoLists",
  initialState: {
    todoItems: [],
  },
  reducers: {
    addTodo: function (state, action) {
      state.todoItems.push(action.payload);
    },
    deleteTodo: function (state, action) {
      state.todoItems = state.todoItems.filter(
        (todoItem) => todoItem.id != action.payload.id
      );
    },
    updateTodo: function (state, action) {
      state.todoItems.map((todoItem) => {
        if (todoItem.id == action.payload.id) {
          todoItem.task = action.payload.task;
        }
      });
    },
    completeTodo: function (state, action) {
      state.todoItems.find((todoItem) => {
        if (todoItem.id == action.payload.id) {
          todoItem.completed = true;
        }
      });
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, completeTodo } =
  TodoSlice.actions;
export default TodoSlice.reducer;
