import React, {useContext, useEffect, useState} from 'react';
import AppContext from '../../context/appContext';
import MobileSearchOverlay from '../MobileSearchOverlay';
import SecondaryNav from '../SecondaryNav';
import Footer from '../Footer';
import axios from 'axios';
import history from '../../history';
import DeactivateModal from '../DeactivateModal';

const User = () => {
  const [alert, setAlert] = useState(false);
  const [modal, setModal] = useState(false);
  const appContext = useContext(AppContext);
  const {isMobileSearchOpen, isCartOpen, user, setAuthentication} = appContext;
  const {
    first_name,
    last_name,
    email,

    user_status,
    yos_wallet,
    total_purchase,
  } = user;
  const [updateUser, setUpdateUser] = useState({
    f_name: '',
    l_name: '',
    mobile: '',
    home_address: '',
  });

  const {f_name, l_name, mobile, home_address} = updateUser;

  const onChange = e => {
    setUpdateUser({...updateUser, [e.target.name]: e.target.value});
  };

  const onSubmit = async () => {
    const data = {
      first_name: f_name,
      last_name: l_name,
      phone: mobile,
      address: home_address,
    };
    const res = await axios.put(`/api/users/update-account/${user.id}`, data);
    if (res.data.msg === 'account updated') {
      localStorage.removeItem('yos_user');
      setAuthentication(false);
      setAlert(true);
    }
  };

  useEffect(() => {
    const yos_user = JSON.parse(localStorage.getItem('yos_user'));
    const {first_name, last_name, phone, address} = yos_user;
    if (user !== undefined) {
      setUpdateUser({
        f_name: first_name,
        l_name: last_name,
        mobile: phone,
        home_address: address,
      });
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      <div className={isMobileSearchOpen ? 'block sm:hidden' : 'hidden'}>
        <MobileSearchOverlay />
      </div>
      <div className={isMobileSearchOpen ? 'hidden sm:block' : 'block'}>
        {modal && <DeactivateModal setModal={setModal} />}
        <SecondaryNav />
        <div
          style={{
            maxHeight: isCartOpen && '88vh',
            overflowY: isCartOpen && 'hidden',
          }}
          className='sm:w-3/4 w-11/12 m-auto h-full'
        >
          <div className='flex justify-center'>
            <div style={{width: '200px'}} className='relative'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='#718096'
                  width='200px'
                  height='200px'
                >
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' />
                </svg>
              </div>
              {/* <img
                src='https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
                width='200px'
                height='200px'
                alt=''
              /> */}
              {/* <button
                style={{bottom: '100px', left: '10px'}}
                className='absolute bg-gray-100 text-gray-900 shadow px-4 py-1 rounded cursor-pointer'
              >
                Edit
              </button> */}
              <div className=''>
                <h2 className='text-center sm:text-2xl font-semibold'>
                  {first_name} {last_name}
                </h2>
                <h2 className='text-center'>{email}</h2>
              </div>
            </div>
          </div>
          <div className='flex justify-between mt-10 sm:bg-gray-200 sm:border sm:border-gray-400 sm:shadow sm:px-8 sm:py-4 rounded'>
            <div className=''>
              <h2 className='sm:text-2xl text-sm'>User status</h2>
              <p className='font-bold text-gray-600 mt-1 text-base'>
                {user_status}
              </p>
            </div>
            <div className=''>
              <h2 className='sm:text-2xl text-sm'>YOS wallet</h2>
              <p className='font-bold text-gray-600 mt-1 text-base'>
                {yos_wallet} Tk
              </p>
            </div>
            <div className=''>
              <h2 className='sm:text-2xl text-sm'>Total purchase</h2>
              <p className='font-bold text-gray-600 mt-1 text-base'>
                {total_purchase} Tk
              </p>
            </div>
          </div>
          <div className='mt-12'>
            <h2 className='mb-6 sm:text-2xl text-base border-b border-gray-400 inline-block'>
              Update account
            </h2>
            {alert && (
              <div
                style={{width: '300px'}}
                className='flex items-center justify-between px-2 py-1 rounded mb-4 bg-green-300'
              >
                <p className='text-xs'>
                  Account updated. Login to see the change
                </p>
                <span
                  onClick={() => {
                    setAlert(false);
                    history.push('/login');
                  }}
                  className='cursor-pointer bg-gray-100 px-3 py-1 rounded text-xs'
                >
                  Ok
                </span>
              </div>
            )}
            <div>
              <label className='block mb-1' htmlFor='f_name'>
                First name
              </label>
              <input
                style={{width: '300px'}}
                className='border border-gray-400 rounded px-2 py-1'
                type='text'
                id='f_name'
                name='f_name'
                onChange={onChange}
                value={f_name}
              />
            </div>
            <div className='mt-4'>
              <label className='block mb-1' htmlFor='l_name'>
                Last name
              </label>
              <input
                style={{width: '300px'}}
                className='border border-gray-400 rounded px-2 py-1'
                type='text'
                name='l_name'
                value={l_name}
                onChange={onChange}
              />
            </div>
            <div className='mt-4'>
              <label className='block mb-1' htmlFor='phone'>
                Phone
              </label>
              <input
                style={{width: '300px'}}
                className='border border-gray-400 rounded px-2 py-1'
                type='text'
                name='mobile'
                value={mobile}
                onChange={onChange}
              />
            </div>
            <div className='mt-4'>
              <label className='block mb-1' htmlFor='address'>
                Address
              </label>
              <textarea
                style={{width: '300px'}}
                className='border border-gray-400 rounded px-2 py-1'
                name='home_address'
                onChange={onChange}
                value={home_address === null ? '' : home_address}
                id=''
                cols='30'
                rows='5'
              ></textarea>
            </div>
            <div className='mt-4'>
              <button
                onClick={onSubmit}
                style={{width: '300px'}}
                className='block w-full bg-gray-900 text-gray-100 py-2 rounded'
              >
                Update
              </button>
            </div>
          </div>
          <div className='mt-6'>
            <button
              onClick={() => setModal(true)}
              className='text-red-700 font-medium underline'
            >
              Deactivate account
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
