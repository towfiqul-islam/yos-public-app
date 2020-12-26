import React from 'react';
import h1 from '../../assets/h1.PNG';
import h2 from '../../assets/h2.PNG';
import h3 from '../../assets/h3.PNG';
import h4 from '../../assets/h4.PNG';
import h5 from '../../assets/h5.PNG';
import h6 from '../../assets/h6.PNG';

const HowToOrder = () => {
  return (
    <div className='hidden sm:block sm:mt-24'>
      <div>
        <h2 className='text-center text-2xl font-medium uppercase leading-7 text-gray-700'>
          How to order from us
        </h2>
        <p className='text-center mt-2 text-gray-600'>
          Choose one of the options to order from us
        </p>
        <div className='flex justify-center gap-20 mt-12'>
          <div className='w-1/4'>
            <div>
              <div className='flex items-center'>
                <p className='bg-yellow-400 w-12 h-12 flex justify-center items-center rounded-full mr-6'>
                  1
                </p>
                <p className='text-lg w-5/6'>
                  Search the medicine you need and add it to cart
                </p>
              </div>
              <img
                className='ml-16 my-8 object-cover object-center border rounded'
                style={{
                  width: '200px',
                  height: '250px',
                }}
                src={h1}
                alt=''
              />
            </div>
            <div>
              <div className='flex items-center'>
                <p className='bg-yellow-400 w-12 h-12 flex justify-center items-center rounded-full mr-6'>
                  2
                </p>
                <p className='text-lg w-5/6'>
                  Fill the order form with proper info
                </p>
              </div>
              <img
                className='ml-16 my-8 object-cover object-center border rounded'
                style={{
                  width: '200px',
                  height: '250px',
                }}
                src={h2}
                alt=''
              />
            </div>
            <div>
              <div className='flex items-center'>
                <p className='bg-yellow-400 w-12 h-12 flex justify-center items-center rounded-full mr-6'>
                  3
                </p>
                <p className='text-lg w-5/6'>Review and submit your order</p>
              </div>
              <img
                className='ml-16 my-8 object-cover object-center border rounded'
                style={{
                  width: '200px',
                  height: '250px',
                }}
                src={h3}
                alt=''
              />
            </div>
          </div>
          <div className=' bg-gray-300 w-px'></div>
          <div className='w-1/4'>
            <div>
              <div className='flex items-center'>
                <p className='bg-yellow-400 w-12 h-12 flex justify-center items-center rounded-full mr-6'>
                  1
                </p>
                <p className='text-lg w-5/6'>
                  Click Order by prescription from the top nav
                </p>
              </div>
              <img
                className='ml-16 my-8 object-cover object-center border rounded'
                style={{
                  width: '200px',
                  height: '250px',
                }}
                src={h4}
                alt=''
              />
            </div>
            <div>
              <div className='flex items-center'>
                <p className='bg-yellow-400 w-12 h-12 flex justify-center items-center rounded-full mr-6'>
                  2
                </p>
                <p className='text-lg w-5/6'>
                  Upload the image of your prescription and Fill the order form
                </p>
              </div>
              <img
                className='ml-16 my-8 object-cover object-center border rounded'
                style={{
                  width: '200px',
                  height: '250px',
                }}
                src={h5}
                alt=''
              />
            </div>
            <div>
              <div className='flex items-center'>
                <p className='bg-yellow-400 w-12 h-12 flex justify-center items-center rounded-full mr-6'>
                  3
                </p>
                <p className='text-lg w-5/6'>Review and submit your order</p>
              </div>
              <img
                className='ml-16 my-8 object-cover object-center border rounded'
                style={{
                  width: '200px',
                  height: '250px',
                }}
                src={h6}
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToOrder;
