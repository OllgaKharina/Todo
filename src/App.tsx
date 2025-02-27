import { useState } from "react";
import "./App.css";
import { Todo } from "./Todo";
import { TodoItem } from "./types";

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = (text: string) => {
    const newTodo: TodoItem = {
      id: Date.now(),
      text,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));
  };

  const activeTodosCount = todos.filter((todo) => !todo.isCompleted).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true;
  });

  return (
    <div className="main-container">
      <h2>todos</h2>
      <div className="todo-header">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim() !== "") {
              addTodo(input);
              setInput("");
            }
          }}
          placeholder="What needs to be done?"
          className="todo-input"
        />
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))}
      </ul>

      <div className="footer">
        <span>
          {activeTodosCount} {activeTodosCount === 1 ? "item" : "items"} left
        </span>
        <div className="filters">
          <button
            className={`filter-button ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-button ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`filter-button ${
              filter === "completed" ? "active" : ""
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
        <button className="clear-button" onClick={clearCompletedTodos}>
          Clear completed
        </button>
      </div>
    </div>
  );
}

export default App;
