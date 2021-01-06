import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import history from '../../history';
import Footer from '../Footer';
import axios from 'axios';

const Login = () => {
  const [alert, setAlert] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const {email, password} = user;

  const onChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
  };
  const onSubmit = async () => {
    const res = await axios.post('/api/users/sign-in', user);
    if (res.data.msg === 'Invalid email or password') {
      setAlert(true);
    } else if (res.data.msg === 'Sign in success') {
      if (res.data.user.account_status === 'disabled') {
        const data = {
          account_status: 'active',
          closed_in: null,
        };
        await axios.put(`/api/users/update-account/${res.data.user.id}`, data);
      }
      localStorage.setItem('yos_user', JSON.stringify(res.data.user));
      history.push('/');
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
        style={{height: '500px'}}
        className='flex justify-center items-center '
      >
        <div>
          <h2 className='text-xl mb-4 text-gray-600 text-center'>
            Sign in to{' '}
            <span className='font-semibold text-gray-900'>YOS Health</span>
          </h2>
          {alert && (
            <div className='flex items-center justify-between px-4 py-3 rounded mb-2 bg-red-300'>
              <p className='text-sm'>Incorrect email or password</p>
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
                name='email'
                onChange={onChange}
                value={email}
              />
            </div>
            <div style={{width: '250px'}} className='mt-3'>
              <div className='flex justify-between'>
                {' '}
                <label
                  className='block mb-2 text-sm sm:text-base'
                  htmlFor='password'
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
                name='password'
                onChange={onChange}
                value={password}
              />
            </div>
            <div className='mt-6'>
              <button
                onClick={onSubmit}
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
