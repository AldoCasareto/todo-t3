"use client";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { api } from "~/utils/api";

const CreateTodo = () => {
  const [text, setText] = useState("");

  const queryClient = useQueryClient();

  const mutate = api.todo.createTodo.useMutation({
    onMutate: async (text) => {
      await mutate.mutateAsync(text);

      await queryClient.invalidateQueries(["todos"]);
    },
  });

  const handleTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate.mutate(text);
  };

  console.log(text);

  return (
    <div>
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
    </div>
  );
};

export default CreateTodo;
