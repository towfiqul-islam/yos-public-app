import React from 'react';
import {discount} from '../../utils';

const Services = () => {
  return (
    <>
      <h2 className='uppercase font-semibold text-center sm:text-2xl text-xl mt-12'>
        Our Services
      </h2>
      <div className='mb-20 flex sm:w-5/6 justify-center mx-auto'>
        <div className='sm:flex justify-center'>
          <div className='sm:flex sm:justify-center gap-12'>
            {' '}
            <div className='flex flex-wrap justify-center sm:w-1/4 w-11/12 mx-auto'>
              <span className='flex justify-center items-center mt-10 bg-blue-200 rounded-full w-32 h-32'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='48'
                  viewBox='0 0 24 24'
                  width='48'
                >
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path d='M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z' />
                </svg>
              </span>

              <div className='flex justify-center'>
                <div className='mt-2 font-medium text-xl text-center'>
                  Free home delivery in Dhanmondi
                  <p className='mt-3  font-normal text-base'>
                    Get free home delivery within Dhanmondi, Jhigatola area in
                    Dhaka city.
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap justify-center sm:w-1/4 w-2/3 mx-auto'>
              <span className='flex justify-center items-center mt-10 bg-blue-200 rounded-full w-32 h-32'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='48'
                  viewBox='0 0 24 24'
                  width='48'
                >
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z' />
                </svg>
              </span>

              <div className='flex justify-center'>
                <div className='mt-2 font-medium text-xl text-center'>
                  Fastest delivery in business
                  <p className='mt-3  font-normal text-base  '>
                    Get your products within 3 hours at your doorstep.
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap justify-center sm:w-1/4 w-2/3 mx-auto'>
              <span className='flex justify-center items-center mt-10 bg-blue-200 rounded-full w-32 h-32'>
                {' '}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='48'
                  viewBox='0 0 24 24'
                  width='48'
                >
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path d='M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z' />
                </svg>
              </span>
              <div className='flex justify-center'>
                <div className='mt-2 font-medium text-xl text-center'>
                  Instant cashback
                  <p className='mt-3  font-normal text-base  '>
                    Get {discount}% instant cashback on your orders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
