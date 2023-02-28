import React from "react";
import { api } from "~/utils/api";
import Todo from "./Todo";

const Todos = () => {
  const { data: todos, isLoading, isError } = api.todo.fetchAll.useQuery();

  if (isLoading) return <div>Loading Todos </div>;
  if (isError) return <div>Error fetching</div>;

  return (
    <div>
      {todos
        ? todos?.map((todo) => <Todo key={todo.id} todo={todo} />)
        : "Create your first Todo"}
    </div>
  );
};

export default Todos;
