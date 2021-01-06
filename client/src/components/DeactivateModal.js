import React, {useContext} from 'react';
import history from '../history';
import axios from 'axios';
import AppContext from '../context/appContext';

const DeactivateModal = ({setModal}) => {
  const appContext = useContext(AppContext);
  const {user, setAuthentication} = appContext;
  const onDeactivateAccount = async () => {
    const data = {
      account_status: 'disabled',
      closed_in: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    const res = await axios.put(`/api/users/update-account/${user.id}`, data);

    if (res.data.msg === 'account updated') {
      setAuthentication(false);
      localStorage.removeItem('yos_user');
      history.push('/login');
    }
  };
  const cancelDeactivation = () => {
    setModal(false);
  };
  return (
    <div>
      <div className='top-0 left-0 fixed bg-black bg-opacity-75 z-40 h-screen w-full'></div>

      <div
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        className='fixed sm:w-1/3 w-11/12  pb-8 px-4 z-50 text-lg mx-auto bg-white text-gray-700  rounded'
      >
        {/* <span className='mt-8 flex justify-center items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='64'
            viewBox='0 0 24 24'
            width='64'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path
              d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z'
              fill='#909090'
            />
          </svg>
        </span> */}
        <h3 className='text-red-600 font-bold text-center py-2 mt-8'>
          ARE YOU SURE?
        </h3>
        <p className='text-center sm:px-4 text-black sm:text-base text-sm mt-2 leading-6'>
          This will stop all your account activity. If you change your mind.
          Just login back.
        </p>
        <div className='flex justify-end pr-8 mt-8'>
          <button
            onClick={onDeactivateAccount}
            className='text-gray-800 font-medium text-sm sm:text-base'
          >
            Yes
          </button>
          <button
            onClick={cancelDeactivation}
            className='bg-gray-900 text-gray-100 px-4 py-1 rounded text-sm ml-8'
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateModal;
