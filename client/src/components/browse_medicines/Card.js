import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AppContext from '../../context/appContext';
import {calculatePriceWithDiscount, discount, onAddToCart} from '../../utils';

const Card = ({med, inCart}) => {
  const appContext = useContext(AppContext);
  const {carts, addToCart, calculateCartValue} = appContext;
  return (
    <>
      <div
        style={{width: '200px', height: '350px'}}
        className='sm:block hidden  rounded shadow relative'
      >
        <img
          className='object-cover object-center'
          style={{
            width: '200px',
            height: '150px',
          }}
          src={
            med.image !== ''
              ? med.image
              : 'https://www.pharmamirror.com/wp-content/themes/fox/images/placeholder.jpg'
          }
          alt={med.trade_name}
        />
        <Link to={`/medicine-details/${med.medicine_id}`}>
          <h2
            className='font-semibold mb-2 mt-2 truncate px-2'
            style={{width: '200px'}}
          >
            {med.trade_name}
          </h2>
          <h2 className='mb-2 px-2' style={{width: '200px'}}>
            By {med.company_name}
          </h2>
          <h2 className='mb-2 font-medium px-2'>
            {Math.round(
              (calculatePriceWithDiscount(med.unit_price) + Number.EPSILON) *
                100,
            ) / 100}{' '}
            Tk{' '}
            <span className='line-through text-gray-500 text-xs mr-2 mb-2 inline-block'>
              {Math.round((med.unit_price + Number.EPSILON) * 100) / 100} Tk
            </span>
            <span className='text-xs bg-yellow-400 px-2 py-1 rounded inline-block'>
              Save {discount}%
            </span>
          </h2>
        </Link>
        <button
          onClick={() =>
            !inCart && onAddToCart(med, carts, addToCart, calculateCartValue, 1)
          }
          className={
            !inCart
              ? ' m-2 w-11/12 bg-gray-900 text-gray-100 px-2 py-1 rounded text-sm sm:block hidden absolute bottom-0'
              : ' m-2 w-11/12 bg-gray-300 text-gray-600 px-4 py-1 rounded text-sm cursor-default focus:outline-none sm:block hidden absolute bottom-0'
          }
        >
          {inCart ? 'In Cart' : 'Add To Cart'}
        </button>
      </div>
    </>
  );
};

export default Card;
