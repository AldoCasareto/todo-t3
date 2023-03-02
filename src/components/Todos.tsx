import React from "react";
import { api } from "~/utils/api";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const Todos = () => {
  const { data: todos, isLoading, isError } = api.todo.fetchAll.useQuery();

  if (isLoading) return <div>Loading Todos </div>;
  if (isError) return <div>Error fetching</div>;

  return (
    <AnimatePresence>
      {todos
        ? todos?.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TodoItem key={todo.id} todo={todo} />
            </motion.div>
          ))
        : "Create your first Todo"}
    </AnimatePresence>
  );
};

export default Todos;
