"use client";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import type { Todo } from "types";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import { AiFillDelete } from "react-icons/ai";

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
    <motion.div
      className="flex items-center space-x-2 space-y-1 text-sm text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <motion.p
        className={`${status ? "line-through decoration-red-600" : ""}`}
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -20 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.p>
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 20 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.2 }}
      >
        <button
          className="items-center rounded-lg bg-black p-1 text-white"
          onClick={() => handleToggleStatus(id)}
        >
          {statusString}
        </button>
        <motion.button
          onClick={() => handleDelete(id)}
          className="text-red-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <AiFillDelete />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default TodoItem;
