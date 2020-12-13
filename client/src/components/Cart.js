import React, {useContext} from 'react';
import AppContext from '../context/appContext';
import history from '../history';
import CartItem from './CartItem';

const Cart = () => {
  const appContext = useContext(AppContext);
  const {
    isCartOpen,
    openCart,
    toggleMobileSearch,
    isMobileSearchOpen,
  } = appContext;
  return (
    <div>
      <div
        className={`sm:w-1/3 w-full h-full bg-gray-100 top-0 right-0  fixed z-10 transition duration-300 transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        } shadow-lg overflow-y-auto`}
      >
        <span
          onClick={() => {
            openCart(!isCartOpen);
          }}
          className=' flex items-center cursor-pointer mt-5 ml-4'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24'
            viewBox='0 0 24 24'
            width='24'
          >
            <path d='M0 0h24v24H0V0z' fill='none' />
            <path d='M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z' />
          </svg>
          <h2 className='font-semibold sm:text-xl text-lg ml-5 text-gray-600'>
            You have 5 items in your cart
          </h2>
        </span>{' '}
        <hr className='border-gray-500 mt-6' />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <div>
          <button
            onClick={() => {
              history.push('/order-details');
              openCart(!isCartOpen);
              toggleMobileSearch(false);
            }}
            className='block bg-gray-900 text-gray-100 px-8 py-2 text my-10 mx-auto rounded '
          >
            Proceed to order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
