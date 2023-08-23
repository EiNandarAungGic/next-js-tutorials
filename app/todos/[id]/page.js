"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getTodoById = async (id) => {
  const res = await axios.get(`http://localhost:4000/todos/${id}`);
  return res.data;
};

const TodoById = () => {
  const { id } = useParams();

  const {
    data: todo,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["get", "todos", id],
    queryFn: () => getTodoById(id),
    enabled: !!id,
  });

  return (
    <div>
      {isLoading && "Loading..."}
      {isError && "Error"}
      {isSuccess && (
        <div>
          <li>
            {todo.id} - {todo.taskName}
          </li>
        </div>
      )}
    </div>
  );
};

export default TodoById;
