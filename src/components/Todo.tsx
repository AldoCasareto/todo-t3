"use client";
import React from "react";
import { api } from "~/utils/api";

type Todo = {
  todo: {
    id: string;
    todo: string;
    status: boolean;
  };
};

const Todo = ({ todo: { todo, id, status } }: Todo) => {
  const mutation = api.todo.toggleStatus.useMutation();

  const handleToggleStatus = (id: string) => {
    mutation.mutate(id);
  };

  const statusString = status ? "Done" : "Not Done";

  return (
    <div className="text-white">
      <p>{todo}</p>
      <button
        className="bg-black p-5 text-white"
        onClick={() => void handleToggleStatus(id)}
      >
        {statusString}
      </button>
    </div>
  );
};

export default Todo;
