import React from 'react';

const CartItem = () => {
  return (
    <div>
      <div className='m-auto flex justify-center mt-2 '>
        {/* <span className='block pl-4 py-3 border-l border-t  border-b '>
          <div
            style={{
              width: '24px',
              height: '24px',
            }}
          ></div>
        </span> */}
        <div className='  border-b px-4 py-3  w-11/12 '>
          <h1 className='font-semibold sm:text-2xl text-xl mb-1'>
            Ciprocin 500mg Tablet
          </h1>
          <p className='mb-1'>By Square pharma</p>
          <div className='flex items-center mb-1'>
            <p className='text-xl font-semibold mr-2 '>5.25 Tk </p>
            <span>per-unit</span>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex'>
              {' '}
              <span className='mr-4'>Quantity</span>
              <div className='flex items-center'>
                <span>
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
                <span className='border border-gray-500 px-2 mx-2'>10</span>
                <span>
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
            <button className='border-2 border-red-700 text-gray-900 px-4 py-1 rounded text-sm'>
              Remove
            </button>
          </div>
        </div>
      </div>{' '}
      <hr className='border-gray-500' />
    </div>
  );
};

export default CartItem;
