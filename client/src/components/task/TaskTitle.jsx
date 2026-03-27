import { IoMdAdd } from "react-icons/io";
import TaskColor from "./TaskColor";

const TaskTitle = ({ label, className }) => {
  return (
    <div className='w-full h-10 md:h-12 px-2 md:px-4 rounded bg-white flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <TaskColor className={className} />
        <p className='text-sm md:text-base text-gray-700 '>
          {label}
        </p>
      </div>

      <button onClick={onclick} className='hidden md:block'>
        <IoMdAdd className='text-lg text-black ' />
      </button>
    </div>
  );
};

export default TaskTitle;