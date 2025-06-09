import React from "react";
import { Todo } from "../types/todos";

interface Props {
  todos: Todo[];
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<Props> = ({ todos, onDelete }) => (
  <ul>
    {todos.map((todo) => (
      <li key={todo.id}>
        {todo.text} <button onClick={() => onDelete(todo.id)}>削除</button>
      </li>
    ))}
  </ul>
);
