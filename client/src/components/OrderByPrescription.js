import React, {useContext} from 'react';
import AppContext from '../context/appContext';
import ConfirmModal from './ConfirmModal';
import MobileSearchOverlay from './MobileSearchOverlay';

import SecondaryNav from './SecondaryNav';

const OrderByPrescription = () => {
  const appContext = useContext(AppContext);
  const {isMobileSearchOpen, isCartOpen} = appContext;
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
        <div
          style={{
            maxHeight: isCartOpen && '88vh',
            overflowY: isCartOpen && 'hidden',
          }}
          className='sm:w-3/4 w-11/12 mx-auto'
        >
          <h2 className='text-center  text-gray-600 sm:text-xl text-base mt-10'>
            Upload your prescription and order. We'll do the rest.
          </h2>

          <div className='mb-4 mx-auto sm:w-3/4 mt-10'>
            <div className=''>
              <label
                className='inline-block border-b-2 pb-2 border-gray-700 text-gray-700 font-bold'
                htmlFor='prescription'
              >
                Upload Prescription{' '}
                <span className='text-sm font-semibold'>(required)</span>
              </label>
              <input className='mt-4 block' type='file' />
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
                name='additional_notes'
                rows='5'
              />
            </div>
          </div>

          <div className='mx-auto sm:w-3/4'>
            <h2 className='border-b-2 pb-2 font-bold border-gray-900 text-gray-700  inline-block mt-5 mb-6 '>
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
                name='name'
              />
            </div>
            <div className='mb-4'>
              <label className='block' htmlFor='phone'>
                Phone <span className='text-sm font-semibold'>(required)</span>
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
                Address{' '}
                <span className='text-sm font-semibold'>
                  (Home delivery only in Dhanmondi)
                </span>
              </label>
              <textarea
                className='border w-11/12 sm:w-2/3 mx-auto border-gray-600 px-2 py-2 rounded mt-2'
                type='text'
                id='address'
                name='address'
                rows='5'
              />
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

export default OrderByPrescription;
