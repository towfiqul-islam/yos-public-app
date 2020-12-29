import React, {useContext, useEffect, useState} from 'react';
import AppContext from '../../context/appContext';
import Footer from '../Footer';
import MobileSearchOverlay from '../MobileSearchOverlay';
import SecondaryNav from '../SecondaryNav';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {checkCarts, getPageNumbers} from '../../utils';
import history from '../../history';
import Card from './Card';
import MobileCard from './MobileCard';
import Skeleton from './Skeleton';
import MobileSkeleton from './MobileSkeleton';

const alphabets = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const Browse = () => {
  const arr = [];
  const {page} = useParams();
  const [data, setData] = useState(arr);
  const [count, setCount] = useState(0);
  const [filterVal, setFilterVal] = useState('');
  const appContext = useContext(AppContext);
  const {isMobileSearchOpen, isCartOpen, carts} = appContext;
  async function getMeds() {
    const get_count = await axios.get('/api/medicines/total_count');
    const res = await axios.get(`/api/medicines/browse_medicines/${page}`);
    setCount(get_count.data.total_count);
    setData(res.data);
    // console.log(res.data);
  }
  const page_numbers = getPageNumbers(count);
  const onPageClick = page => {
    if (filterVal !== '') {
      onFilter(filterVal);
      history.push(`/browse-medicines/page/${parseInt(page)}`);
    } else {
      history.push(`/browse-medicines/page/${parseInt(page)}`);
    }
  };
  const onFilter = async al => {
    setFilterVal(al);

    const res = await axios.get(
      `/api/medicines/browse_medicines_by_letter/${al}/${page}`,
    );
    const count = await axios.get(`/api/medicines/total_count_by_letter/${al}`);
    setData(res.data);
    // console.log(data);
    setCount(count.data.total_count);
  };
  useEffect(() => {
    if (filterVal !== '') {
      onFilter(filterVal);
    } else {
      getMeds();
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    // eslint-disable-next-line
  }, [page]);
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
          className='md:w-3/4 w-11/12 m-auto h-full'
        >
          <div className='md:w-2/3  my-4'>
            <h2 className='font-semibold md:text-xl text-gray-900 text-lg mb-4'>
              Browse medicines
            </h2>
            <div className='flex flex-wrap items-center bg-gray-800 px-4 rounded py-8'>
              {alphabets.map(al => (
                <p
                  onClick={() => onFilter(al)}
                  className={
                    filterVal === al
                      ? 'text-gray-100 px-2 py-1 mr-4 mb-4'
                      : `cursor-pointer bg-gray-200 px-2 py-1 mr-4 rounded mb-4`
                  }
                  key={al}
                >
                  {al}
                </p>
              ))}
              <p
                onClick={() => {
                  getMeds();
                  setFilterVal('');
                }}
                className='cursor-pointer underline text-white mr-4 rounded mb-4'
              >
                Show All
              </p>
            </div>
          </div>
          {Array.isArray(data) === true && data.length > 0 ? (
            <>
              <div className='mb-4'>
                <p className='border-gray-400 border-b inline-block pb-1 text-sm sm:text-base'>
                  Showing {page} - {page * 10} of {count} medicines
                </p>
              </div>
              <div className='flex flex-wrap gap-8'>
                {data.map(med => (
                  <div key={med.medicine_id}>
                    <Card med={med} inCart={checkCarts(med, carts)} />
                    <MobileCard med={med} inCart={checkCarts(med, carts)} />
                  </div>
                ))}
              </div>
              {
                <div className='mt-12'>
                  <p className='text-center mb-4 text-sm text-gray-600'>
                    Page {parseInt(page)} of {page_numbers.length}.
                  </p>
                  <div className='flex flex-wrap justify-center'>
                    <button
                      onClick={() => {
                        if (parseInt(page) > 1) {
                          onPageClick(parseInt(page) - 1);
                        }
                      }}
                      className='bg-gray-400 rounded px-2 py-1 mr-4'
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => {
                        if (parseInt(page) < page_numbers.length) {
                          onPageClick(parseInt(page) + 1);
                        }
                      }}
                      className='bg-gray-400 rounded px-2 py-1'
                    >
                      Next
                    </button>
                  </div>
                </div>
              }
            </>
          ) : (
            <>
              <Skeleton />
              <MobileSkeleton />
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Browse;
