import { useEffect, useState } from 'react';
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import { tasks } from '../assets/data'; // Ideally, this should be fetched from an API
import BoardView from '../components/BoardView';
import Button from '../components/Button';
import Loading from '../components/Loader';
import Tabs from '../components/Tabs';
import Table from '../components/task/Table';
import TaskTitle from "../components/TaskTitle";
import Title from "../components/Title";
import AddTask from '../components/task/AddTask';

const TABS = [
  { title: "Board View", icon: <MdGridView aria-hidden="true" /> },
  { title: "List View", icon: <FaList aria-hidden="true" /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in-progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [open, setOpen] = useState(false);
  const status = params?.status || "";

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        // Simulate a delay for loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Uncomment the following line to simulate an error
        // throw new Error("Failed to fetch tasks");
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='py-10'>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className='py-10 text-center text-red-600'>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'> 
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button 
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            onClick={() => setOpen(true)}
            className="flex flex-row-reverse gap-1 items-center bg-orange-600 text-white rounded-md py-2 2xl:py-2.5"
            aria-label="Create a new task"
          />
        )}
      </div>

      <div>
        <Tabs tabs={TABS} setSelected={setSelected}>
          {!status && (
            <div className='flex justify-between w-full gap-4 py-4 md:gap-x-12'>
              <TaskTitle label="To Do" className={TASK_TYPE.todo} />
              <TaskTitle label="In Progress" className={TASK_TYPE["in-progress"]} />
              <TaskTitle label="Completed" className={TASK_TYPE.completed} />
            </div>
          )}

          {selected !== 1 ? (
            <BoardView tasks={tasks} />
          ) : (
            <div className='w-full'>
              <Table tasks={tasks} />
            </div>
          )}
        </Tabs>
      </div>
      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;