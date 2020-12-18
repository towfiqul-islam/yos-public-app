import React, {useContext, useEffect} from 'react';
import AppContext from '../context/appContext';
import history from '../history';
import {useLocation} from 'react-router-dom';
import Cart from './Cart';

import SecondaryItemCard from './SecondaryItemCard';

// import {data} from '../data';
import axios from 'axios';

const SecondaryNav = () => {
  const router = useLocation();
  const appContext = useContext(AppContext);
  const {
    isCartOpen,
    openCart,
    toggleMobileSearch,
    isMobileSearchOpen,
    toggleMobileMenu,
    isMenuOpen,
    carts,
    search,
    searchResults,
    onSearch,
    addToCart,
    calculateCartValue,
    fillSearchResults,
  } = appContext;

  const onChange = async e => {
    onSearch(e.target.value);
    if (search.length >= 2) {
      const res = await axios.get(`/api/medicines/search/${search}`);
      fillSearchResults(res.data.data);
    }
  };

  useEffect(() => {
    onSearch('');
    const storedCarts = JSON.parse(localStorage.getItem('carts'));
    if (storedCarts !== null) {
      addToCart(storedCarts);
      calculateCartValue(storedCarts);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='bg-gray-200'>
      {isCartOpen && router.pathname !== '/order-review' && (
        <div
          onClick={openCart}
          className='top-0 left-0 fixed bg-black bg-opacity-75 z-50 h-screen w-full'
        ></div>
      )}
      {search.length > 2 &&
        searchResults.length > 0 &&
        router.pathname !== '/order-review' && (
          <div
            onClick={() => onSearch('')}
            className='top-0 left-0 fixed bg-black bg-opacity-75 z-10 h-screen w-full'
          ></div>
        )}
      {router.pathname !== '/order-review' && <Cart />}
      <nav className='flex  py-4  items-center md:w-2/3 w-11/12 m-auto'>
        <div className='flex flex-grow md:flex-grow-0 items-center'>
          <span
            onClick={() => toggleMobileMenu(!isMenuOpen)}
            className='sm:hidden block mr-4 cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24'
              viewBox='0 0 24 24'
              width='24'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
            </svg>
          </span>
          <h1
            onClick={() => {
              history.push('/');
              toggleMobileMenu(false);
              // toggleMobileSearch(false)
            }}
            className=' font-bold md:text-4xl text-xl cursor-pointer'
          >
            YOS
          </h1>
        </div>
        <div className='md:flex relative flex-grow items-center justify-center z-30  hidden'>
          <span className='block bg-white pl-4 py-3 border-l border-t border-b border-gray-500'>
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
            style={{width: '400px'}}
            className=' border-t border-b border-r border-gray-500 px-4 py-3 focus:outline-none'
            type='text'
            placeholder='Search and order medicine'
            name='search'
            value={router.pathname !== '/order-review' ? search : ''}
            onChange={onChange}
          />
          {/* Searched items */}
          {search.length > 2 &&
            searchResults.length > 0 &&
            router.pathname !== '/order-review' && (
              <div
                style={{top: '60px', width: '440px'}}
                className=' absolute   border-b z-30 border-gray-400 shadow-xl'
              >
                <p className=' shadow bg-yellow-400 text-gray-900 px-2 py-2 text-sm'>
                  Home delivery only in Dhanmondi area.
                  <span className='bg-gray-200 text-xs font-bold ml-2 px-2 text-center inline-block'>
                    5% cashback on all orders
                  </span>
                </p>
                {searchResults.map(med => (
                  <SecondaryItemCard key={med.medicine_id} med={med} />
                ))}
                <p className='bg-gray-100 text-center p-2  pb-2 text-sm border-t border-gray-500'>
                  Found {searchResults.length} results
                </p>
              </div>
            )}
        </div>
        <div
          onClick={() => {
            if (router.pathname !== '/order-review') {
              openCart();
            }
          }}
          className='flex md:mr-24 relative cursor-pointer'
        >
          {carts.length > 0 && (
            <div
              style={{left: '15px', top: '-16px'}}
              className='absolute  bg-gray-900 rounded-full h-4 w-4 p-3 flex items-center justify-center text-gray-100 text-xs'
            >
              {carts.length}
            </div>
          )}
          <span className='mr-3 md:mr-0'>
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
          <span className='font-semibold text-lg ml-2 hidden md:block '>
            Cart
          </span>
        </div>
        {/* Mobile search toggle */}
        <div
          onClick={() => toggleMobileSearch(!isMobileSearchOpen)}
          className='md:hidden ml-6 border border-gray-500 w-8 h-8 flex items-center justify-center rounded-full'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='20'
            viewBox='0 0 24 24'
            width='20'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
          </svg>
        </div>
        <div className='hidden md:block'>
          <button
            onClick={() => {
              if (router.pathname !== '/order-by-prescription') {
                history.push('/order-by-prescription');
              }
            }}
            className={
              router.pathname === '/order-by-prescription'
                ? 'bg-gray-500 text-gray-300 rounded px-6 py-2 cursor-default focus:outline-none'
                : 'bg-gray-900 text-gray-100 rounded px-6 py-2'
            }
          >
            Order by prescription
          </button>
        </div>
      </nav>

      {isMenuOpen &&
        router.pathname !== '/' &&
        router.pathname !== '/order-by-prescription' && (
          <div className='pb-2 '>
            <button
              onClick={() => history.push('/order-by-prescription')}
              className='border-2 border-gray-900 text-gray-900 font-medium px-4 py-2 block w-3/4 mx-auto rounded'
            >
              Order by prescription
            </button>
          </div>
        )}
    </div>
  );
};

export default SecondaryNav;
