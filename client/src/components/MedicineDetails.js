import React, {useContext, useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
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
import Footer from './Footer';
import DetailsSkeleton from './DetailsSkeleton';

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
    if (!e.target.value || parseInt(e.target.value) === 0) {
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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
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
            height: '95vh',
            overflowY: isCartOpen && 'hidden',
          }}
          className='sm:w-3/4 w-11/12  mx-auto'
        >
          <div className='mt-4  bg-gray-200 px-2 py-1 rounded inline-block'>
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              height='20'
              viewBox='0 0 24 24'
              width='20'
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' />
            </svg> */}
            <Link
              className='sm:text-base text-sm'
              to='/browse-medicines/page/1'
            >
              Back to browse
            </Link>
          </div>
          {Object.keys(med).length === 0 ? (
            <DetailsSkeleton />
          ) : (
            <div className='mt-6 flex flex-wrap  mx-auto'>
              <img
                width='300'
                height='250'
                style={{
                  width: '300px',
                  height: '250px',
                }}
                className='rounded shadow sm:mr-8 object-fit object-center'
                src={
                  med.image !== ''
                    ? med.image
                    : 'https://www.pharmamirror.com/wp-content/themes/fox/images/placeholder.jpg'
                }
                alt={med.image !== '' ? med.trade_name : 'placeholder'}
              />
              <div className='mt-8 sm:mt-0'>
                <h2 className='font-semibold text-gray-800 sm:text-2xl text-lg mb-2'>
                  {med !== undefined && med.trade_name}{' '}
                  {med !== undefined && med.medicine_type}
                  {med.over_the_counter === 'no' && (
                    <span className='ml-2 border border-gray-400 px-2 rounded font-normal text-base '>
                      {med.over_the_counter === 'no' && 'Rx'}
                    </span>
                  )}
                </h2>
                <p className='mb-2 text-gray-700 sm:text-lg text-sm'>
                  {med !== undefined && med.generic_name}
                </p>
                <p className='mb-2 text-gray-700 text-sm sm:text-base'>
                  By {med !== undefined && med.company_name}
                </p>

                <div className='mb-4'>
                  <span className='font-medium sm:text-xl text-lg text-gray-800'>
                    {Math.round(
                      (calculatePriceWithDiscount(price) + Number.EPSILON) *
                        100,
                    ) / 100}{' '}
                    Tk
                  </span>
                  <span className='sm:text-sm text-xs text-gray-600 line-through ml-2'>
                    {Math.round((price + Number.EPSILON) * 100) / 100} Tk
                  </span>
                  <span className='bg-yellow-400 px-2 py-1 rounded sm:text-sm text-xs ml-2'>
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
                        className='text-center w-16 h-8'
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
          )}
        </div>
      </div>
      {/* <div style={{height: '200px'}} className='w-full'></div> */}
      <Footer />
    </>
  );
};

export default MedicineDetails;
