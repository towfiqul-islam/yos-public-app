import React, {useContext} from 'react';
import AppContext from '../context/appContext';
import Footer from './Footer';

import MobileSearchOverlay from './MobileSearchOverlay';

import SecondaryNav from './SecondaryNav';
const About = () => {
  const appContext = useContext(AppContext);
  const {
    isCartOpen,

    isMobileSearchOpen,
  } = appContext;

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
          <div className='mt-12'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              About Us
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              We are “YOS health”. YOS Health is founded with aspiring to be the
              world's best and affordable digital healthcare platform. When
              Health care systems get the touch of a digital wand, quality of
              life becomes much flourished. At YOS, we bring Patients, doctors,
              diagnoses, medicines, and health researchers Under one umbrella
              through our sophisticated systems needing just a touch of a
              finger. With a vision of 'Easing Health at Home'. Our integrated
              platform helps patients to call a doctor 24x7, get consulted,
              diagnosed with lab values, and medicine delivered home without
              even patients moving from their comfortable room. We use AI,
              Extensive data which boost our Healthcare Professionals' knowledge
              researching making life easier for patients.
            </p>
          </div>
          <div className='mt-12'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              Our services
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              We currently operate in Jhigatola and Dhanmondi area. At this
              moment, we are offering an online platform, using which, you can
              get any kind of medicine and health-related materials at your
              doorstep. Our services are only one click away. We delivered your
              goods within three hours without any delivery charge. Our
              customers’ best interests are our biggest priority.
            </p>
            <p className='sm:w-1/2  leading-8 mt-4'>
              Additional to which services we are providing right now, we will
              gradually add and enhance our services. We will keep increasing
              our coverage areas from Dhanmondi to the whole of Dhaka city and
              eventually, we will cover the whole of Bangladesh. Our services
              will not only be limited to medicine and health-related products,
              but we will also introduce online consultation services. We will
              provide consultancy services at the cheapest rate possible. We
              will implement an automated system where the patients can complete
              their various tests sitting at home. Our employees will collect
              the samples from home upon a service request by our customers.
              After that, we will perform the required tests and we will deliver
              the reports to our customers via email or deliver them to their
              home. In this way, a complete healthcare solution will be provided
              by YOS health.
            </p>
          </div>
          <div className='mt-12'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              Vision and Mission
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              YOS Health is founded with aspiring to be the world's best and
              affordable digital healthcare platform. When Health care systems
              get the touch of a digital wand, quality of life becomes much
              flourished. At YOS, we bring Patients, doctors, diagnoses,
              medicines, and health researchers Under one umbrella through our
              sophisticated systems needing just a touch of a finger. With a
              vision of 'Easing Health at Home'. Our integrated platform helps
              patients to call a doctor 24x7, get consulted, diagnosed with lab
              values, and medicine delivered home without even patients moving
              from their comfortable room. We use AI, Extensive data which boost
              our Healthcare Professionals' knowledge researching making life
              easier for patients.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;
