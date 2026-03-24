import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from '../redux/slices/api/authApiSlice';
import { toast } from 'sonner';
import { setCredentials } from '../redux/slices/authSlice';
import Loading from '../components/Loader';

const Login = () => {
  const { user } = useSelector(state => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const submitHandler = async(data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className='flex flex-col w-full min-h-screen'>
      {/* Main content */}
      <div className='w-full flex-1 flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
        <div className='flex flex-col items-center justify-center w-full gap-0 md:w-auto md:gap-40 md:flex-row'>
          {/* left side */}
          <div className='flex flex-col items-center justify-center w-full h-full lg:w-2/3'>
            <div className='flex flex-col items-center justify-center w-full gap-5 md:max-w-lg 2xl:max-w-3xl md:gap-y-10 2xl:-mt-20'>
              <span className='flex gap-1 px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-full md:text-base'>
                Manage all your interns tasks at one Place!
              </span>
              <p className='flex flex-col gap-0 text-4xl font-black text-center text-orange-500 md:gap-4 md:text-6xl 2xl:text-7xl'>
                <span>Intern</span>
                <span>Manager</span>
              </p>
              <div className='cell'>
                <div className='circle rotate-in-up-left'></div>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className='flex flex-col items-center justify-center w-full p-4 md:w-1/3 md:p-1'>
            <form 
              onSubmit={handleSubmit(submitHandler)} 
              className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
              aria-label="Login Form"
            >
              <div className='text-center'>
                <p className='text-3xl font-bold text-orange-500'>Welcome Back!</p>
                <p className='text-base text-gray-700'>Keep all your credentials safe.</p>
              </div>
              <div className='flex flex-col gap-y-5'>
                <Textbox
                  placeholder="email@example.com"
                  type="email"
                  name="email"
                  label="Email Address"
                  className="w-full rounded-full"
                  register={register("email", {
                    required: "Email Address is required!",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format!"
                    }
                  })}
                  error={errors.email?.message}
                  aria-invalid={errors.email ? "true" : "false"}
                />
      
                < Textbox
                  placeholder="enter your password"
                  type="password"
                  name="password"
                  label="Password"
                  className="w-full rounded-full"
                  register={register("password", {
                    required: "Password is required!",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long!"
                    }
                  })}
                  error={errors.password?.message}
                  aria-invalid={errors.password ? "true" : "false"}
                />

                <span className='text-sm text-gray-500 cursor-pointer hover:text-orange-500 hover:underline'>
                  Forget Password?
                </span>

                {isLoading ? (
                  <Loading />
                ) : (
                  <Button
                    type='submit'
                    label='Submit'
                    className='w-full h-10 text-white bg-orange-500 rounded-full'
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='flex items-center justify-center w-full h-16 px-4 bg-gray-200'>
        <p className='text-sm text-gray-600'>Copyright 2026 Made with ❤️ by Parth Purohit.</p>
      </div>
    </div>
  );
};

export default Login;