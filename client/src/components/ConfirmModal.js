import React from 'react';
import history from '../history';

const ConfirmModal = () => {
  return (
    <div>
      <div className='top-0 left-0 fixed bg-black bg-opacity-75 z-10 h-screen w-full'></div>

      <div
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        className='fixed sm:w-1/3 w-11/12  pb-8 px-4 z-40 text-lg mx-auto bg-white text-gray-700  rounded'
      >
        <span className='mt-8 flex justify-center items-center'>
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
        </span>
        <h3 className='text-gray-900 font-bold text-center py-2'>
          ORDER RECEIVED
        </h3>
        <p className='text-center sm:px-4 text-black sm:text-base text-sm mt-2 leading-6'>
          Thanks for your order. we'll call you shortly to confirm your order.
        </p>
        <button
          onClick={() => history.push('/')}
          className='px-4 py-2 mt-8 bg-gray-900 text-gray-100 block mx-auto rounded text-sm'
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
