import React, {useContext} from 'react';
import AppContext from '../../context/appContext';
import MobileSearchOverlay from '../MobileSearchOverlay';
import SecondaryNav from '../SecondaryNav';
import Footer from '../Footer';

const User = () => {
  const appContext = useContext(AppContext);
  const {isMobileSearchOpen, isCartOpen} = appContext;
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
          className='sm:w-3/4 w-11/12 m-auto h-full'
        >
          <div className='flex justify-center'>
            <div style={{width: '200px'}} className='relative'>
              <img
                src='https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
                width='200px'
                height='200px'
                alt=''
              />
              <button
                style={{bottom: '100px', left: '10px'}}
                className='absolute bg-gray-100 text-gray-900 shadow px-4 py-1 rounded cursor-pointer'
              >
                Edit
              </button>
              <div className=''>
                <h2 className='text-center sm:text-2xl font-semibold'>
                  Towfiqul Islam
                </h2>
                <h2 className='text-center'>towfiqu@gmail.com</h2>
              </div>
            </div>
          </div>
          <div className='flex justify-between mt-10 sm:bg-gray-200 sm:border sm:border-gray-400 sm:shadow sm:px-8 sm:py-4 rounded'>
            <div className=''>
              <h2 className='sm:text-2xl text-sm'>User status</h2>
              <p className='font-bold text-gray-600 mt-1 text-base'>Active</p>
            </div>
            <div className=''>
              <h2 className='sm:text-2xl text-sm'>YOS wallet</h2>
              <p className='font-bold text-gray-600 mt-1 text-base'>0.00 Tk</p>
            </div>
            <div className=''>
              <h2 className='sm:text-2xl text-sm'>Total purchase</h2>
              <p className='font-bold text-gray-600 mt-1 text-base'>0.00 Tk</p>
            </div>
          </div>
          <div className='mt-12'>
            <h2 className='mb-8 sm:text-2xl text-base border-b border-gray-400 inline-block'>
              Update account
            </h2>
            <div>
              <label className='block mb-1' htmlFor='first_name'>
                First name
              </label>
              <input
                style={{width: '300px'}}
                className='border border-gray-400 rounded px-2 py-1'
                type='text'
              />
            </div>
            <div className='mt-4'>
              <label className='block mb-1' htmlFor='last_name'>
                Last name
              </label>
              <input
                style={{width: '300px'}}
                className='border border-gray-400 rounded px-2 py-1'
                type='text'
              />
            </div>
            <div className='mt-4'>
              <label className='block mb-1' htmlFor='phone'>
                Phone
              </label>
              <input
                style={{width: '300px'}}
                className='border border-gray-400 rounded px-2 py-1'
                type='text'
              />
            </div>
            <div className='mt-4'>
              <label className='block mb-1' htmlFor='address'>
                Address
              </label>
              <textarea
                style={{width: '300px'}}
                className='border border-gray-400 rounded'
                name=''
                id=''
                cols='30'
                rows='5'
              ></textarea>
            </div>
            <div className='mt-4'>
              <button
                style={{width: '300px'}}
                className='block w-full bg-gray-900 text-gray-100 py-2 rounded'
              >
                Update
              </button>
            </div>
          </div>
          <div className='mt-6'>
            <button className='text-red-700 font-medium underline'>
              Deactivate account
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
