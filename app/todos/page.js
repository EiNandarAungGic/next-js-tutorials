"use client";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

const Home = () => {
  const queryClient = useQueryClient();
  const getAllTodos = async () => {
    try {
      const res = await axios.get("http://localhost:4000/todos");
      return res.data;
    } catch (error) {
      return Promise.reject(new Error("Error"));
    }
  };

  const {
    data: todos,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["get", "todos"],
    queryFn: getAllTodos,
  });

  const createNewTodo = async ({ taskName, isFinished }) => {
    try {
      const res = await axios.post("http://localhost:4000/todos", {
        taskName,
        isFinished,
      });
      return res.data;
    } catch (error) {
      return Promise.reject(new Error("Error"));
    }
  };

  const { mutate } = useMutation({
    mutationKey: ["post", "todos"],
    mutationFn: createNewTodo,
  });

  const [taskValue, setTaskValue] = useState("");
  console.log("task value", taskValue);

  const onCreateNewTodo = () => {
    mutate(
      { taskName: taskValue, isFinished: false },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["get", "todos"],
          });
        },
      }
    );
  };

  return (
    <div className="mx-14 mt-4">
      <input
        type="text"
        className="mb-4"
        onChange={(e) => setTaskValue(e.target.value)}
      />
      <button
        className="bg-teal-300 h-11 px-3"
        onClick={() => onCreateNewTodo()}
      >
        Add New Todo
      </button>
      {isLoading && "loading..."}
      {isError && "Please try again!"}
      {isSuccess &&
        todos.map((todo) => {
          return (
            <li key={todo.id}>
              <Link href={`todos/${todo.id}`}>
                {todo.id} - {todo.taskName}
              </Link>
            </li>
          );
        })}
    </div>
  );
};

export default Home;
