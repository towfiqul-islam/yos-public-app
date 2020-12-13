import React, {useContext} from 'react';
import AppContext from '../context/appContext';
import Cart from './Cart';

const Nav = () => {
  const appContext = useContext(AppContext);
  const {isCartOpen, openCart} = appContext;
  return (
    <div className='bg-gray-200'>
      <Cart />
      <nav className='flex py-4  items-center sm:w-2/3 w-11/12 m-auto'>
        <h1 className='flex-grow font-bold text-4xl'>YOS</h1>
        <div
          onClick={() => openCart(!isCartOpen)}
          className='flex sm:mr-24 relative cursor-pointer'
        >
          <div
            style={{left: '15px', top: '-16px'}}
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
          <span className='font-semibold text-lg ml-3'>Cart</span>
        </div>
        <div className='hidden sm:block'>
          <button className='bg-gray-900 text-gray-100 rounded px-6 py-2'>
            Order by prescription
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
