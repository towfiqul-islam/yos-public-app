import React from 'react';
import hero from '../../assets/hero-2.jpg';
import history from '../../history';

const Hero = () => {
  return (
    <div className=''>
      <div
        className='hidden sm:block'
        style={{
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative',
          height: '80vh',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${hero})`,
        }}
      >
        <div
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
          }}
          className='text-center absolute'
        >
          <h1 className='text-5xl text-black font-bold'>
            Pharmacy at your doorstep
          </h1>
          <p className='text-xl text-gray-100  font-medium w-3/4 text-center mx-auto mt-4 leading-8'>
            Search and order any medicine from us and get it delivered at your
            doorstep in less than 3 hours.
          </p>
          <p className='text-lg text-black   w-3/4 font-semibold text-center mx-auto mt-20'>
            Or just upload the prescription and we'll fill the order for you.
          </p>
          <button
            onClick={() => history.push('/order-by-prescription')}
            className='px-10 py-4 mt-8 text-lg tracking-wider font-medium bg-yellow-500 text-black uppercase shadow-xl rounded'
          >
            Upload prescription
          </button>
        </div>
      </div>
      {/* Mobile Hero */}
      <div
        className='block sm:hidden'
        style={{
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          position: 'relative',
          height: '80vh',
          background: '#DADADA',
        }}
      >
        <div
          style={{
            top: '50%',
            left: '0%',
            transform: 'translate(0%, -50%)',
            color: 'white',
          }}
          className='text-center absolute'
        >
          <h1 className='text-4xl text-black font-bold'>
            Pharmacy at your doorstep
          </h1>
          <p className='text-xl text-gray-900  w-11/12 text-center mx-auto mt-4 leading-8'>
            Search and order any medicine from us and get it delivered at your
            doorstep in less than 3 hours.
          </p>
          <p className='text-lg text-black w-11/12 font-semibold  mx-auto mt-20'>
            Or just upload the prescription and we'll fill the order for you.
          </p>
          <button
            onClick={() => history.push('/order-by-prescription')}
            className='px-8 py-4 mt-8 text tracking-wider font-medium bg-yellow-500 text-black uppercase shadow-xl rounded'
          >
            Upload prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
