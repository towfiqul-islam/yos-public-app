import React from 'react';
import {Link} from 'react-router-dom';
import Footer from '../Footer';

const SignUp = () => {
  return (
    <>
      <Link
        className='bg-gray-200 px-4 py-1 rounded m-4  text-sm inline-block'
        to='/'
      >
        Back to Home
      </Link>

      <div
        // style={{height: '500px'}}
        className='flex justify-center items-center mt-4'
      >
        <div>
          <h2 className='text-xl mb-4 text-gray-600 text-center'>
            Sign up for{' '}
            <span className='font-semibold text-gray-900'>YOS Health</span>
          </h2>
          <div className='sm:bg-gray-200  px-6 py-8 rounded'>
            <div style={{width: '300px'}}>
              <label
                className='block mb-2 text-sm sm:text-base'
                htmlFor='first_name'
              >
                First name
              </label>
              <input
                className='px-2 py-1 border border-gray-500 w-full rounded block'
                type='text'
              />
            </div>
            <div style={{width: '300px'}} className='mt-2'>
              <label
                className='block mb-2 text-sm sm:text-base'
                htmlFor='last_name'
              >
                Last name
              </label>
              <input
                className='px-2 py-1 border border-gray-500 w-full rounded block'
                type='text'
              />
            </div>
            <div style={{width: '300px'}} className='mt-2'>
              <label
                className='block mb-2 text-sm sm:text-base'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className='px-2 py-1 border border-gray-500 w-full rounded block'
                type='email'
              />
            </div>
            <div style={{width: '300px'}} className='mt-2'>
              <label
                className='block mb-2 text-sm sm:text-base'
                htmlFor='password'
              >
                Password
              </label>

              <input
                className='px-2 py-1 border border-gray-500 w-full rounded block'
                type='password'
              />
            </div>
            <div style={{width: '300px'}} className='mt-2'>
              <label
                className='block mb-2 text-sm sm:text-base'
                htmlFor='confirm_password'
              >
                Confirm password
              </label>

              <input
                className='px-2 py-1 border border-gray-500 w-full rounded block'
                type='password'
              />
            </div>
            <div className='mt-6'>
              <button className='bg-gray-900 text-gray-100 px-8 py-1 rounded block w-full'>
                Sign up
              </button>
            </div>
          </div>
          <div className='flex justify-center sm:border mx-auto sm:border-gray-400 rounded mt-4 py-4'>
            <p>Already have an account?</p>{' '}
            <Link className='text-blue-600 font-semibold ml-2' to='/login'>
              {' '}
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
