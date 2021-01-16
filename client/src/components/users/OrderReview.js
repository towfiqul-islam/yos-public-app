import React, {useContext, useEffect, useState} from 'react';
import AppContext from '../../context/appContext';
import history from '../../history';
import ConfirmModal from '../ConfirmModal';
import MobileSearchOverlay from '../MobileSearchOverlay';
import SecondaryNav from '../SecondaryNav';
import axios from 'axios';
import Loading from '../Loading';
import Footer from '../Footer';

const OrderReview = () => {
  const appContext = useContext(AppContext);
  const {
    isMobileSearchOpen,
    isCartOpen,
    setLoading,
    isLoading,
    user,
  } = appContext;

  const [confirm, setConfirm] = useState(false);

  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    const orderInfos = JSON.parse(sessionStorage.getItem('orderInfo'));

    setOrderDetails(orderInfos);

    // eslint-disable-next-line
  }, []);

  const onSubmitOrder = async () => {
    setLoading(true);

    const customerData = {
      user_id: user.id,
      additional_notes: orderDetails.orderDetails.customer_additional_notes,
      prescription: orderDetails.orderDetails.customer_prescription,
      total_amount: orderDetails.orderDetails.total_amount,
      discount_percentage: orderDetails.orderDetails.discount_percentage,
      amount_after_discount: orderDetails.orderDetails.amount_after_discount,
    };

    // Update user info
    if (user.phone === '' && user.address === null) {
      // Update user phone and address
      const data = {
        phone: orderDetails.orderDetails.customer_phone,
        address: orderDetails.orderDetails.customer_address,
      };
      await axios.put(`/api/users/update-account/${user.id}`, data);
    }

    const res = await axios.post('/api/users/add_order', customerData);

    if (res.status === 200 && orderDetails.carts) {
      for (const item of orderDetails.carts) {
        const data = {
          item_name: item.item_name,
          quantity: item.quantity,
          price: item.price,
          user_order_id: res.data.insertID,
        };
        await axios.post('/api/users/add_order_item', data);
      }
      // send mail
      // TODO: Setup mail for user
      //   const mailBody = {
      //     order_id: res.data.insertID,
      //     customer_name: orderDetails.orderDetails.customer_name,
      //     customer_phone: orderDetails.orderDetails.customer_phone,
      //     customer_address: orderDetails.orderDetails.customer_address,
      //     customer_prescription: orderDetails.orderDetails.customer_prescription,
      //     customer_additional_notes:
      //       orderDetails.orderDetails.customer_additional_notes,
      //     orderedItems: orderDetails.carts,
      //     total_amount: orderDetails.orderDetails.total_amount,
      //     discount_percentage: orderDetails.orderDetails.discount_percentage,
      //     amount_after_discount: orderDetails.orderDetails.amount_after_discount,
      //   };
      //   await axios.post('/api/guest/guest_order_mail', mailBody);
      setLoading(false);
      sessionStorage.removeItem('orderInfo');
      localStorage.removeItem('carts');
      setConfirm(true);
    } else if (res.status === 200 && !orderDetails.carts) {
      // TODO: Setup mail for user
      //   const mailBody = {
      //     order_id: res.data.insertID,
      //     customer_name: orderDetails.orderDetails.customer_name,
      //     customer_phone: orderDetails.orderDetails.customer_phone,
      //     customer_address: orderDetails.orderDetails.customer_address,
      //     customer_prescription: orderDetails.orderDetails.customer_prescription,
      //     customer_additional_notes:
      //       orderDetails.orderDetails.customer_additional_notes,
      //   };
      //   await axios.post('/api/guest/guest_order_mail', mailBody);
      setLoading(false);
      sessionStorage.removeItem('orderInfo');
      localStorage.removeItem('carts');
      setConfirm(true);
    }
  };

  useEffect(() => {
    const storedInSessions = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (!storedInSessions || Object.keys('orderInfo').length < 1) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, []);

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
                        history.push('/user-order-by-prescription');
                      } else {
                        history.push('/user-order-details');
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
                    {orderDetails.orderDetails.customer_prescription === '' ? (
                      'N/A'
                    ) : (
                      <a
                        className='text-blue-600 underline'
                        href={orderDetails.orderDetails.customer_prescription}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        View Prescription
                      </a>
                    )}
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
                    <div key={index} className='mb-8 flex'>
                      <div>
                        <div className='flex my-2'>
                          <div className='flex'>
                            <p className='mr-2'>{index + 1}.</p>
                            <p className='mr-2 text-gray-600'>Medicine: </p>
                          </div>
                          <p>
                            {cartItem.trade_name} {cartItem.medicine_type}
                          </p>
                        </div>
                        <div className='flex  my-2'>
                          <p className='mr-2 ml-5 text-gray-600'>Quantity: </p>
                          <p>{cartItem.quantity}</p>
                        </div>
                        <div className='flex my-2'>
                          <p className='mr-2 ml-5 text-gray-600'>Price: </p>
                          <p>
                            {Math.round(
                              (cartItem.price + Number.EPSILON) * 100,
                            ) / 100}{' '}
                            Tk
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div>
                    <h4 className='font-semibold text-xl text-gray-800'>
                      Total:{' '}
                      <span>
                        {Math.round(
                          (orderDetails.orderDetails.amount_after_discount +
                            Number.EPSILON) *
                            100,
                        ) / 100}{' '}
                        Tk
                      </span>
                      <span className='text-base font-normal text-gray-600 ml-4 line-through'>
                        {' '}
                        {Math.round(
                          (orderDetails.orderDetails.total_amount +
                            Number.EPSILON) *
                            100,
                        ) / 100}{' '}
                        Tk
                      </span>
                      <span className='font-normal text-sm inline-block bg-yellow-400 ml-2 px-2 py-1'>
                        Save {orderDetails.orderDetails.discount_percentage}%
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            )}

            <div>
              <p className='text-center mt-10'>
                By submitting order, you agree with our{' '}
                <a
                  className='underline'
                  href='/terms-and-conditions'
                  target='_blank'
                  rel='noopener noreferrer'
                >
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
      {orderDetails && Object.keys(orderDetails).length > 0 && <Footer />}
    </>
  );
};

export default OrderReview;
