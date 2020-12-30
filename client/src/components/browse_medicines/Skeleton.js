import React from 'react';

import '../../skeleton.css';

const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const Skeleton = () => {
  return (
    <div className='hidden sm:block'>
      <div className='h-5 w-1/2 bg-gray-400 mb-5 skeleton-box'></div>

      <div className='flex flex-wrap gap-8 '>
        {arr.map((el, index) => (
          <div key={index} className=' mb-10 '>
            <div
              className='bg-gray-400 skeleton-box'
              style={{width: '200px', height: '150px'}}
            ></div>
            <div className='bg-gray-400 w-4/5 h-3 mt-4 skeleton-box'></div>
            <div className='bg-gray-400 w-4/5 h-3 mt-4 skeleton-box'></div>
            <div className='bg-gray-400 w-4/5 h-3 mt-4 skeleton-box'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
