import React from 'react';
import '../skeleton.css';
// const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const DetailsSkeleton = () => {
  return (
    <>
      <div className='sm:block hidden '>
        {/* <div className='bg-gray-400 w-full h-4 mt-6 skeleton-box'></div> */}
        {/* <div className='bg-gray-400 w-full h-4 mt-6 skeleton-box'></div> */}
        {/* {arr.map((el, index) => ( */}
        <div className='flex w-full'>
          <div
            style={{width: '300px', height: '250px'}}
            className='bg-gray-400 mr-4 mb-2 mt-6 skeleton-box'
          ></div>
          <div className='w-2/3 mt-4'>
            <div className='w-2/4 h-4 bg-gray-400 mt-5 skeleton-box'></div>
            <div className='w-1/3 h-3 bg-gray-400 mt-5 skeleton-box'></div>
            <div className='w-1/4 h-3 bg-gray-400 mt-5 skeleton-box'></div>
            <div className='w-1/4 h-3 bg-gray-400 mt-5 skeleton-box'></div>
            <div className='w-1/5 h-6 bg-gray-400 mt-5 skeleton-box'></div>
          </div>
        </div>
        {/* ))} */}
      </div>

      <div className='sm:hidden block mt-12'>
        {/* <div className='h-5 w-1/2 bg-gray-400 mb-5 skeleton-box'></div> */}

        <div className='flex flex-wrap gap-8 '>
          {/* {arr.map((el, index) => ( */}
          <div className=' mb-10 '>
            <div
              className='bg-gray-400 skeleton-box'
              style={{width: '300px', height: '250px'}}
            ></div>
            <div className='bg-gray-400 w-7/8 h-6 mt-4 skeleton-box'></div>
            <div className='bg-gray-400 w-5/6 h-3 mt-4 skeleton-box'></div>
            <div className='bg-gray-400 w-2/3 h-3 mt-4 skeleton-box'></div>
            <div className='bg-gray-400 w-1/3 h-3 mt-4 skeleton-box'></div>
            <div className='bg-gray-400 w-1/2 h-8 mt-4 skeleton-box'></div>
          </div>
          {/* ))} */}
        </div>
      </div>
    </>
  );
};

export default DetailsSkeleton;
