import React, {useContext, useEffect, useState} from 'react';
import AppContext from '../context/appContext';
import history from '../history';
import ConfirmModal from './ConfirmModal';
import MobileSearchOverlay from './MobileSearchOverlay';
import SecondaryNav from './SecondaryNav';
import axios from 'axios';
import Loading from './Loading';

const OrderReview = () => {
  const appContext = useContext(AppContext);
  const {isMobileSearchOpen, isCartOpen, setLoading, isLoading} = appContext;

  const [confirm, setConfirm] = useState(false);

  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const orderInfos = JSON.parse(sessionStorage.getItem('orderInfo'));

    setOrderDetails(orderInfos);

    // eslint-disable-next-line
  }, []);

  const onSubmitOrder = async () => {
    setLoading(true);

    setTimeout(async () => {
      const res = await axios.post(
        '/api/guest/add_order',
        orderDetails.orderDetails,
      );

      if (res.status === 200 && orderDetails.carts) {
        for (const item of orderDetails.carts) {
          const data = {
            item_name: item.item_name,
            quantity: item.quantity,
            price: item.price,
            order_id: res.data.insertID,
          };
          await axios.post('/api/guest/add_order_item', data);
        }
        // send mail
        const mailBody = {
          order_id: res.data.insertID,
          customer_name: orderDetails.orderDetails.customer_name,
          customer_phone: orderDetails.orderDetails.customer_phone,
          customer_address: orderDetails.orderDetails.customer_address,
          customer_prescription:
            orderDetails.orderDetails.customer_prescription,
          customer_additional_notes:
            orderDetails.orderDetails.customer_additional_notes,
          orderedItems: orderDetails.carts,
          total_amount: orderDetails.orderDetails.total_amount,
          discount_percentage: orderDetails.orderDetails.discount_percentage,
          amount_after_discount:
            orderDetails.orderDetails.amount_after_discount,
        };
        await axios.post('/api/guest/mail_test', mailBody);
        setLoading(false);
        sessionStorage.removeItem('orderInfo');
        localStorage.removeItem('carts');
        setConfirm(true);
      } else if (res.status === 200 && !orderDetails.carts) {
        const mailBody = {
          order_id: res.data.insertID,
          customer_name: orderDetails.orderDetails.customer_name,
          customer_phone: orderDetails.orderDetails.customer_phone,
          customer_address: orderDetails.orderDetails.customer_address,
          customer_prescription:
            orderDetails.orderDetails.customer_prescription,
          customer_additional_notes:
            orderDetails.orderDetails.customer_additional_notes,
          // orderedItems: orderDetails.carts,
          // total_amount: 0,
          // discount_percentage: 3,
          // amount_after_discount: 0,
        };
        await axios.post('/api/guest/mail_test', mailBody);
        setLoading(false);
        sessionStorage.removeItem('orderInfo');
        localStorage.removeItem('carts');
        setConfirm(true);
      }
    }, 2000);
  };

  //   orderDetails&& const {orderDetails, carts, cartValue} = orderDetails2;

  return (
    <>
      <div className={isMobileSearchOpen ? 'block sm:hidden' : 'hidden'}>
        <MobileSearchOverlay />
      </div>
      <div className={isMobileSearchOpen ? 'hidden sm:block' : 'block'}>
        {confirm && <ConfirmModal />}
        {isLoading && <Loading />}
        <SecondaryNav />
        {orderDetails && Object.keys(orderDetails).length > 0 && (
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
                    onClick={() => {
                      if (!orderDetails.carts) {
                        history.push('/order-by-prescription');
                      } else {
                        history.push('/order-details');
                      }
                    }}
                    className='border border-gray-700 bg-white px-2 text-sm rounded'
                  >
                    Edit
                  </button>
                </div>
                <div className='flex my-2'>
                  <p className='mr-2 text-gray-600'>Name: </p>
                  <p>{orderDetails.orderDetails.customer_name}</p>
                </div>
                <div className='flex my-2'>
                  <p className='mr-2 text-gray-600'>Phone: </p>
                  <p>{orderDetails.orderDetails.customer_phone}</p>
                </div>
                <div className='flex my-2'>
                  <p className='mr-2 text-gray-600'>Address: </p>
                  <p className=''>
                    {orderDetails.orderDetails.customer_address}
                  </p>
                </div>
                <div className='flex my-2'>
                  <p className='mr-2 text-gray-600'>Additional Notes: </p>
                  <p>
                    {orderDetails.orderDetails.customer_additional_notes === ''
                      ? 'N/A'
                      : orderDetails.orderDetails.customer_additional_notes}
                  </p>
                </div>
                <div className='flex my-2'>
                  <p className='mr-2 text-gray-600'>Prescription: </p>
                  <p>
                    {orderDetails.orderDetails.customer_prescription === ''
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
                  <p className=' font-semibold  text-center mt-8 sm:text-xl'>
                    <span className='font-normal'>Total:</span>{' '}
                    {orderDetails.orderDetails.total_amount}{' '}
                    <span className='font-normal text-base mr-4'>Tk</span>
                  </p>
                  <p className=' font-semibold  text-center mt-2 sm:text-xl'>
                    <span className='font-normal'>After </span>{' '}
                    {orderDetails.orderDetails.discount_percentage}%
                    <span className='font-normal'> Discount: </span>{' '}
                    {orderDetails.orderDetails.amount_after_discount}{' '}
                    <span className='font-normal text-base'>Tk</span>
                  </p>
                  {/* <p className='text-center mt-4 sm:text-base text-sm'>
                  ***YOU CAN UPDATE ORDER ITEMS FROM YOUR CART***
                </p> */}
                </div>
              </div>
            )}

            <div>
              <p className='text-center mt-10'>
                By submitting order, you agree with our{' '}
                <a className='underline' href='#!'>
                  Terms & Conditions
                </a>
              </p>
              <button
                onClick={onSubmitOrder}
                className='block mx-auto bg-gray-900 text-gray-100 py-2 px-8 mt-4 mb-20 rounded'
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
