import React from 'react';
import hero from '../../assets/Cover-2.png';
import hero2 from '../../assets/cover-4.png';
import {Fade} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import hero3 from '../../assets/Cover-5.jpg';

const Hero = () => {
  return (
    <div className=''>
      <div className='slide-container hidden md:block'>
        <Fade arrows={false}>
          <div className='each-fade'>
            <img src={hero} alt='banner-1' />
          </div>
          <div className='each-fade'>
            <img src={hero3} alt='banner-2' />
          </div>
        </Fade>
      </div>

      {/* Mobile Hero */}
      <div
        className='block md:hidden'
        style={{
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          position: 'relative',
          height: '60vh',

          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${hero2})`,
        }}
      >
        <div
          style={{
            top: '40%',
            left: '0%',
            transform: 'translate(-0%, -35%)',
            color: 'white',
          }}
          className='text-center absolute'
        ></div>
      </div>
    </div>
  );
};

export default Hero;
