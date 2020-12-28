import React, {useContext, useState} from 'react';
import {useEffect} from 'react';
import AppContext from '../context/appContext';
import history from '../history';
import axios from 'axios';

import MobileSearchOverlay from './MobileSearchOverlay';

import SecondaryNav from './SecondaryNav';
import {
  calculatePriceWithDiscount,
  discount,
  validateAddress,
  validateName,
  validatePhone,
} from '../utils';
import Footer from './Footer';
import OrderDetailsCart from './OrderDetailsCart';

const OrderDetails = () => {
  const [showItems, setShowItems] = useState(false);
  const appContext = useContext(AppContext);
  const {
    isMobileSearchOpen,
    isCartOpen,
    carts,
    cartValue,
    isAlertOpen,
    setAlert,
  } = appContext;

  const [file, setFile] = useState('');

  const percentageValue = (cartValue / 100) * discount;

  const [orderDetails, setOrderDetails] = useState({
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    customer_additional_notes: '',
    customer_prescription: '',
    total_amount: cartValue,
    discount_percentage: discount,
    amount_after_discount: cartValue - percentageValue,
    blueberry: '',
  });

  const {
    customer_name,
    customer_phone,
    customer_address,
    customer_additional_notes,
    customer_prescription,
    blueberry,
  } = orderDetails;

  const onChange = e => {
    setOrderDetails({...orderDetails, [e.target.name]: e.target.value});
  };

  const onFileChange = async e => {
    setFile(e.target.files[0]);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'yos-prescription');
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/yos/image/upload',
      formData,
    );
    setOrderDetails({
      ...orderDetails,
      customer_prescription: res.data.secure_url,
    });
    setFile('');
  };

  const onConfirmOrder = () => {
    const orderInfo = {
      carts: carts,
      orderDetails: orderDetails,
    };

    if (
      customer_name !== '' &&
      customer_phone !== '' &&
      customer_address !== '' &&
      validateName(customer_name) === 'Name is valid' &&
      validatePhone(customer_phone) === 'Phone is valid' &&
      validateAddress(customer_address) === 'Address is valid' &&
      blueberry === ''
    ) {
      sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo));
      history.push('/order-review');
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  const onDeletePrescription = () => {
    setOrderDetails({...orderDetails, customer_prescription: ''});

    const orderInfo = {
      carts: carts,
      orderDetails: orderDetails,
    };

    sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    const storedCarts = JSON.parse(localStorage.getItem('carts'));
    if (!storedCarts || storedCarts.length < 1) {
      history.push('/');
    } else {
      const orderInfos = JSON.parse(sessionStorage.getItem('orderInfo'));

      if (orderInfos !== null) {
        const {orderDetails} = orderInfos;

        setOrderDetails({
          ...orderDetails,
          total_amount: cartValue,
          amount_after_discount: cartValue - percentageValue,
        });
      }
    }

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
          {/* Show Alert */}
          {isAlertOpen && (
            <div
              className='w-11/12 sm:w-auto'
              style={{
                top: '0',
                left: '50%',
                position: 'fixed',
                transform: 'translate(-50%, 50%)',
              }}
            >
              <p className=' bg-yellow-400 px-1 sm:px-4 py-1 rounded shadow-lg text-center sm:font-semibold'>
                Please fill the order form properly!
              </p>
            </div>
          )}
          {/* Show Alert */}
          <div className='flex items-center justify-center mt-10'>
            <h2
              onClick={() => setShowItems(!showItems)}
              className='text-center font-normal text-gray-800 text-base sm:text-lg mr-2 cursor-pointer'
            >
              You have {carts.length === 1 ? '1 item' : `${carts.length} items`}{' '}
              in your Cart
            </h2>
            {showItems ? (
              <span
                className='cursor-pointer'
                onClick={() => setShowItems(!showItems)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24'
                  viewBox='0 0 24 24'
                  width='24'
                >
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path d='M7 14l5-5 5 5H7z' />
                </svg>
              </span>
            ) : (
              <span
                className='cursor-pointer'
                onClick={() => setShowItems(!showItems)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24'
                  viewBox='0 0 24 24'
                  width='24'
                >
                  <path d='M0 0h24v24H0V0z' fill='none' />
                  <path d='M7 10l5 5 5-5H7z' />
                </svg>
              </span>
            )}
          </div>
          {showItems && <OrderDetailsCart carts={carts} />}
          <div className='flex justify-center items-center  mt-4 sm:w-3/4 w-11/12 sm:mx-auto'>
            <h3 className='font-medium text-sm sm:text-xl text-gray-800'>
              Total
            </h3>

            <h3 className='font-bold text-base sm:text-2xl sm:ml-5 ml-2 bg-gray-900 text-gray-100 sm:px-2 px-1 py-1 rounded'>
              {Math.round(
                (calculatePriceWithDiscount(cartValue) + Number.EPSILON) * 100,
              ) / 100}{' '}
              Tk{' '}
            </h3>
            <span className='sm:text-base text-sm  text-gray-600 line-through inline-block ml-2'>
              {' '}
              {Math.round((cartValue + Number.EPSILON) * 100) / 100} Tk
            </span>
            <span className='bg-yellow-400 sm:px-2 px-1 py-1 rounded sm:text-sm text-xs ml-2'>
              Save {discount}%
            </span>
          </div>
          <div className='mx-auto sm:w-3/4'>
            <h2 className='border-b-2 pb-2 font-bold border-gray-900 text-gray-700  inline-block mt-12 mb-6 '>
              Add delivery details
            </h2>
            <div className='mb-4'>
              <label className='block' htmlFor='name'>
                Name <span className='text-sm font-semibold'>(required)</span>
              </label>
              <input
                className='border w-11/12 sm:w-2/3 mx-auto border-gray-600 px-2 py-2 rounded mt-2'
                type='text'
                id='name'
                name='customer_name'
                value={customer_name}
                required
                onChange={onChange}
              />
              {validateName(customer_name) !== 'Name is valid' && (
                <p className='text-red-700 text-xs italic'>
                  Please provide a proper name
                </p>
              )}
            </div>
            <div className='mb-4'>
              <label className='block' htmlFor='phone'>
                Phone <span className='text-sm font-semibold'>(required)</span>
              </label>
              <input
                className='border w-11/12 sm:w-2/3 mx-auto border-gray-600 px-2 py-2 rounded mt-2'
                type='text'
                id='phone'
                name='customer_phone'
                value={customer_phone}
                required
                onChange={onChange}
              />
              {validatePhone(customer_phone) !== 'Phone is valid' && (
                <p className='text-red-700 text-xs italic'>
                  Please provide a valid mobile number
                </p>
              )}
            </div>
            <div className='mb-4'>
              <label className='block' htmlFor='address'>
                Address{' '}
                <span className='text-sm font-semibold'>
                  (Home delivery only in Dhanmondi)
                </span>
              </label>
              <textarea
                className='border w-11/12 sm:w-2/3 mx-auto border-gray-600 px-2 py-2 rounded mt-2'
                type='text'
                id='address'
                name='customer_address'
                required
                value={customer_address}
                onChange={onChange}
                rows='5'
              />
              {validateAddress(customer_address) !== 'Address is valid' && (
                <p className='text-red-700 text-xs italic'>
                  Delivery location must be in Dhanmondi or Jhigatola
                </p>
              )}
            </div>
            <div className='mb-4'>
              <label className='block' htmlFor='additional_notes'>
                Additional notes{' '}
                <span className='text-sm font-semibold'>(optional)</span>
              </label>
              <textarea
                className='border w-11/12 sm:w-2/3 mx-auto border-gray-600 px-2 py-2 rounded mt-2'
                type='text'
                id='additional_notes'
                name='customer_additional_notes'
                value={customer_additional_notes}
                onChange={onChange}
                rows='5'
              />
            </div>
            <input
              style={{display: 'none'}}
              className='appearance-none block w-full bg-white text-gray-700 border border-gray-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='blueBerry'
              name='blueBerry'
              onChange={onChange}
              value={blueberry}
              type='text'
            />
            <div className='mb-4'>
              <label className='block' htmlFor='prescription'>
                Prescription{' '}
                <span className='text-sm font-semibold'>
                  (optional. only images are allowed)
                </span>
              </label>
              <input
                className='mt-2'
                type='file'
                accept='image/*'
                onChange={onFileChange}
                id='prescription'
              />
              {customer_prescription !== '' && (
                <div className='flex mt-4'>
                  <img
                    className='border border-gray-400 rounded'
                    width='64'
                    height='64'
                    src={customer_prescription}
                    alt=''
                  />
                  <span
                    onClick={onDeletePrescription}
                    className='inline-block h-full ml-2'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='20'
                      viewBox='0 0 24 24'
                      width='20'
                    >
                      <path d='M0 0h24v24H0V0z' fill='none' />
                      <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
                    </svg>
                  </span>
                </div>
              )}
              {customer_prescription === '' && file !== '' && (
                <div>
                  <svg
                    style={{
                      margin: '10px 0 0 10px',
                      background: 'none',
                      display: 'block',
                      shapeRendering: 'auto',
                    }}
                    width='64px'
                    height='64px'
                    viewBox='0 0 100 100'
                    preserveAspectRatio='xMidYMid'
                  >
                    <path
                      d='M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50'
                      fill='#0a0a0a'
                      stroke='none'
                    >
                      <animateTransform
                        attributeName='transform'
                        type='rotate'
                        dur='0.7s'
                        repeatCount='indefinite'
                        keyTimes='0;1'
                        values='0 50 51;360 50 51'
                      ></animateTransform>
                    </path>
                  </svg>
                </div>
              )}
            </div>
            {customer_prescription === '' && file !== '' ? (
              <div className='my-10 sm:w-2/3'>
                <button className='bg-gray-500 text-gray-300 px-8 py-1 rounded flex items-center  mx-auto'>
                  Next <span className='text-2xl ml-2'>&#8594;</span>
                </button>
              </div>
            ) : (
              <div className='my-10 sm:w-2/3'>
                <button
                  onClick={onConfirmOrder}
                  className='bg-gray-900 text-gray-100 px-8 py-1 rounded flex items-center mx-auto'
                >
                  Next <span className='text-2xl ml-2'>&#8594;</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
  // }
};

export default OrderDetails;
