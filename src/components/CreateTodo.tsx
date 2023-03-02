"use client";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { motion } from "framer-motion";

const CreateTodo = () => {
  const [text, setText] = useState("");

  const queryClient = useQueryClient();

  const createTodoMutation = api.todo.createTodo.useMutation({
    onSuccess: () => {
      setText("");
      void queryClient.invalidateQueries();
    },
  });

  const handleTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodoMutation.mutate(text);
  };

  console.log(text);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <form onSubmit={handleTodo}>
        <label>Todo</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="border-2 border-black"
        />
        <button type="submit">Submit</button>
      </form>
    </motion.div>
  );
};

export default CreateTodo;
