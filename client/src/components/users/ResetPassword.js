import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import history from '../../history';
import AppContext from '../../context/appContext';
import {urlStrings} from '../../utils';

const ResetPassword = () => {
  const appContext = useContext(AppContext);
  const {setAuthentication} = appContext;
  const {random_url} = useParams();

  const [showAlert, setShowAlert] = useState(false);

  const [password, setPassword] = useState({
    new_password: '',
    confirm_new_password: '',
  });
  const {new_password, confirm_new_password} = password;
  const onChange = e => {
    setPassword({...password, [e.target.name]: e.target.value});
  };
  const onSubmit = async () => {
    if (new_password === confirm_new_password && new_password !== '') {
      const data = {
        password: new_password,
      };

      const res = await axios.put(
        `/api/users/reset-password/${localStorage.getItem('reset-id')}`,
        data,
      );
      if (res.data.msg === 'Password updated. You need to sign in') {
        setShowAlert(true);
      } else {
        alert('Make sure password matches the given condition');
      }
    } else {
      alert('Passwords do not match!');
    }
  };
  const resetEverything = () => {
    setShowAlert(false);
    setAuthentication(false);
    localStorage.removeItem('carts');
    localStorage.removeItem('yos_user');
    localStorage.removeItem('token');
    localStorage.removeItem('reset-id');
    history.push('/login');
    window.location.reload();
  };
  useEffect(() => {
    const resetId = localStorage.getItem('reset-id');

    if (!urlStrings.includes(random_url) || resetId === null) {
      history.push('/login');
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className='sm:w-3/4 w-11/12 m-auto'>
      <h2 className='my-8 border-b-2 border-gray-600 inline-block'>
        Reset your password
      </h2>
      {showAlert && (
        <div
          style={{width: '300px'}}
          className={`flex items-center justify-between px-2 py-1 rounded mb-2 bg-green-300`}
        >
          <p className='text-sm'>Password updated. You need to sign in</p>
          <span
            onClick={resetEverything}
            className='cursor-pointer bg-gray-100 px-2 py-1 rounded text-xs'
          >
            Ok
          </span>
        </div>
      )}
      <div style={{width: '300px'}}>
        <label className='block' htmlFor=''>
          New Password
        </label>
        <input
          className='bg-gray-300 border-gray-400 rounded px-2 py-1 w-full'
          type='password'
          name='new_password'
          value={new_password}
          onChange={onChange}
        />
        <p className='text-xs text-gray-600 mt-1'>
          Minimum 8 characters including at least a number, one lowercase and
          one uppercase letter
        </p>
      </div>
      <div style={{width: '300px'}}>
        <label className='block mt-4' htmlFor=''>
          Confirm New Password
        </label>
        <input
          className='bg-gray-300 border-gray-400 rounded px-2 py-1 w-full'
          type='password'
          name='confirm_new_password'
          value={confirm_new_password}
          onChange={onChange}
        />
      </div>
      <div style={{width: '300px'}}>
        <button
          onClick={onSubmit}
          className='w-full bg-gray-900 rounded py-2 text-gray-100 mt-8'
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
