import React, { useState } from "react";
import { motion } from "framer-motion";
import { BsCardChecklist, BsPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { ADD_TO_LIST, REMOVE_FROM_LIST } from "@/context/actions/actions";

const AddTodo = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(ADD_TO_LIST({ item: value }));
    setValue("");
  };
  
  return (
    <div className="text-light w-full flex items-center justify-center px-8 py-4 rounded-lg bg-zinc-800 gap-4">
      <BsCardChecklist className="text-2xl text-[#555]" />
      {/* <input
        type="text"
        placeholder="Add a new task"
        className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-light"
      /> */}
      <input
        type="text"
        className="flex-1 h-12 bg-transparent px-2 placeholder: text-xl font-semibold text-[#777] outline-none border-none placeholder:text-emerald-400"
        placeholder="Add a new task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="p-2 rounded-md border border-emerald-400 cursor-pointer group-hover:emrald-400"
      >
        <BsPlus
          className="text-2xl text-emerald-400 group-hover:text-white "
        />
      </motion.div>
    </div>
  );
};

export default AddTodo;
