import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AppContext from '../../context/appContext';
import {calculatePriceWithDiscount, discount, onAddToCart} from '../../utils';

const Card = ({med, inCart}) => {
  const appContext = useContext(AppContext);
  const {carts, addToCart, calculateCartValue} = appContext;
  return (
    <Link to={`/medicine-details/${med.medicine_id}`}>
      <div className='sm:block hidden' style={{height: '320px'}}>
        <img
          className='object-cover object-center rounded shadow'
          style={{
            width: '150px',
            height: '120px',
          }}
          src={
            med.image !== ''
              ? med.image
              : 'https://www.pharmamirror.com/wp-content/themes/fox/images/placeholder.jpg'
          }
          alt={med.trade_name}
        />
        <h2 className='font-bold mb-2 mt-2' style={{width: '200px'}}>
          {med.trade_name}
        </h2>
        <h2 className='mb-2' style={{width: '200px'}}>
          By {med.company_name}
        </h2>
        <h2 className='mb-2 font-medium'>
          {Math.round(
            (calculatePriceWithDiscount(med.unit_price) + Number.EPSILON) * 100,
          ) / 100}{' '}
          Tk{' '}
          <span className='line-through text-gray-500 text-xs'>
            {Math.round((med.unit_price + Number.EPSILON) * 100) / 100} Tk
          </span>
          <span className='text-xs bg-yellow-400 px-2 py-1 rounded ml-2'>
            Save {discount}%
          </span>
        </h2>
        <button
          onClick={() =>
            !inCart && onAddToCart(med, carts, addToCart, calculateCartValue, 1)
          }
          className={
            !inCart
              ? ' bg-gray-900 text-gray-100 px-2 py-1 rounded text-sm'
              : ' bg-gray-300 text-gray-600 px-4 py-1 rounded text-sm cursor-default focus:outline-none'
          }
        >
          {inCart ? 'In Cart' : 'Add To Cart'}
        </button>
      </div>
    </Link>
  );
};

export default Card;
