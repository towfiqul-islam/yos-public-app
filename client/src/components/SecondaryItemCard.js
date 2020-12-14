import React from 'react';

const SecondaryItemCard = () => {
  return (
    <div>
      <div className='bg-gray-100 border-t border-gray-300 px-4 py-4'>
        <h2 className='font-semibold sm:text-lg mb-1'>Ciprocin 500mg Tablet</h2>
        <p className='mb-1'>By Square Pharma</p>
        <p className='mb-1 font-medium text-lg'>
          5.25Tk <span className='text-base font-normal'>per-unit</span>
        </p>
        <div className='flex justify-between'>
          <div className='flex '>
            <p className='mr-4'>Quantity</p>
            <div className='flex items-center'>
              <span className='cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='20'
                  viewBox='0 0 24 24'
                  width='20'
                >
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path d='M19 13H5v-2h14v2z' />
                </svg>
              </span>
              <input
                className='border border-gray-600  mx-2 w-8 text-center'
                type='text'
                placeholder='10'
              />
              <span className='cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='20'
                  viewBox='0 0 24 24'
                  width='20'
                >
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
                </svg>
              </span>
            </div>
          </div>
          <button className='bg-gray-900 text-gray-100 px-4 py-1 rounded text-sm'>
            Add To Cart
          </button>
        </div>{' '}
      </div>
    </div>
  );
};

export default SecondaryItemCard;
