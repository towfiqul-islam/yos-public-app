import React from 'react';
import {Link} from 'react-router-dom';
import history from '../../history';
import Footer from '../Footer';

const Login = () => {
  return (
    <>
      <Link
        className='bg-gray-200 px-4 py-1 rounded m-4  text-sm inline-block'
        to='/'
      >
        Back to Home
      </Link>

      <div
        style={{height: '500px'}}
        className='flex justify-center items-center '
      >
        <div>
          <h2 className='text-xl mb-4 text-gray-600 text-center'>
            Sign in to{' '}
            <span className='font-semibold text-gray-900'>YOS Health</span>
          </h2>
          <div className='bg-gray-200  px-6 py-8 rounded'>
            <div style={{width: '250px'}}>
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
            <div style={{width: '250px'}} className='mt-3'>
              <div className='flex justify-between'>
                {' '}
                <label
                  className='block mb-2 text-sm sm:text-base'
                  htmlFor='email'
                >
                  Password
                </label>
                <Link className='text-xs text-blue-600 font-semibold' to='/'>
                  Forgot password?
                </Link>
              </div>
              <input
                className='px-2 py-1 border border-gray-500 w-full rounded block'
                type='password'
              />
            </div>
            <div className='mt-6'>
              <button
                onClick={() => history.push('/user')}
                className='bg-gray-900 text-gray-100 px-8 py-1 rounded block w-full'
              >
                Login
              </button>
            </div>
          </div>
          <div className='flex justify-center border border-gray-400 rounded mt-4 py-4'>
            <p>New to Yos Health?</p>{' '}
            <Link className='text-blue-600 font-semibold ml-2' to='/sign-up'>
              {' '}
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
