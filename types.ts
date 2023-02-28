import { z } from "zod";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;

type todosOutput = RouterOutput["todo"]["getAll"];

export type Todo = todosOutput[number];

export const todoInput = z
  .string({
    required_error: "write your todo",
  })
  .min(1)
  .max(50);
