import React, {useContext, useState} from 'react';
import AppContext from '../context/appContext';

const SecondaryItemCard = ({med, inCart}) => {
  const appContext = useContext(AppContext);
  const {addToCart, carts, calculateCartValue, onSearch} = appContext;
  let [qty, setQty] = useState(1);
  const [price, setPrice] = useState(med.unit_price);
  const onAddToCart = med => {
    for (const item of carts) {
      if (med.medicine_id === item.medicine_id) {
        console.log('Item already in the Cart');
        return;
      }
    }

    carts.push({
      ...med,
      item_name: med.trade_name,
      quantity: parseInt(qty),
      price: med.unit_price * parseInt(qty),
    });
    addToCart(carts);
    calculateCartValue(carts);
    // onSearch('');
  };

  const onChange = e => {
    if (!e.target.value) {
      setQty(1);
      // med.quantity = 1;
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
        // med.quantity = parseInt(e.target.value);
        med.price = price;
        calculateCartValue(carts);
      }
    }
  };

  const onQuantityClick = val => {
    if (val === 'inc' && qty < 100) {
      setQty(++qty);
      setPrice(med.unit_price * qty);
      // med.quantity = parseInt(e.target.value);
      med.price = price;
      calculateCartValue(carts);
    } else if (val === 'dec' && qty > 1) {
      setQty(--qty);
      setPrice(med.unit_price * qty);
      // med.quantity = parseInt(e.target.value);
      med.price = price;
      calculateCartValue(carts);
    }
  };
  return (
    <div>
      <div className='bg-gray-100 border-t border-gray-300 px-4 py-4'>
        <h2 className='font-semibold sm:text-lg mb-1'>
          {med !== undefined && med.trade_name}
        </h2>
        <p className='mb-2'>By {med !== undefined && med.company_name}</p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <p className='mb-1 font-medium  mr-4'>
              {Math.round((price + Number.EPSILON) * 100) / 100}{' '}
              <span className='font-normal'>Tk</span>
            </p>
            <button
              onClick={() => onQuantityClick('dec')}
              className='w-8 h-8 font-bold bg-gray-300 px-2'
            >
              -
            </button>
            <input
              className='text-center bg-yellow-300 h-8'
              type='number'
              min='1'
              max='100'
              step='1'
              placeholder='Qty'
              value={!qty ? 1 : qty}
              name='qty'
              onChange={onChange}
            />
            <button
              onClick={() => onQuantityClick('inc')}
              className='w-8 h-8 font-bold bg-gray-300 px-2'
            >
              +
            </button>
          </div>
          <button
            onClick={() => !inCart && onAddToCart(med)}
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
