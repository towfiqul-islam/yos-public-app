import React, {useContext} from 'react';
import AppContext from '../context/appContext';
import ConfirmModal from './ConfirmModal';
import MobileSearchOverlay from './MobileSearchOverlay';

import SecondaryNav from './SecondaryNav';

const OrderDetails = () => {
  const appContext = useContext(AppContext);
  const {isMobileSearchOpen} = appContext;
  // if (isMobileSearchOpen) {
  //   return (
  //     <div className=''>
  //       <MobileSearchOverlay />
  //     </div>
  //   );
  // } else {
  return (
    <>
      <div className={isMobileSearchOpen ? 'block sm:hidden' : 'hidden'}>
        <MobileSearchOverlay />
      </div>
      <div className={isMobileSearchOpen ? 'hidden sm:block' : 'block'}>
        {/* <ConfirmModal /> */}
        <SecondaryNav />
        <div className='sm:w-3/4 w-11/12 mx-auto'>
          <h2 className='text-center font-semibold text-gray-600 sm:text-2xl text-lg mt-10'>
            You have 5 items in your Cart
          </h2>
          <div className='flex justify-center items-center  mt-4 sm:w-3/4 w-11/12 sm:mx-auto'>
            <h3 className='font-medium text-lg sm:text-xl text-gray-800'>
              Cart value
            </h3>

            <h3 className='font-bold text-lg sm:text-2xl ml-10 bg-gray-900 text-gray-100 px-2 py-1 rounded'>
              360.00 Tk
            </h3>
          </div>
          <div className='mx-auto sm:w-3/4'>
            <h2 className='border-b-2 pb-2 font-bold border-gray-900 text-gray-700  inline-block mt-12 mb-6 '>
              Add delivery details
            </h2>
            <div className='mb-4'>
              <label className='block' htmlFor='name'>
                Name <span className='text-sm'>(required)</span>
              </label>
              <input
                className='border w-11/12 sm:w-2/3 mx-auto border-gray-600 px-2 py-2 rounded mt-2'
                type='text'
                id='name'
                name='name'
              />
            </div>
            <div className='mb-4'>
              <label className='block' htmlFor='phone'>
                Phone <span className='text-sm'>(required)</span>
              </label>
              <input
                className='border w-11/12 sm:w-2/3 mx-auto border-gray-600 px-2 py-2 rounded mt-2'
                type='text'
                id='phone'
                name='phone'
              />
            </div>
            <div className='mb-4'>
              <label className='block' htmlFor='address'>
                Address <span className='text-sm'>(Only in Dhanmondi)</span>
              </label>
              <textarea
                className='border w-11/12 sm:w-2/3 mx-auto border-gray-600 px-2 py-2 rounded mt-2'
                type='text'
                id='address'
                name='address'
                rows='5'
              />
            </div>
            <div className='mb-4'>
              <label className='block' htmlFor='address'>
                Additional notes <span className='text-sm'>(optional)</span>
              </label>
              <textarea
                className='border w-11/12 sm:w-2/3 mx-auto border-gray-600 px-2 py-2 rounded mt-2'
                type='text'
                id='address'
                name='address'
                rows='5'
              />
            </div>
            <div className='mb-4'>
              <label className='block' htmlFor='prescription'>
                Prescription <span className='text-sm'>(optional)</span>
              </label>
              <input className='mt-2' type='file' />
            </div>
            <div className='my-10 sm:w-2/3'>
              <button className='bg-gray-900 text-gray-100 px-8 py-2 rounded block mx-auto'>
                Confirm order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  // }
};

export default OrderDetails;
