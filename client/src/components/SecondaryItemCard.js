import React, {useContext, useState} from 'react';
import AppContext from '../context/appContext';

const SecondaryItemCard = ({med}) => {
  const appContext = useContext(AppContext);
  const {addToCart, carts, calculateCartValue, onSearch} = appContext;
  const [qty, setQty] = useState(1);
  const onAddToCart = med => {
    for (const item of carts) {
      if (med.id === item.id) {
        console.log('Item already in the Cart');
        return;
      }
    }

    carts.push({
      ...med,
      quantity: parseInt(qty),
      price: med.unit_price * parseInt(qty),
    });
    addToCart(carts);
    calculateCartValue(carts);
    onSearch('');
  };

  const onChange = e => {
    if (!e.target.value) {
      setQty(1);
      med.price = med.unit_price;
      calculateCartValue(carts);
    } else {
      setQty(parseInt(e.target.value));
      med.price = med.unit_price * parseInt(e.target.value);
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
            <p className='mb-1 font-medium text-lg'>
              {!med.price ? med.unit_price : med.price} Tk
            </p>
            <input
              className='border-2 rounded border-gray-400 text-center px-1 sm:py-1 ml-2'
              type='number'
              min='1'
              max='9'
              step='1'
              placeholder='Qty'
              value={!qty ? 1 : qty}
              name='qty'
              onChange={onChange}
            />
          </div>
          <button
            onClick={() => onAddToCart(med)}
            className='bg-gray-900 text-gray-100 px-4 py-1 rounded text-sm'
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondaryItemCard;
