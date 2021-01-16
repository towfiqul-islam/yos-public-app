import React, {useContext, useEffect} from 'react';
import AppContext from '../context/appContext';
import history from '../history';
import {Link, useLocation} from 'react-router-dom';
import Cart from './Cart';

import SecondaryItemCard from './SecondaryItemCard';

import {checkCarts, checkPath} from '../utils';
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
    setUser,
    user,
    setAuthentication,
    isAuthenticated,
  } = appContext;

  const onChange = async e => {
    onSearch(e.target.value);
    if (search.length >= 2 && search.length <= 20) {
      const res = await axios.get(`/api/medicines/search/${search}`);
      fillSearchResults(res.data.data);
    }
  };

  const onLogout = () => {
    setAuthentication(false);
    localStorage.removeItem('carts');
    localStorage.removeItem('yos_user');
    history.push('/login');
  };

  useEffect(() => {
    onSearch('');
    const storedCarts = JSON.parse(localStorage.getItem('carts'));
    if (storedCarts !== null) {
      addToCart(storedCarts);
      calculateCartValue(storedCarts);
    }

    const yos_user = JSON.parse(localStorage.getItem('yos_user'));
    if (yos_user) {
      setUser(yos_user);
      setAuthentication(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='bg-gray-200'>
      <div className='bg-gray-300 text-gray-900 py-2'>
        <div className=' flex sm:justify-center justify-between sm:w-3/4 mx-auto w-11/12  '>
          <div className='flex justify-center items-center'>
            {' '}
            <p className='mr-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='20'
                viewBox='0 0 24 24'
                width='20'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path
                  d='M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z'
                  fill='#1a202c'
                />
              </svg>
            </p>
            <p
              onClick={() => window.open('tel: 01813548952')}
              className='mr-2 hover:underline sm:text-base text-sm cursor-pointer '
            >
              01813548952
            </p>
            <p className='mr-2 text-gray-700 sm:text-sm text-xs sm:block hidden'>
              Call to order
            </p>
          </div>
          {isAuthenticated ? (
            <div className='ml-8 flex'>
              <div className='flex items-center'>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='24'
                    viewBox='0 0 24 24'
                    width='24'
                  >
                    <path d='M0 0h24v24H0V0z' fill='none' />
                    <path
                      d='M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z'
                      fill='#4a5568'
                    />
                  </svg>
                </span>
                <span
                  onClick={() => history.push('/user')}
                  className='ml-1 cursor-pointer'
                >
                  {user.first_name}...
                </span>
              </div>
              <div
                onClick={onLogout}
                className='ml-8 text-red-700 font-medium md:flex items-center hidden cursor-pointer'
              >
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='24'
                    viewBox='0 0 24 24'
                    width='24'
                  >
                    <path d='M0 0h24v24H0V0z' fill='none' />
                    <path
                      d='M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z'
                      fill='#4a5568'
                    />
                  </svg>
                </span>
                <span className='ml-1'>Logout</span>
              </div>
            </div>
          ) : (
            <div className='flex items-center ml-8'>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  enableBackground='new 0 0 24 24'
                  height='20'
                  viewBox='0 0 24 24'
                  width='20'
                >
                  <g>
                    <rect fill='none' height='20' width='20' />
                  </g>
                  <g>
                    <path
                      d='M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z'
                      fill='#1a202c'
                    />
                  </g>
                </svg>
              </span>
              <Link to='/login' className='ml-2 text-sm'>
                Login/Signup
              </Link>
            </div>
          )}
        </div>
      </div>
      {isCartOpen && checkPath(router.pathname) && (
        <div
          onClick={openCart}
          className='top-0 left-0 fixed bg-black bg-opacity-75 z-50 h-screen w-full'
        ></div>
      )}
      {search.length > 2 &&
        searchResults &&
        searchResults.length > 0 &&
        checkPath(router.pathname) && (
          <div
            onClick={() => onSearch('')}
            className='top-0 left-0 fixed bg-black bg-opacity-75 z-10 h-screen w-full'
          ></div>
        )}
      {checkPath(router.pathname) && <Cart />}
      <nav className='flex  py-4  items-center md:w-3/4 w-11/12 m-auto'>
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
            }}
            className=' font-bold md:text-4xl text-xl cursor-pointer sm:mr-12 mr-4'
          >
            YOS
          </h1>
        </div>
        <div
          className={
            checkPath(router.pathname)
              ? 'md:flex relative  items-center justify-center z-30  hidden'
              : 'md:flex relative  items-center justify-center z-30  hidden opacity-50'
          }
        >
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
            value={checkPath(router.pathname) ? search : ''}
            onChange={onChange}
          />
          {/* Searched items */}
          {search.length > 2 &&
            searchResults &&
            searchResults.length > 0 &&
            checkPath(router.pathname) && (
              <div
                style={{top: '60px', width: '440px'}}
                className=' absolute   border-b z-30 border-gray-400 shadow-xl'
              >
                <p className=' shadow bg-yellow-400 text-center text-gray-900 px-2 py-2 text-sm'>
                  Home delivery only in Dhanmondi area.
                  {/* <span className='bg-gray-200 text-xs font-bold ml-2 px-2 text-center inline-block'>
                    5% cashback on all orders
                  </span> */}
                </p>
                {searchResults.map(med => (
                  <SecondaryItemCard
                    inCart={checkCarts(med, carts)}
                    key={med.medicine_id}
                    med={med}
                  />
                ))}
                <p className='bg-gray-100 text-center p-2  pb-2 text-sm border-t border-gray-500'>
                  Found{' '}
                  {searchResults.length === 1
                    ? '1 result'
                    : `${searchResults.length} results`}
                </p>
              </div>
            )}
        </div>

        <Link
          to='/browse-medicines/page/1'
          className=' sm:text-lg sm:mx-12 mr-4 '
        >
          Medicines
        </Link>
        <div
          onClick={() => {
            if (checkPath(router.pathname)) {
              openCart();
            }
          }}
          className={
            checkPath(router.pathname)
              ? 'flex md:mr-24 relative cursor-pointer'
              : 'flex md:mr-24 relative cursor-default opacity-25'
          }
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
          <span className='font-normal text-lg ml-2 hidden md:block '>
            Cart
          </span>
        </div>
        {/* Mobile search toggle */}
        <div
          onClick={() =>
            checkPath(router.pathname) &&
            toggleMobileSearch(!isMobileSearchOpen)
          }
          className={`md:hidden ml-6 border border-gray-500 w-8 h-8 flex items-center justify-center rounded-full ${
            !checkPath(router.pathname) && 'opacity-25'
          }`}
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
              if (
                router.pathname !== '/order-by-prescription' &&
                !isAuthenticated
              ) {
                history.push('/order-by-prescription');
              } else if (
                router.pathname !== '/user-order-by-prescription' &&
                isAuthenticated
              ) {
                history.push('/user-order-by-prescription');
              }
            }}
            className={
              router.pathname === '/order-by-prescription' ||
              router.pathname === '/user-order-by-prescription'
                ? 'bg-gray-500 text-gray-300 rounded px-2 py-1 cursor-default focus:outline-none'
                : 'border-2 border-gray-900 text-gray-900  hover:bg-gray-900 hover:text-gray-100 rounded px-2 py-1'
            }
          >
            Order by prescription
          </button>
        </div>
      </nav>

      {isMenuOpen &&
        (router.pathname !== '/order-by-prescription' ||
          router.pathname !== '/user-order-by-prescription') && (
          <div className='pb-2  border-t border-gray-300'>
            <div className='w-11/12 mx-auto'>
              <button
                onClick={() => {
                  if (user) {
                    history.push('/user-order-by-prescription');
                  } else {
                    history.push('/order-by-prescription');
                  }
                }}
                className=' block py-4 text-base '
              >
                Order by prescription
              </button>

              <button
                onClick={onLogout}
                className='block text-red-700 font-medium text-base pb-2 '
              >
                Logout
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default SecondaryNav;
