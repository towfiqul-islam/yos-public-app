import React from 'react';

const Loading = () => {
  return (
    <div>
      <div className='top-0 left-0 fixed bg-black bg-opacity-75 z-10 h-screen w-full'></div>

      <div
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        className='fixed sm:w-1/3 w-11/12  pb-8 px-4 z-40 text-lg mx-auto bg-white text-gray-700  rounded'
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
          We are submitting your order. Do not refresh the page.
        </p>
      </div>
    </div>
  );
};

export default Loading;
