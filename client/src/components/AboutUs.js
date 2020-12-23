import React, {useContext} from 'react';
import AppContext from '../context/appContext';
import Footer from './Footer';

import MobileSearchOverlay from './MobileSearchOverlay';

import SecondaryNav from './SecondaryNav';
const Home = () => {
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
          <div className='mt-8'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              Data Policy
            </h2>
            <p className='font-semibold text-gray-600 mt-2'>
              What data do we collect and why?
            </p>
            <p className='sm:w-1/2  leading-8 mt-2'>
              To provide the best possible service and to ensure a seamless
              experience, we have to collect information about our users. The
              amount of data we collect depends on how our users interact with
              our services.{' '}
            </p>

            <ul className='list-outside list-disc mt-4 sm:w-1/2  leading-8 ml-4'>
              <li className='mt-2 text-gray-900'>
                We collect the name, phone numbers, and addresses of users for
                home delivery and communication purposes.
              </li>
              <li className='mt-2 text-gray-900'>
                If customers want to register to our system, then we collect
                their email addresses too.
              </li>
              <li className='mt-2 text-gray-900'>
                If registered customers want to customize their profile, their
                profile pictures are also collected.
              </li>
              <li className='mt-2 text-gray-900'>
                We collect and store the history of orders such as which
                medicines have been ordered, the quantity of the ordered
                products.
              </li>
              <li className='mt-2 text-gray-900'>
                For the medicines that are not permissible to sell over the
                counter without prescriptions, we collect the images of
                prescriptions if the customers are willing to share them with
                us. However, for such medicines, the customers must have to show
                the prescriptions during delivery.
              </li>
              <li className='mt-2 text-gray-900'>
                We use this data to ensure a better and improved service to our
                customers.
              </li>
              <li className='mt-2 text-gray-900'>
                We also use data to provide a personalized user experience that
                is unique for every registered customer. Based on their
                personalized data, we lead them to a more robust healthcare
                system.
              </li>
              <li className='mt-2 text-gray-900'>
                We use these data for research purposes to generate important
                insights about the healthcare system. However, when the data are
                used for this purpose, they are used anonymously. No name, phone
                number, email is used for data analysis. The exact pinpoint
                address of a customer is also not used. However, the broader
                area of an address is used to create meaningful clusters of
                customers. For example, if a customer has an address 41/3A,
                Jhigatola, Dhanmondi, Dhaka, then the “Jhigatola” or “Dhanmondi”
                or “Dhaka” part of the address might be used.
              </li>
            </ul>
          </div>
          <div className='mt-12'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              Data protection and handling
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              As medical information is one of the most sensitive data and
              subject to the privacy, we do not use them in any other way except
              the usages mentioned above. We will provide the best possible
              protection for customers’ data. The accuracy of the collected
              data, as well as security for them, are ensured with the utmost
              importance. No data will be shared or given to any third party by
              any means. The registered customers can access their shared data
              through their respective panels. If there is any discrepancy with
              the data, they can always correct them through their personalized
              panel. And for the unregistered customers, they can correct their
              information by contacting us via email or phone.
            </p>
          </div>
          <div className='mt-12'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              Opt-out policy
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              Customers can opt-out of getting the services we provide any time
              they want. They can delete the data that they have shared at any
              time by contacting us. Customers’ data will be kept until they are
              necessary. When the data are no longer necessary, they will be
              removed from our databases or they will be removed upon the
              customers’ requests – whichever comes first. We will notify the
              customers whenever any change is made to our data policy. If a
              customer has any confusion about our data policy they can contact
              us through our hotline or email.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
