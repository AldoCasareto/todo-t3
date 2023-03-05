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
      <form
        className="flex items-center space-x-2 text-white"
        onSubmit={handleTodo}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="rounded-lg border-2 p-2 text-black"
          placeholder="type your todo..."
        />
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          type="submit"
        >
          Submit
        </button>
      </form>
    </motion.div>
  );
};

export default CreateTodo;
