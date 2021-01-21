import React, {useContext, useState, useEffect} from 'react';
import AppContext from '../../context/appContext';
import history from '../../history';

import axios from 'axios';

import MobileSearchOverlay from '../MobileSearchOverlay';

import SecondaryNav from '../SecondaryNav';
import Footer from '../Footer';
import {setAuthToken, validateAddress, validatePhone} from '../../utils';

const OrderByPrescription = () => {
  const appContext = useContext(AppContext);
  const {
    isMobileSearchOpen,
    isCartOpen,
    isAlertOpen,
    setAlert,
    addToCart,
    user,
  } = appContext;
  const [file, setFile] = useState('');
  const [orderDetails, setOrderDetails] = useState({
    customer_name: `${user.first_name} ${user.last_name}`,
    customer_phone: '',
    customer_address: '',
    customer_additional_notes: '',
    customer_prescription: '',
    blueberry: '',
  });

  const {
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
    const token = localStorage.getItem('token');
    if (localStorage.token) {
      delete axios.defaults.headers.common['x-auth-token'];
    }
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/yos/image/upload',
      formData,
    );
    setOrderDetails({
      ...orderDetails,
      customer_prescription: res.data.secure_url,
    });
    setAuthToken(token);
    setFile('');
  };
  const onConfirmOrder = () => {
    // check if input is valid
    if (
      customer_prescription !== '' &&
      customer_phone !== '' &&
      customer_address !== '' &&
      validatePhone(customer_phone) === 'Phone is valid' &&
      validateAddress(customer_address) === 'Address is valid' &&
      blueberry === ''
    ) {
      sessionStorage.setItem('orderInfo', JSON.stringify({orderDetails}));
      history.push('/user-order-review');
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };
  const onDeletePrescription = () => {
    setOrderDetails({...orderDetails, customer_prescription: ''});
    sessionStorage.setItem('orderInfo', JSON.stringify({orderDetails}));
  };
  useEffect(() => {
    if (!localStorage.token) {
      history.push('/login');
    }
    localStorage.removeItem('carts');
    // sessionStorage.removeItem('orderInfo');
    addToCart([]);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    const orderInfos = JSON.parse(sessionStorage.getItem('orderInfo'));

    if (orderInfos !== null) {
      const {orderDetails} = orderInfos;

      setOrderDetails({
        ...orderDetails,
        total_amount: 0,
        discount_percentage: 0,
        amount_after_discount: 0,
      });
    }

    if (user) {
      setOrderDetails({
        ...orderDetails,
        customer_phone: user.phone || '',
        customer_address: user.address || '',
      });
    }

    // eslint-disable-next-line
  }, [user]);
  return (
    <>
      <div className={isMobileSearchOpen ? 'block sm:hidden' : 'hidden'}>
        <MobileSearchOverlay />
      </div>
      <div className={isMobileSearchOpen ? 'hidden sm:block' : 'block'}>
        {/* {confirm && <ConfirmModal />} */}
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
          <h2 className='text-center  text-gray-700 sm:text-xl text-base mt-10'>
            Upload your prescription and order. We'll do the rest.
          </h2>

          <div className='mb-4 mx-auto sm:w-3/4 mt-10'>
            <div className=''>
              <label
                className='inline-block border-b-2 pb-2 border-gray-700 text-gray-700 font-bold'
                htmlFor='prescription'
              >
                Upload Prescription{' '}
                <span className='text-sm font-semibold'>
                  (required. only images are allowed)
                </span>
              </label>
              <input
                className='mt-4 block'
                type='file'
                onChange={onFileChange}
                accept='image/*'
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
            <div className='mb-4 mt-8'>
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
          </div>

          <div className='mx-auto sm:w-3/4'>
            <h2 className='border-b-2 pb-2 font-bold border-gray-900 text-gray-700  inline-block mt-5 mb-6 '>
              Add delivery details
            </h2>

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
                onChange={onChange}
              />
              {validatePhone(customer_phone) !== 'Phone is valid' && (
                <p className='text-red-700 text-xs italic w-11/12'>
                  Please provide a valid mobile number (e.g. +88017XXXXXXXX,
                  88017XXXXXXXX, 017XXXXXXXX)
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

            <input
              style={{display: 'none'}}
              className='appearance-none block w-full bg-white text-gray-700 border border-gray-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='blueBerry'
              name='blueBerry'
              onChange={onChange}
              value={blueberry}
              type='text'
            />

            {customer_prescription === '' && file !== '' ? (
              <div className='my-10 sm:w-2/3'>
                <button className='bg-gray-500 text-gray-300 px-8 py-2 rounded flex items-center mx-auto'>
                  Next <span className=' ml-2'>&#8594;</span>
                </button>
              </div>
            ) : (
              <div className='my-10 sm:w-2/3'>
                <button
                  onClick={onConfirmOrder}
                  className='bg-gray-900 text-gray-100 px-8 py-2 rounded flex items-center mx-auto'
                >
                  Next <span className=' ml-2'>&#8594;</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderByPrescription;
