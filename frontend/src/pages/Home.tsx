import React, { useEffect, useState } from "react";
import { fetchTodos, addTodo, deleteTodo } from "../api/todos";
import { Todo } from "../types/todos";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";

export const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  const handleAdd = async (text: string) => {
    const newTodo = await addTodo(text);
    setTodos([newTodo, ...todos]);
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <>
      <h1>TODO アプリ</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} />
    </>
  );
};
