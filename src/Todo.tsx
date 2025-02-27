import React from "react";
import { TodoItem as TodoItemType } from "./types";

type Props = {
  todo: TodoItemType;
  toggleTodo: (id: number) => void;
};

export const Todo: React.FC<Props> = ({ todo, toggleTodo }) => {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggleTodo(todo.id)}
        className="todo-checkbox"
      />
      <span className={todo.isCompleted ? "completed" : ""}>{todo.text}</span>
    </li>
  );
};
