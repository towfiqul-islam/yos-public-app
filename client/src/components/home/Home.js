import React, {useContext, useState} from 'react';
import AppContext from '../../context/appContext';
import ItemCard from '../ItemCard';
import Nav from '../Nav';
import Hero from './Hero';
import MobileServices from './MobileServices';
import Services from './Services';

const Home = () => {
  const [toggleSearch, setToggleSearch] = useState(false);

  const appContext = useContext(AppContext);
  const {isCartOpen, openCart} = appContext;

  if (toggleSearch) {
    return (
      <div>
        <div
          onClick={() => setToggleSearch(!toggleSearch)}
          className='flex justify-center items-center  bg-gray-900 text-gray-100 py-2 mb-2'
        >
          Close Search
        </div>
        <div className='flex items-center justify-center'>
          <span className='block pl-4 py-4  border-t border-b border-gray-500'>
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
            className='sm:w-1/2 w-11/12 border-t border-b border-gray-500 px-4 py-4 focus:outline-none'
            type='text'
            placeholder='Search and order medicine'
          />
        </div>
        <div>
          <ItemCard />
          <ItemCard />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Nav />
        <div
          className={
            isCartOpen
              ? 'sm:w-3/4 w-11/12 mx-auto inset-0 fixed'
              : 'sm:w-3/4 w-11/12 m-auto'
          }
        >
          <Hero />
          <div className='sm:flex items-center justify-center mt-20 hidden'>
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
              className='sm:w-1/2 w-11/12 border-t border-b border-r border-gray-500 px-4 py-3 focus:outline-none'
              type='text'
              placeholder='Search and order medicine'
            />
          </div>
          {/* Mobile search */}
          <div className='sm:hidden flex items-center justify-center mt-20'>
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
              onClick={() => setToggleSearch(!toggleSearch)}
              className='sm:w-1/2 w-11/12 border-t border-b border-r border-gray-500 px-4 py-3 focus:outline-none'
              type='text'
              placeholder='Search and order medicine'
            />
          </div>
          <div className='hidden sm:block'>
            <ItemCard />
            <ItemCard />
          </div>
          <MobileServices />
          <Services />
        </div>
      </>
    );
  }
};

export default Home;
