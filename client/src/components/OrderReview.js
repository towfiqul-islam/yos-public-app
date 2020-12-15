import React, {useContext, useEffect, useState} from 'react';
import AppContext from '../context/appContext';
import history from '../history';
import ConfirmModal from './ConfirmModal';
import MobileSearchOverlay from './MobileSearchOverlay';
import SecondaryNav from './SecondaryNav';

const OrderReview = () => {
  const appContext = useContext(AppContext);
  const {isMobileSearchOpen, isCartOpen} = appContext;

  const [confirm, setConfirm] = useState(false);

  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const orderInfos = JSON.parse(sessionStorage.getItem('orderInfo'));

    setOrderDetails(orderInfos);

    // eslint-disable-next-line
  }, []);

  const onSubmitOrder = () => {
    // send request to API
    // check for success
    // if success, remove order from sessionStorage and localStorage
    // show order received modal
    // else show something went wrong. Try later
    sessionStorage.removeItem('orderInfo');
    localStorage.removeItem('carts');
    setConfirm(true);
  };

  //   orderDetails&& const {orderDetails, carts, cartValue} = orderDetails2;

  return (
    <>
      <div className={isMobileSearchOpen ? 'block sm:hidden' : 'hidden'}>
        <MobileSearchOverlay />
      </div>
      <div className={isMobileSearchOpen ? 'hidden sm:block' : 'block'}>
        {confirm && <ConfirmModal />}
        <SecondaryNav />
        {Object.keys(orderDetails).length > 0 && (
          <div
            style={{
              maxHeight: isCartOpen && '88vh',
              overflowY: isCartOpen && 'hidden',
            }}
            className='sm:w-3/4 w-11/12 mx-auto'
          >
            <h2 className='text-center font-semibold text-gray-600 sm:text-2xl text-lg mt-10'>
              Here is your order details
            </h2>
            {/* Customer info */}
            <div className='flex justify-center sm:w-1/2 mx-auto bg-gray-200 py-6 px-4 mt-10'>
              <div className='mx-auto sm:w-3/4'>
                {' '}
                <div className='flex justify-center mb-8'>
                  <h3 className='font-semibold mr-2'>CUSTOMER INFO</h3>
                  <button
                    onClick={() => history.push('/order-details')}
                    className='border border-gray-700 bg-white px-2 text-sm rounded'
                  >
                    Edit
                  </button>
                </div>
                <div className='flex my-2'>
                  <p className='mr-2 text-gray-600'>Name: </p>
                  <p>{orderDetails.orderDetails.name}</p>
                </div>
                <div className='flex my-2'>
                  <p className='mr-2 text-gray-600'>Phone: </p>
                  <p>{orderDetails.orderDetails.phone}</p>
                </div>
                <div className='flex my-2'>
                  <p className='mr-2 text-gray-600'>Address: </p>
                  <p className=''>{orderDetails.orderDetails.address}</p>
                </div>
                <div className='flex my-2'>
                  <p className='mr-2 text-gray-600'>Additional Notes: </p>
                  <p>
                    {orderDetails.orderDetails.additional_notes === ''
                      ? 'N/A'
                      : orderDetails.orderDetails.additional_notes}
                  </p>
                </div>
                <div className='flex my-2'>
                  <p className='mr-2 text-gray-600'>Prescription: </p>
                  <p>
                    {orderDetails.orderDetails.prescription === ''
                      ? 'N/A'
                      : 'Uploaded'}
                  </p>
                </div>
              </div>
            </div>
            {/* Ordered items */}
            {orderDetails.carts && (
              <div className='flex justify-center sm:w-1/2 mx-auto bg-gray-200 py-6 px-4 mt-10'>
                <div>
                  {' '}
                  <div className='flex justify-center mb-8'>
                    <h3 className='font-semibold mr-2'>ORDERED ITEMS</h3>
                  </div>
                  {orderDetails.carts.map((cartItem, index) => (
                    <div key={index} className='mb-8'>
                      <div className='flex my-2'>
                        <div className='flex'>
                          <p className='mr-2'>{index + 1}.</p>
                          <p className='mr-2 text-gray-600'>Medicine: </p>
                        </div>
                        <p>{cartItem.trade_name}</p>
                      </div>
                      <div className='flex  my-2'>
                        <p className='mr-2 ml-5 text-gray-600'>Quantity: </p>
                        <p>{cartItem.quantity}</p>
                      </div>
                      <div className='flex my-2'>
                        <p className='mr-2 ml-5 text-gray-600'>Price: </p>
                        <p>{cartItem.price} Tk</p>
                      </div>
                    </div>
                  ))}
                  <p className=' font-semibold text-center mt-8 sm:text-xl'>
                    Total: {orderDetails.cartValue} Tk
                  </p>
                  {/* <p className='text-center mt-4 sm:text-base text-sm'>
                  ***YOU CAN UPDATE ORDER ITEMS FROM YOUR CART***
                </p> */}
                </div>
              </div>
            )}

            <div>
              <button
                onClick={onSubmitOrder}
                className='block mx-auto bg-gray-900 text-gray-100 py-2 px-8 mt-12 mb-20 rounded'
              >
                Submit order
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderReview;
