import React from 'react';
// import '../../../skeleton.css';
import '../../skeleton.css';
const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const MobileSkeleton = () => {
  return (
    <div className='sm:hidden block'>
      <div className='bg-gray-400 w-1/2 h-2 mt-6 skeleton-box'></div>

      {arr.map((el, index) => (
        <div key={index} className='flex w-full'>
          <div
            style={{width: '120px', height: '100px'}}
            className='bg-gray-400 mr-4 mb-2 mt-6 skeleton-box'
          ></div>
          <div className='w-2/3 mt-6'>
            <div className='w-3/4 h-4 bg-gray-400 mt-1 mb-2 skeleton-box'></div>
            <div className='w-1/2 h-2 bg-gray-400 mt-1 mb-2 skeleton-box'></div>
            <div className='w-1/3 h-2 bg-gray-400 mt-1 mb-2 skeleton-box'></div>
            <div className='w-1/4 h-5 bg-gray-400 mt-1 mb-2 skeleton-box'></div>
            {/* <div className='w-3/4 h-3 bg-gray-400 mt-5 skeleton-box'></div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileSkeleton;
