import React, {useContext} from 'react';
import {useEffect} from 'react';
import AppContext from '../../context/appContext';
import Footer from '../Footer';

import MobileSearchOverlay from '../MobileSearchOverlay';

import SecondaryNav from '../SecondaryNav';
import Hero from './Hero';
// import HowToOrder from './HowToOrder';

import Services from './Services';
import ShowMeds from './ShowMeds';

const Home = () => {
  const appContext = useContext(AppContext);
  const {
    isCartOpen,

    isMobileSearchOpen,
  } = appContext;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={isMobileSearchOpen ? 'block md:hidden' : 'hidden'}>
        <MobileSearchOverlay />
      </div>
      <div className={isMobileSearchOpen ? 'hidden md:block' : 'block'}>
        <SecondaryNav />
        <div
          style={{
            maxHeight: isCartOpen && '88vh',
            overflowY: isCartOpen && 'hidden',
          }}
          className=' m-auto h-full'
        >
          <Hero />

          {/* Mobile search */}
          {/* <div className='sm:hidden flex items-center justify-center mt-10'>
            <span className='block pl-4 py-3 border-l border-t border-b border-gray-500'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='24'
                viewBox='0 0 24 24'
                width='24'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
              </svg>
            </span>
            <input
              onClick={() => toggleMobileSearch(!isMobileSearchOpen)}
              className='sm:w-1/2 w-11/12 border-t border-b border-r border-gray-500 px-4 py-3 focus:outline-none'
              type='text'
              placeholder='Search and order medicine'
            />
          </div> */}

          {/* <MobileServices /> */}
          <Services />
          {/* <HowToOrder /> */}
          <ShowMeds />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
