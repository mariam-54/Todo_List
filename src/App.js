import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Todo from "./Components/Todo/Todo";
import TodoItems from "./Components/TodoItems/TodoItems";

function App() {
  return (
    <div className="App">
      <Todo />
      <TodoItems />
    </div>
  );
}

export default App;
