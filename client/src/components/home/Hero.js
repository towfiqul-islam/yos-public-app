import React from 'react';

const Hero = () => {
  return (
    <div>
      <div className='mt-10'>
        <span className='flex justify-center items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='48'
            viewBox='0 0 24 24'
            width='48'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path
              d='M21 5h-2.64l1.14-3.14L17.15 1l-1.46 4H3v2l2 6-2 6v2h18v-2l-2-6 2-6V5zm-3.9 8.63L18.89 19H5.11l1.79-5.37.21-.63-.21-.63L5.11 7h13.78l-1.79 5.37-.21.63.21.63zM13 9h-2v3H8v2h3v3h2v-3h3v-2h-3z'
              fill='#C6C6C6'
            />
          </svg>
        </span>
        <p className='text-center font-semibold text-gray-600 text-xl'>
          Pharmacy at your doorstep
        </p>
      </div>
    </div>
  );
};

export default Hero;
