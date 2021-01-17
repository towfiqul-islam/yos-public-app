import React, {useContext} from 'react';
import AppContext from '../context/appContext';
import history from '../history';
import {calculatePriceWithDiscount} from '../utils';
import CartItem from './CartItem';

const Cart = () => {
  const appContext = useContext(AppContext);
  const {
    isCartOpen,
    openCart,
    toggleMobileSearch,

    toggleMobileMenu,
    carts,

    cartValue,

    isAuthenticated,
  } = appContext;

  return (
    <div>
      <div
        className={`md:w-1/3 w-full  h-full bg-gray-100 top-0 right-0  fixed z-50 transition duration-300 transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        } shadow-lg overflow-y-auto`}
      >
        <span
          onClick={() => {
            openCart();
          }}
          className=' flex items-center cursor-pointer mt-5 ml-4'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            enableBackground='new 0 0 24 24'
            height='24'
            viewBox='0 0 24 24'
            width='24'
          >
            <rect fill='none' height='24' width='24' />
            <path d='M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z' />
          </svg>
          <h2 className='font-semibold sm:text-xl text-lg ml-5 text-gray-600'>
            You have {carts.length === 1 ? '1 item' : `${carts.length} items`}{' '}
            in your cart
          </h2>
        </span>{' '}
        <hr className='border-gray-500 mt-6' />
        {carts.length > 0 &&
          carts.map((cartItem, index) => (
            <CartItem
              key={cartItem.medicine_id}
              cart={cartItem}
              index={index}
            />
          ))}
        {carts.length > 0 && (
          <div className='flex justify-between sm:w-4/5 w-11/12 mx-auto mt-4'>
            <p className='text-lg sm:text-xl'>Total amount</p>
            <p className='font-bold text-lg sm:text-xl'>
              {Math.round(
                (calculatePriceWithDiscount(cartValue) + Number.EPSILON) * 100,
              ) / 100}{' '}
              TK
            </p>
          </div>
        )}
        {carts.length > 0 && (
          <div>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  history.push('/user-order-details');
                } else {
                  history.push('/order-details');
                }
                openCart();
                toggleMobileSearch(false);
                toggleMobileMenu(false);
              }}
              className='block bg-gray-900 text-gray-100 px-8 py-2 text my-10 mx-auto rounded '
            >
              Proceed to order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
