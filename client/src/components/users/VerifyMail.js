import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import history from '../../history';

const VerifyMail = () => {
  const {id} = useParams();
  const [verified, setVerified] = useState(false);

  async function verifyMail() {
    const res = await axios.put(`/api/users/verify-email/${id}`);
    if (res.data.msg === 'email verified') {
      setVerified(true);
    }
  }
  useEffect(() => {
    verifyMail();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {verified ? (
        <div className='flex justify-center items-center h-64'>
          <div>
            {' '}
            <h2 className='text-center text-green-600 text-base md:text-3xl'>
              Email verification successful
            </h2>
            <button
              onClick={() => {
                history.push('/login');
              }}
              className='block px-4 py-2 rounded text-gray-100 bg-gray-900 m-auto mt-8'
            >
              Login to the site
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className='top-0 left-0 fixed bg-black bg-opacity-75 z-40 h-screen w-full'></div>

          <div
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            className='fixed sm:w-1/3 w-11/12  pb-8 px-4 z-50 text-lg mx-auto bg-white text-gray-700  rounded'
          >
            <span className='mt-8 flex justify-center items-center'>
              <svg
                style={{
                  margin: 'auto',
                  background: 'none',
                  display: 'block',
                  shapeRendering: 'auto',
                }}
                width='128px'
                height='128px'
                viewBox='0 0 100 100'
                preserveAspectRatio='xMidYMid'
              >
                <rect x='17.5' y='30' width='15' height='40' fill='#0a0a0a'>
                  <animate
                    attributeName='y'
                    repeatCount='indefinite'
                    dur='1s'
                    calcMode='spline'
                    keyTimes='0;0.5;1'
                    values='18;30;30'
                    keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
                    begin='-0.2s'
                  ></animate>
                  <animate
                    attributeName='height'
                    repeatCount='indefinite'
                    dur='1s'
                    calcMode='spline'
                    keyTimes='0;0.5;1'
                    values='64;40;40'
                    keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
                    begin='-0.2s'
                  ></animate>
                </rect>
                <rect x='42.5' y='30' width='15' height='40' fill='#28292f'>
                  <animate
                    attributeName='y'
                    repeatCount='indefinite'
                    dur='1s'
                    calcMode='spline'
                    keyTimes='0;0.5;1'
                    values='20.999999999999996;30;30'
                    keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
                    begin='-0.1s'
                  ></animate>
                  <animate
                    attributeName='height'
                    repeatCount='indefinite'
                    dur='1s'
                    calcMode='spline'
                    keyTimes='0;0.5;1'
                    values='58.00000000000001;40;40'
                    keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
                    begin='-0.1s'
                  ></animate>
                </rect>
                <rect x='67.5' y='30' width='15' height='40' fill='#f0f0f0'>
                  <animate
                    attributeName='y'
                    repeatCount='indefinite'
                    dur='1s'
                    calcMode='spline'
                    keyTimes='0;0.5;1'
                    values='20.999999999999996;30;30'
                    keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
                  ></animate>
                  <animate
                    attributeName='height'
                    repeatCount='indefinite'
                    dur='1s'
                    calcMode='spline'
                    keyTimes='0;0.5;1'
                    values='58.00000000000001;40;40'
                    keySplines='0 0.5 0.5 1;0 0.5 0.5 1'
                  ></animate>
                </rect>
              </svg>
            </span>
            <p className='text-center sm:px-4 text-black sm:text-base text-sm mt-2 leading-6'>
              Email Verification on progress...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyMail;
