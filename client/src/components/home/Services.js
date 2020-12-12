import React from 'react';

const Services = () => {
  return (
    <div>
      <div className='sm:flex flex-wrap justify-center mt-20 hidden'>
        <div className='border border-gray-300 w-1/3 h-48 px-4'>
          <span className='flex justify-center mt-10'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='48'
              viewBox='0 0 24 24'
              width='48'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path
                d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z'
                fill='#909090'
              />
              <circle cx='12' cy='9' r='2.5' fill='#909090' />
            </svg>
          </span>
          <p className='text-center mt-2 font-medium'>
            Home delivery in Dhanmondi, Dhaka
          </p>
        </div>
        <div className='m-5'></div>
        <div className='border border-gray-300 w-1/3 h-48 px-4'>
          <span className='flex justify-center mt-10'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='48'
              viewBox='0 0 24 24'
              width='48'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path
                d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z'
                fill='#909090'
              />
            </svg>
          </span>
          <p className='text-center mt-2 font-medium'>
            Delivery within 3 hours
          </p>
        </div>
      </div>{' '}
      <div className='sm:flex flex-wrap justify-center mt-8 hidden'>
        <div className='border border-gray-300 w-1/3 h-48 px-4'>
          <span className='flex justify-center mt-10'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='48'
              viewBox='0 0 24 24'
              width='48'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path
                d='M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9-7 7.02z'
                fill='#909090'
              />
              <circle cx='6.5' cy='6.5' r='1.5' fill='#909090' />
            </svg>
          </span>
          <p className='text-center mt-2 font-medium'>
            3% discount on all orders
          </p>
        </div>
        <div className='m-5'></div>
        <div className='border border-gray-300 h-48 w-1/3 px-4'>
          <span className='flex justify-center mt-10'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='48'
              viewBox='0 0 24 24'
              width='48'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path
                d='M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z'
                fill='#909090'
              />
            </svg>
          </span>
          <p className='text-center mt-2 font-medium'>Free home delivery</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
