import { AddTodo, TodoLists } from "@/components";
import store from "@/context/store";
import React from "react";
import { Provider } from "react-redux";

const Todo = () => {
  return (
    <DataProvider>
      <div className="w-screen h-screen flex flex-col items-center justify-center px-4 gap-6 bg-dark">
        <p className="text-3xl font-semibold text-gray-100">ToDO List 🚀</p>
        <div className="w-full md:w-1/2 rounded-lg px-6 py-8 border border-zinc-800">
          <AddTodo />
          <TodoLists />
        </div>
      </div>
    </DataProvider>
  );
};

const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Todo;
