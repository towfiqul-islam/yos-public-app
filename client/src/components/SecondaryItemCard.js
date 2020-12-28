import React, {useContext, useState} from 'react';

import AppContext from '../context/appContext';
import {calculatePriceWithDiscount, discount, onAddToCart} from '../utils';

const SecondaryItemCard = ({med, inCart}) => {
  const appContext = useContext(AppContext);
  const {addToCart, carts, calculateCartValue} = appContext;
  let [qty, setQty] = useState(1);
  const [price, setPrice] = useState(med.unit_price);

  const onChange = e => {
    if (!e.target.value) {
      setQty(1);

      setPrice(med.unit_price);
      med.price = price;
      calculateCartValue(carts);
    } else {
      if (parseInt(e.target.value) > 100) {
        setQty(100);
        setPrice(med.unit_price * 100);
        med.price = price;
        calculateCartValue(carts);
      } else {
        setQty(parseInt(e.target.value));
        setPrice(med.unit_price * parseInt(e.target.value));

        med.price = price;
        calculateCartValue(carts);
      }
    }
  };

  const onQuantityClick = val => {
    if (val === 'inc' && qty < 100 && !inCart) {
      setQty(++qty);
      setPrice(med.unit_price * qty);

      med.price = price;
      calculateCartValue(carts);
    } else if (val === 'dec' && qty > 1 && !inCart) {
      setQty(--qty);
      setPrice(med.unit_price * qty);

      med.price = price;
      calculateCartValue(carts);
    }
  };

  return (
    <div>
      <div className='bg-gray-100 border-t border-gray-300 px-4 py-4'>
        <a
          href={`/medicine-details/${med.trade_name}/${med.medicine_id}`}
          className='font-semibold sm:text-lg mb-1'
        >
          {med !== undefined && med.trade_name}

          {med.over_the_counter === 'no' && (
            <span className='ml-2 border border-gray-400 px-2 rounded font-normal text-base'>
              {med.over_the_counter === 'no' && 'Rx'}
            </span>
          )}
        </a>
        <p className='mb-1 text-gray-700'>
          {med !== undefined && med.medicine_type}
        </p>
        <p className='mb-2 text-gray-700'>
          By {med !== undefined && med.company_name}
        </p>
        <div className='mb-4'>
          <span className='font-medium text-xl text-gray-800'>
            {Math.round(
              (calculatePriceWithDiscount(price) + Number.EPSILON) * 100,
            ) / 100}{' '}
            Tk
          </span>
          <span className='text-sm text-gray-600 line-through ml-2'>
            {Math.round((price + Number.EPSILON) * 100) / 100} Tk
          </span>
          <span className='bg-yellow-400 px-2 py-1 rounded text-sm ml-2'>
            Save {discount}%
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <p className='mb-1  mr-4'>Quantity</p>
            <button
              onClick={() => onQuantityClick('dec')}
              className='w-8 h-8 font-bold bg-gray-300 px-2'
            >
              -
            </button>
            {inCart ? (
              <input
                style={{width: '50px'}}
                className='text-center w-16 h-8 focus:outline-none'
                type='number'
                min='1'
                max='100'
                step='1'
                placeholder='Qty'
                readOnly
                name='qty'
                value={qty}
              />
            ) : (
              <input
                className='text-center h-8 w-16'
                type='number'
                min='1'
                max='100'
                step='1'
                placeholder='Qty'
                value={!qty ? 1 : qty}
                name='qty'
                onChange={onChange}
              />
            )}

            <button
              onClick={() => onQuantityClick('inc')}
              className='w-8 h-8 font-bold bg-gray-300 px-2'
            >
              +
            </button>
          </div>
          <button
            onClick={() =>
              !inCart &&
              onAddToCart(med, carts, addToCart, calculateCartValue, qty)
            }
            className={
              !inCart
                ? ' bg-gray-900 text-gray-100 px-4 py-1 rounded text-sm'
                : ' bg-gray-300 text-gray-600 px-8 py-1 rounded text-sm cursor-default focus:outline-none'
            }
          >
            {inCart ? 'In Cart' : 'Add To Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondaryItemCard;
