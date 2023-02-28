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
          text: input,
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
    return todos.map(({ id, text, status, createdAt, updatedAt, userId }) => ({
      id,
      text,
      status,
      createdAt,
      updatedAt,
      userId,
    }));
  }),
  toggleStatus: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const id = input;
      const todo = await ctx.prisma.todo.findUnique({ where: { id } });
      if (!todo) {
        throw new Error("Todo not found");
      }
      const updatedTodo = await ctx.prisma.todo.update({
        where: { id },
        data: { status: !todo.status },
      });
      return updatedTodo;
    }),
});
