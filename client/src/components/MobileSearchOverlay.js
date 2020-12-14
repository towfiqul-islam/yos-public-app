import React, {useContext} from 'react';
import AppContext from '../context/appContext';
import Cart from './Cart';
import ItemCard from './ItemCard';
import SecondaryItemCard from './SecondaryItemCard';

const MobileSearchOverlay = () => {
  const appContext = useContext(AppContext);
  const {
    toggleMobileSearch,
    isMobileSearchOpen,
    openCart,
    isCartOpen,
  } = appContext;
  return (
    <div className='mb-20'>
      <Cart />
      <div className='flex items-center justify-center'>
        <span className='block pl-4 py-4  border-t border-b border-gray-500'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24'
            viewBox='0 0 24 24'
            width='24'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
          </svg>
        </span>
        <input
          className='sm:w-1/2 w-11/12 border-t border-b border-gray-500 px-4 py-4 focus:outline-none'
          type='text'
          placeholder='Search and order medicine'
        />
        <span
          onClick={() => toggleMobileSearch(!isMobileSearchOpen)}
          className='border-t border-b block border-gray-500 pr-4 py-4 cursor-pointer'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24'
            viewBox='0 0 24 24'
            width='24'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
          </svg>
        </span>
      </div>
      <p className='w-full text-center shadow bg-yellow-400 rounded text-gray-900 px-2 py-1 text-sm'>
        Home delivery only in Dhanmondi area.
      </p>
      <div className='sm:hidden block'>
        <SecondaryItemCard />
        <SecondaryItemCard />
        <SecondaryItemCard />
        <SecondaryItemCard />
        <SecondaryItemCard />
        {/* <ItemCard />
        <ItemCard /> */}
      </div>
      <div className='flex z-10 bg-gray-300 items-center justify-around bottom-0 fixed w-full pt-4 '>
        <p className='text-xl font-bold mb-2'>360.00 TK</p>
        <div
          onClick={() => openCart(!isCartOpen)}
          className='flex sm:mr-24  relative cursor-pointer border border-gray-500 rounded px-4 py-2 mb-2'
        >
          <div
            style={{left: '30px', top: '-10px'}}
            className='absolute  bg-gray-900 rounded-full h-4 w-4 p-3 flex items-center justify-center text-gray-100 text-xs'
          >
            1
          </div>
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24'
              viewBox='0 0 24 24'
              width='24'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z' />
            </svg>
          </span>
          <span className='font-semibold text-lg ml-3'>View Cart</span>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchOverlay;
