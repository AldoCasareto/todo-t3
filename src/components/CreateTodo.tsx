"use client";
import React, { useState } from "react";
import { api } from "~/utils/api";

const CreateTodo = () => {
  const [text, setText] = useState("");

  const mutate = api.todo.createTodo.useMutation();

  const handleTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate.mutate(text);
  };

  console.log(text);

  return (
    <div>
      <form onSubmit={handleTodo}>
        <label htmlFor="">Todo</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="border-2 border-black"
        />
      </form>
    </div>
  );
};

export default CreateTodo;
