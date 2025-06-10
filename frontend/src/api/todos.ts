import { Todo } from "../types/todos";

const API_BASE =
  "http://k8s-backend-service.k8s-todo-app.svc.cluster.local:4020/api/todos";

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(API_BASE);
  return await res.json();
};

export const addTodo = async (text: string): Promise<Todo> => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return await res.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
};
