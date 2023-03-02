"use client";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import type { Todo } from "types";
import { api } from "~/utils/api";

type TodoProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoProps) => {
  const { id, status, text } = todo;

  const queryClient = useQueryClient();

  const mutationToggleStatus = api.todo.toggleStatus.useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries();
    },
  });

  const mutationDelete = api.todo.deleteTodo.useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries();
    },
  });

  const handleToggleStatus = (id: string) => {
    mutationToggleStatus.mutate(id);
  };

  const handleDelete = (id: string) => {
    mutationDelete.mutate(id);
  };

  const statusString = status ? "Done" : "Not Done";

  return (
    <div className="flex items-center space-x-2 space-y-1 text-sm text-white">
      <p className={`${status ? "line-through decoration-red-600" : ""}`}>
        {text}
      </p>
      <div>
        <button
          className="items-center rounded-lg bg-black p-1 text-white"
          onClick={() => void handleToggleStatus(id)}
        >
          {statusString}
        </button>
        <button onClick={() => void handleDelete(id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
