"use client";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import type { Todo } from "types";
import { api } from "~/utils/api";
import { motion } from "framer-motion";
import { AiFillDelete } from "react-icons/ai";

type TodoProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { id, status, text } = todo;
  const [updatedText, setUpdatedText] = useState(text);

  const queryClient = useQueryClient();

  const mutationToggleStatus = api.todo.toggleStatus.useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries();
    },
  });

  const mutationEditTodo = api.todo.editTodo.useMutation({
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

  const handleUpdateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutationEditTodo.mutate({ text: updatedText, id });
    setIsEditing(false);
  };

  const statusString = status ? "Done" : "Not Done";

  return (
    <>
      {isEditing ? (
        <form className="flex" onSubmit={handleUpdateTodo}>
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button type="submit">update</button>
        </form>
      ) : (
        <div className="flex items-center space-x-2 space-y-1 text-sm text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsEditing(!isEditing)}
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
          </motion.div>

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
        </div>
      )}
    </>
  );
};

export default TodoItem;
