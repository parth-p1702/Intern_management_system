import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import Loading from "./Loader";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";
import { setCredentials } from "../redux/slices/authSlice";

const AddUser  = ({ open, setOpen, userData }) => {
  const defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);
  
  // const isLoading = false; // Replace with actual loading state if needed
  // const isUpdating = false; // Replace with actual updating state if needed

    const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [addNewUser, {isLoading}] = useRegisterMutation()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleOnSubmit = async(data) => {
    // Handle form submission logic here
    // console.log(data);
     try {
      if (userData) {
        const result = await updateUser(data).unwrap();
        toast.success(result?.message);
        if (userData?._id === user?._id) {
          dispatch(setCredentials({ ...result?.user }));
        }
      } else {
        const result = await addNewUser({
          ...data,
          password: data?.email,
        }).unwrap();
        toast.success("New User added successfully");
      }

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
        <Dialog.Title as='h2' className='mb-4 text-base font-bold leading-6 text-gray-900'>
          {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
        </Dialog.Title>
        <div className='flex flex-col gap-6 mt-2'>
          {[
            { name: "name", label: "Full Name", type: "text", placeholder: "Full name", requiredMessage: "Full name is required!" },
            { name: "title", label: "Title", type: "text", placeholder: "Title", requiredMessage: "Title is required!" },
            { name: "email", label: "Email Address", type: "email", placeholder: "Email Address", requiredMessage: "Email Address is required!" },
            { name: "role", label: "Role", type: "text", placeholder: "Role", requiredMessage: "User  role is required!" },
          ].map(({ name, label, type, placeholder, requiredMessage }) => (
            <Textbox
              key={name}
              placeholder={placeholder}
              type={type}
              name={name}
              label={label}
              className='w-full rounded'
              register={register(name, { required: requiredMessage })}
              error={errors[name]?.message}
            />
          ))}
        </div>

        {isLoading || isUpdating ? (
          <div className='py-5'>
            <Loading />
          </div>
        ) : (
          <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
            <Button
              type='submit'
              className='px-8 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 sm:w-auto'
              label='Submit'
            />
            <Button
              type='button'
              className='px-5 text-sm font-semibold text-gray-900 bg-white sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddUser ;