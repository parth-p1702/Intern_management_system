import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { summary } from "../assets/data"; // Ideally, this should be fetched from an API
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog from "../components/Dialogs";
import AddUser  from "../components/AddUser";
import Loading from "../components/Loader";

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate data fetching
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Here, you would normally fetch data from an API
        setLoading(false);
      } catch (err) {
        setError("Failed to load users.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteHandler = () => {
    // Implement the delete logic here
  };

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-left text-black'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Title</th>
        <th className='py-2'>Email</th>
        <th className='py-2'>Role</th>
        <th className='py-2'>Active</th>
        <th className='py-2'>Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='text-gray-600 border-b border-gray-200 hover:bg-gray-400/10'>
      <td className='p-2'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center text-sm text-white bg-orange-600 rounded-full w-9 h-9'>
            <span className='text-xs text-center md:text-sm'>
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>

      <td className='p-2'>{user.title}</td>
      <td className='p-2'>{user.email || "user.email.com"}</td>
      <td className='p-2'>{user.role}</td>

      <td>
        <button
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>

      <td className='flex justify-end gap-4 p-2'>
        <Button
          className='font-semibold text-blue-600 hover:text-blue-500 sm:px-0'
          label='Edit'
          type='button'
          onClick={() => editClick(user)}
          aria-label={`Edit ${user.name}`}
        />

        <Button
          className='font-semibold text-red-700 hover:text-red-500 sm:px-0'
          label='Delete'
          type='button'
          onClick={() => deleteClick(user?._id)}
          aria-label={`Delete ${user.name}`}
        />
      </td>
    </tr>
  );

  if ( loading) {
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
    <>
      <div className='w-full px-0 mb-6 md:px-1'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='Team Members' />
          <Button
            label='Add New User'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5'
            onClick={() => setOpen(true)}
            aria-label="Add new user"
          />
        </div>

        <div className='px-2 py-4 bg-white rounded shadow-md md:px-4'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {summary.users?.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUser 
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default Users;