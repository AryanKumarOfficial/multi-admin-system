import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_FROM_LIST } from "@/context/actions/actions";

const TodoLists = () => {
  const todos = useSelector((state) => state.todos?.todos);
  return (
    <div className="w-full bg-zinc-800 my-4 rounded-lg px-4 py-3 flex flex-col items-center justify-center gap-2">
      <AnimatePresence>
        {todos?.length > 0 ? (
          todos
            ?.slice()
            .sort((a, b) => b.id - a.id)
            ?.map((item) => (
              <ListCard key={item.id} index={item.id} item={item.item} />
            ))
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-lg text-[#555] font-semibold"
          >
            No tasks added yet!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const ListCard = ({ index, item }) => {
  const dispatch = useDispatch();
  return (
    <motion.div
      key={index}
      className="w-full text-light bg-black rounded-lg px-4 py-3 flex items-center justify-between"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      delay={{ delay: index * 0.1, duration: 0.5 }}
    >
      <p className="text-lg text-[#555] font-semibold">{item}</p>
      <motion.div className="cursor-pointer" whileTap={{ scale: 0.9 }}>
        <MdDelete
          onClick={() => dispatch(REMOVE_FROM_LIST(index))}
          className="text-2xl text-red-500"
        />
      </motion.div>
    </motion.div>
  );
};

export default TodoLists;
