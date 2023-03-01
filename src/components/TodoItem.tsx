"use client";
import React from "react";
import type { Todo } from "types";
import { api } from "~/utils/api";

type TodoProps = {
  todo: Todo;
  refetchTodos: () => Promise<void>;
};

const TodoItem = ({ todo, refetchTodos }: TodoProps) => {
  const { id, status, text } = todo;

  const mutation = api.todo.toggleStatus.useMutation({
    onSuccess: () => {
      void refetchTodos();
    },
  });

  const handleToggleStatus = (id: string) => {
    mutation.mutate(id);
  };

  const statusString = status ? "Done" : "Not Done";

  return (
    <div className="text-white">
      <p>{text}</p>
      <button
        className="bg-black p-5 text-white"
        onClick={() => void handleToggleStatus(id)}
      >
        {statusString}
      </button>
    </div>
  );
};

export default TodoItem;
