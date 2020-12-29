import React, {useContext, useRef, useEffect} from 'react';
import AppContext from '../context/appContext';
import Cart from './Cart';

import SecondaryItemCard from './SecondaryItemCard';

import axios from 'axios';
import {checkCarts} from '../utils';

const MobileSearchOverlay = () => {
  const searchInput = useRef(null);
  const appContext = useContext(AppContext);
  const {
    toggleMobileSearch,
    isMobileSearchOpen,
    openCart,
    isCartOpen,
    carts,

    onSearch,
    searchResults,
    search,
    fillSearchResults,
  } = appContext;
  const onChange = async e => {
    onSearch(e.target.value);
    if (search.length >= 2 && search.length <= 20) {
      const res = await axios.get(`/api/medicines/search/${search}`);
      fillSearchResults(res.data.data);
    }
  };

  useEffect(() => {
    searchInput.current.focus();

    // eslint-disable-next-line
  }, [isMobileSearchOpen]);
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
          ref={searchInput}
          className='md:w-1/2 w-11/12 border-t border-b border-gray-500 px-4 py-4 focus:outline-none'
          type='text'
          placeholder='Search and order medicine'
          name='search'
          onChange={onChange}
          value={search}
        />
        <span
          onClick={() => {
            toggleMobileSearch(!isMobileSearchOpen);
            onSearch('');
            // searchResults
          }}
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
      <div className='flex justify-between shadow py-1 bg-yellow-400 text-gray-900'>
        <p className=' px-2 py-1 text-sm'>
          Home delivery only in Dhanmondi area.
        </p>
        {carts.length > 0 && (
          <button
            onClick={() => openCart(!isCartOpen)}
            className='border border-gray-700 px-1 rounded text-sm font-semibold mr-2'
          >
            View carts
          </button>
        )}
      </div>
      <div className='md:hidden block'>
        {search.length > 2 &&
          searchResults &&
          searchResults.length > 0 &&
          searchResults.map(med => (
            <SecondaryItemCard
              inCart={checkCarts(med, carts)}
              key={med.medicine_id}
              med={med}
            />
          ))}

        {carts.length === 0 && search.length <= 2 && (
          <div
            className='fixed'
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* <div className='flex justify-center mb-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='64'
                viewBox='0 0 24 24'
                width='64'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path
                  d='M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z'
                  fill='#c6c6c6'
                />
              </svg> 
            </div>*/}
            <p className='font-medium text-gray-500'>Your cart is empty.</p>
          </div>
        )}

        {carts.length > 0 && search.length === 0 && (
          <div
            className='fixed'
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* <div className='flex justify-center mb-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='64'
                viewBox='0 0 24 24'
                width='64'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path
                  d='M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z'
                  fill='#c6c6c6'
                />
              </svg>
            </div> */}
            <p className='font-medium text-gray-500'>
              {carts.length === 1
                ? `${carts.length} item`
                : `${carts.length} items`}{' '}
              added to cart
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSearchOverlay;
