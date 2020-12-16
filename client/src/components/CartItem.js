import React, {useContext, useState} from 'react';
import AppContext from '../context/appContext';

const CartItem = ({cart, index}) => {
  const appContext = useContext(AppContext);
  const {carts, calculateCartValue} = appContext;
  const [qty, setQty] = useState(cart.quantity);
  const onRemoveFromCart = index => {
    carts.splice(index, 1);

    calculateCartValue(carts);

    const storedCarts = JSON.parse(localStorage.getItem('carts'));
    // find the item in local storage then remove it
    for (const item of storedCarts) {
      if (item.id === cart.id) {
        const indexOfRemovedItem = storedCarts.indexOf(item);
        storedCarts.splice(indexOfRemovedItem, 1);
        localStorage.setItem('carts', JSON.stringify(storedCarts));
      }
    }
  };
  const onChange = e => {
    if (!e.target.value) {
      setQty(1);
      cart.price = cart.unit_price;
      cart.quantity = 1;
      calculateCartValue(carts);
      const storedCarts = JSON.parse(localStorage.getItem('carts'));
      // find the item in local storage then update it's value
      for (const item of storedCarts) {
        if (item.id === cart.id) {
          item.price = cart.unit_price;
          item.quantity = 1;
          localStorage.setItem('carts', JSON.stringify(storedCarts));
        }
      }
    } else {
      setQty(parseInt(e.target.value));
      cart.price = cart.unit_price * parseInt(e.target.value);
      cart.quantity = parseInt(e.target.value);
      calculateCartValue(carts);
      const storedCarts = JSON.parse(localStorage.getItem('carts'));
      // find the item in local storage then update it's value
      for (const item of storedCarts) {
        if (item.id === cart.id) {
          item.price = cart.unit_price * parseInt(e.target.value);
          item.quantity = parseInt(e.target.value);
          localStorage.setItem('carts', JSON.stringify(storedCarts));
        }
      }
    }
  };
  return (
    <div>
      <div className='m-auto flex justify-center mt-2 '>
        <div className='  border-b border-gray-300 px-4 py-3  w-11/12 '>
          <h1 className='font-semibold sm:text-lg text-base mb-1'>
            {cart !== undefined && cart.trade_name}
          </h1>
          <p className='mb-2'>By {cart !== undefined && cart.company_name}</p>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <p className='mb-1 font-medium text-lg'>
                {!cart.price ? cart.unit_price : cart.price} Tk
              </p>
              <input
                className='border-2 rounded border-gray-400 text-center px-1 sm:py-1 ml-2'
                type='number'
                min='1'
                max='9'
                step='1'
                placeholder='Qty'
                value={!qty ? 1 : cart.quantity}
                name='qty'
                onChange={onChange}
              />
            </div>
            <button
              onClick={() => onRemoveFromCart(index)}
              className='border-2 border-red-700 text-gray-900 px-4 py-1 rounded text-sm'
            >
              Remove
            </button>
          </div>
        </div>
      </div>{' '}
    </div>
  );
};

export default CartItem;
