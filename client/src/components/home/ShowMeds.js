import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Card from '../browse_medicines/Card';
import MobileCard from '../browse_medicines/MobileCard';
import {checkCarts} from '../../utils';
import AppContext from '../../context/appContext';
import {Link} from 'react-router-dom';
import Skeleton from '../browse_medicines/Skeleton';
import MobileSkeleton from '../browse_medicines/MobileSkeleton';

const ShowMeds = () => {
  const appContext = useContext(AppContext);
  const {carts} = appContext;
  const [meds, setMeds] = useState([]);
  async function getRandomMeds() {
    const res = await axios.get('/api/medicines/get-random-meds');
    setMeds(res.data);
  }
  useEffect(() => {
    getRandomMeds();
    // eslint-disable-next-line
  }, []);
  return (
    <div className='bg-gray-100 py-4'>
      <div className='md:w-3/4 w-11/12 m-auto my-4 '>
        <h2 className='uppercase font-semibold text-center sm:text-2xl text-xl sm:mt-12 mt-4 mb-1'>
          Order Medicines
        </h2>
        <p className='text-center mb-8 text-gray-800'>
          Order 100% authentic medicines from us
        </p>
        <div className='flex flex-wrap gap-8 '>
          {meds !== undefined && meds.length > 0 ? (
            meds.map(med => (
              <div key={med.medicine_id}>
                <Card med={med} inCart={checkCarts(med, carts)} />
                <MobileCard med={med} inCart={checkCarts(med, carts)} />
              </div>
            ))
          ) : (
            <>
              <Skeleton />
              <MobileSkeleton />
            </>
          )}
        </div>
        <div className='flex justify-center mt-8'>
          <Link
            className=' border border-gray-900 px-6 py-1 rounded'
            to='/browse-medicines/page/1'
          >
            See all
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowMeds;
