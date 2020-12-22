import React, {useContext, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import AppContext from '../context/appContext';
import MobileSearchOverlay from './MobileSearchOverlay';
import SecondaryNav from './SecondaryNav';
import axios from 'axios';
import {
  calculatePriceWithDiscount,
  discount,
  checkCarts,
  onAddToCart,
} from '../utils';

const MedicineDetails = () => {
  const {id} = useParams();
  const [med, setMed] = useState({});
  const appContext = useContext(AppContext);
  const {
    isMobileSearchOpen,
    isCartOpen,
    addToCart,
    carts,
    calculateCartValue,
  } = appContext;

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
    if (val === 'inc' && qty < 100 && !checkCarts(med, carts)) {
      setQty(++qty);
      setPrice(med.unit_price * qty);

      med.price = price;
      calculateCartValue(carts);
    } else if (val === 'dec' && qty > 1 && !checkCarts(med, carts)) {
      setQty(--qty);
      setPrice(med.unit_price * qty);

      med.price = price;
      calculateCartValue(carts);
    }
  };

  async function getMedicineDetails(id) {
    const res = await axios.get(`/api/medicines/details/${id}`);
    setMed(res.data.data);
    setPrice(res.data.data.unit_price);
  }
  useEffect(() => {
    getMedicineDetails(id);

    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className={isMobileSearchOpen ? 'block sm:hidden' : 'hidden'}>
        <MobileSearchOverlay />
      </div>
      <div className={isMobileSearchOpen ? 'hidden sm:block' : 'block'}>
        <SecondaryNav />
        <div
          style={{
            maxHeight: isCartOpen && '88vh',
            overflowY: isCartOpen && 'hidden',
          }}
          className='sm:w-3/4 w-11/12 mx-auto'
        >
          <div className='mt-12 flex flex-wrap  mx-auto'>
            <img
              width='300'
              height='auto'
              style={{
                maxWidth: '300px',
                height: 'auto',
              }}
              className='rounded shadow sm:mr-8 object-fit object-center'
              src={
                med.image !== ''
                  ? med.image
                  : 'https://www.pharmamirror.com/wp-content/themes/fox/images/placeholder.jpg'
              }
              alt=''
            />
            <div className='mt-8 sm:mt-0'>
              <h2 className='font-semibold text-gray-800 text-2xl'>
                {med !== undefined && med.trade_name}{' '}
                {med !== undefined && med.medicine_type}
                {med.over_the_counter === 'no' && (
                  <span className='ml-2 border border-gray-400 px-2 rounded font-normal text-base'>
                    {med.over_the_counter === 'no' && 'Rx'}
                  </span>
                )}
              </h2>
              <p className='mb-1 text-gray-700 text-lg'>
                {med !== undefined && med.generic_name}
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
              <div className='flex items-center'>
                <div className='flex items-center'>
                  <p className='mb-1  mr-4'>Quantity</p>
                  <button
                    onClick={() => onQuantityClick('dec')}
                    className='w-8 h-8 font-bold bg-gray-300 px-2'
                  >
                    -
                  </button>
                  {checkCarts(med, carts) ? (
                    <input
                      className='text-center h-8 focus:outline-none'
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
                      className='text-center h-8'
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
              </div>
              <button
                onClick={() =>
                  !checkCarts(med, carts) &&
                  onAddToCart(med, carts, addToCart, calculateCartValue, qty)
                }
                className={
                  !checkCarts(med, carts)
                    ? ' bg-gray-900 text-gray-100 px-8 py-2 rounded text-sm mt-4 inline-block'
                    : ' bg-gray-300 text-gray-600 px-12 py-2 rounded text-sm cursor-default focus:outline-none mt-4 inline-block'
                }
              >
                {checkCarts(med, carts) ? 'In Cart' : 'Add To Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineDetails;
