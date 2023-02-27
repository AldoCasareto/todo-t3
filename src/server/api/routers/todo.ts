import { todoInput } from "./../../../../types";
import { publicProcedure } from "./../trpc";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  createTodo: protectedProcedure
    .input(todoInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.create({
        data: {
          todo: input,
          user: {
            connect: { id: ctx.session.user.id },
          },
        },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
    });
  }),
  deleteTodo: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.todo.delete({
        where: {
          id: input,
        },
      });
    }),
  getTodo: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.todo.findUnique({
        where: {
          id: input,
        },
      });
    }),
  fetchAll: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    console.log(todos.map(({ id, todo, status }) => ({ id, todo, status })));
    return [
      { id: "fake", todo: "fake text", status: true },
      { id: "fake2", todo: "fake text2", status: false },
    ];
  }),
  toggleStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, status } = input;
      const updatedTodo = await ctx.prisma.todo.update({
        where: { id },
        data: { status: !status },
      });
      return updatedTodo;
    }),
});
