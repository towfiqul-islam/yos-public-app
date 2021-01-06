import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Footer from '../Footer';
import axios from 'axios';
import history from '../../history';

const SignUp = () => {
  const [alert, setAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const {first_name, last_name, email, password, confirm_password} = user;

  const onChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
  };
  const onSubmit = async () => {
    if (password !== confirm_password) {
      setErrorMsg('Passwords do not match');
      setAlert(true);
    }
    const data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    };
    const res = await axios.post('/api/users/sign-up', data);
    if (res.data.msg === 'Email already in use') {
      setErrorMsg('Email already in use');
      setAlert(true);
    } else if (
      res.data.msg ===
      'Something went wrong! Please try again few minutes later'
    ) {
      setErrorMsg('Something went wrong! Please try again few minutes later');
      setAlert(true);
    } else if (res.data.msg === 'Sign up success') {
      history.push('/login');
    }
  };
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
          {alert && (
            <div className='flex items-center justify-between px-4 py-3 rounded mb-2 bg-red-300'>
              <p className='text-sm'>{errorMsg}</p>
              <span onClick={() => setAlert(false)} className='cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='16'
                  viewBox='0 0 24 24'
                  width='16'
                >
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
                </svg>
              </span>
            </div>
          )}
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
                name='first_name'
                onChange={onChange}
                value={first_name}
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
                name='last_name'
                onChange={onChange}
                value={last_name}
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
                name='email'
                onChange={onChange}
                value={email}
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
                name='password'
                onChange={onChange}
                value={password}
              />
              <p className='text-xs text-gray-600 mt-1'>
                Minimum 8 characters including at least a number, one lowercase
                and one uppercase letter
              </p>
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
                name='confirm_password'
                onChange={onChange}
                value={confirm_password}
              />
            </div>
            <div className='mt-6'>
              <button
                onClick={onSubmit}
                className='bg-gray-900 text-gray-100 px-8 py-1 rounded block w-full'
              >
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
