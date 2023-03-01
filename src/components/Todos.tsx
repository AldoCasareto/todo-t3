import React from "react";
import { api } from "~/utils/api";
import TodoItem from "./TodoItem";

const Todos = () => {
  const {
    data: todos,
    isLoading,
    isError,
    refetch: refetchTodos,
  } = api.todo.fetchAll.useQuery();

  if (isLoading) return <div>Loading Todos </div>;
  if (isError) return <div>Error fetching</div>;

  return (
    <div>
      {todos
        ? todos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} refetchTodos={refetchTodos} />
          ))
        : "Create your first Todo"}
    </div>
  );
};

export default Todos;
