import React, {useContext, useEffect} from 'react';
import AppContext from '../context/appContext';
import Footer from './Footer';

import MobileSearchOverlay from './MobileSearchOverlay';

import SecondaryNav from './SecondaryNav';
const Terms = () => {
  const appContext = useContext(AppContext);
  const {
    isCartOpen,

    isMobileSearchOpen,
  } = appContext;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    // eslint-disable-next-line
  }, []);

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
              Terms and conditions
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              These terms and conditions{' '}
              <strong>(“Terms and Conditions”)</strong> is a legal agreement
              between you - the user <strong>(“You(r)”</strong> or{' '}
              <strong>“User”</strong> or
              <strong>“customer”)</strong> and YOS Health (hereinafter{' '}
              <strong>“YOS”</strong>). (<strong>“YOS”, “We/us”</strong>) and
              governs your use of yos.com.bd website, owned and provided by YOS
              (hereinafter <strong>“YOS Platform”</strong> or{' '}
              <strong>“YOS”</strong>) and all products and services provided by
              YOS through YOS Platform. 
            </p>
          </div>
          <div className='mt-12'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              Products and services
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              This is a platform naming YOS that promises to deliver medicine
              and wellness/health related products and services at your
              doorsteps. You may purchase prescription medicines, over the
              counter medicines, and other health products by using this
              platform. You acknowledge and agree that YOS retains the right to
              constantly update and improve its services, including adding or
              removing functions, features, requirements, suspension, or
              stopping a Service altogether.  
            </p>
          </div>
          <div className='mt-12'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              Who can use this platform?
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              The customers of this platform must have to be at least 18 years
              of age. No user under 18 years can not use our services. If We
              learn that a person under 18 years of age has used or accessed the
              Platform or Service or any personally identifiable information has
              been collected on the Platform from persons under 18 years of age,
              then we will take the appropriate steps to delete this
              information. If You are a parent or guardian and discover that
              your child under 18 years of age has obtained an account on or
              otherwise access the Service, then You may alert us through our
              hotline or email.  
            </p>
          </div>
          <div className='mt-12'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              Registration
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              You do not need to register to our system to view the products or
              browse our system. You do not need to register to place an order
              either. You can just order products by giving your mailing
              address. However, you can register to our system. If you do that,
              a personalized username-password-protected system will be provided
              to you. In that case, you will be eligible for the special offers
              that we give. The offers that a user gets without registering to
              the system are also applicable for the registered users. The
              registered users are also subject to get their additional offers.
               
            </p>
          </div>
          <div className='mt-12'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              Prescription
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              For every over-the-counter medicine, a user must have to display a
              valid prescription. It can be done through our system or the user
              may choose to display the prescription during delivery. If a user
              agrees, our delivery man may take a picture of the prescription
              during the delivery process. If a user does not share or show a
              valid prescription against an over-the-counter medicine, we have
              the right to cancel the order immediately. Our delivery charge is
              free. However, in the event of order cancellation for not showing
              the prescription by the user during delivery, the user might be
              charged with 50tk as a delivery charge.  
            </p>
          </div>
          <div className='mt-12'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              Delivery
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              Our delivery charge is free in our covered area. Our covered areas
              primarily are Jhigatola and Dhanmondi. We also ensure an express
              delivery system. We will deliver the products in our covered areas
              within three hours. A user can also contact us over the phone and
              request the products to be delivered (immediately) on an emergency
              basis. We will try our best to deliver the goods as soon as
              possible for our customers’ best interest. Delivering within three
              hours is only applicable from 8:00 AM to 12:00 AM. The orders that
              have been received between 12:00 AM and 8:00 AM will be delivered
              within 11:00 AM. We highly discourage ordering the products from
              outside of our coverage areas. However, if a user wants his/her
              products to be delivered outside of our coverage area, a 50tk
              delivery charge will be applicable for Dhaka city. Three hours
              delivery will not be applicable in that case, rather, the products
              will be delivered within six hours. The policy for 12:00 AM to
              8:00 AM is also applicable for this case.  
            </p>
          </div>
          <div className='mt-12'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              Order Cancellation
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              A user can cancel his/her order if the delivery man is not already
              on the way to deliver the products. Orders can be canceled over
              the phone or from the respective user panel for the registered
              users. However, a user can not cancel his/her order while the
              delivery man is on the way; he/she must receive the products. We
              hold the right to cancel any order if any extraordinary
              circumstance arises. This includes unavailability of the products,
              not having prescriptions, products ordered by an individual with
              an age less than 18, etc.  
            </p>
          </div>
          <div className='mt-12'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              Return and refund policy
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              The products are subject to return if they have less than six
              months expiry date for the medicine counting from the day of
              delivery. Full refund is applicable for the returned products
              under the specified condition. In case of returning the products
              following the condition above, the appropriate refund is
              applicable. Currently, we are only accepting cash on delivery.
              Therefore, a refund for order cancellation is out of the question.
              In the future, this might change, and appropriate policy might be
              implemented.  
            </p>
          </div>
          <div className='mt-12'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              YOS point
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              Our registered customers will get bonus points based on their
              purchase. These bonus points are referred to as YOS points. The
              percentage of bonus may subject to vary. When the YOS point
              reaches a certain amount, the customers can cash out those to get
              a service or buy goods from our platform. Our registered customers
              can use YOS points to buy any promotional goods from any of our
              promotional partners. The amount on which the customers can cash
              out is also subject to vary.  
            </p>
          </div>
          <div className='mt-12'>
            <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
              Ownership of materials
            </h2>
            <p className='sm:w-1/2  leading-8 mt-4'>
              The YOS Platform, including all materials and software on it, or
              provided to you through it are protected by copyright, trademark,
              and other intellectual property rights and laws throughout the
              world and are owned by or are licensed to YOS. You are permitted
              to display the materials on your mobile on a computer screen
              and/or mobile screen and, save for restricted access documents, to
              download and print a hard copy for your personal use and for
              obtaining Services from us, provided you do not alter or remove
              any of the content or any part of the YOS Platform without our
              express permission to do so and that you do not change or delete
              any copyright, trademark, or other proprietary notices.
            </p>
            <p>You agree not to:</p>
            <ul className='list-outside list-disc mt-4 sm:w-1/2  leading-8 ml-4'>
              <li className='mt-2 text-gray-900'>
                copy, reproduce, store (in any medium or format), distribute,
                transmit, modify, create derivate works from all or any part of
                the YOS Platform or the materials or software on it, or provided
                to you through it without our prior written consent (which may
                be given or withheld in our absolute discretion);
              </li>
              <li className='mt-2 text-gray-900'>
                use the YOS Platform or any of the materials or software on it,
                or provided to you through it, for:
                <ul className='list-inside list-disc mt-4   leading-8 ml-4'>
                  <li className='mt-2 text-gray-900'>
                    any unlawful purpose or in contravention of applicable law;
                  </li>
                  <li className='mt-2 text-gray-900'>
                    commercial exploitation without our prior written consent;
                    and
                  </li>
                  <li className='mt-2 text-gray-900'>
                    any purpose or in any manner that may give a false or
                    misleading impression of us, our staff, or our services.
                  </li>
                </ul>
              </li>
              <li className='mt-2 text-gray-900'>
                use, upload, or transmit:
                <ul className='list-inside list-disc mt-4   leading-8 ml-4'>
                  <li className='mt-2 text-gray-900'>
                    any material that is defamatory, offensive, obscene or
                    otherwise unlawful, or which may cause offense or distress,
                    or which may affect or infringe the rights of any other
                    person;
                  </li>
                  <li className='mt-2 text-gray-900'>
                    any device, software, file, or mechanism which may interfere
                    with the proper operation of this website or our systems;
                  </li>
                </ul>
              </li>
              <li className='mt-2 text-gray-900'>
                establish a link to the YOS Platform from any other website,
                intranet, or extranet site without our prior written consent
              </li>
              <li className='mt-2 text-gray-900'>
                decompile, disassemble or reverse engineer (or attempt to do any
                of them) any of the software or other materials provided on or
                through the YOS Platform;
              </li>
              <li className='mt-2 text-gray-900'>
                do anything that may interfere with or disrupt the YOS Platform;
              </li>
              <li className='mt-2 text-gray-900'>
                encourage or permit others to do any of the above.
              </li>
            </ul>
            <p className='sm:w-1/2  leading-8 mt-4'>
              You further agree that you will not publicly criticize, disparage,
              call into disrepute, or otherwise defame or slander the YOS
              Platform or YOS and any of its officers, directors, members, or
              employees.
            </p>
            <p className='sm:w-1/2  leading-8 mt-4'>
              In the event that you do not comply with the above restrictions,
              any person affected by your actions may bring a claim against you.
              We will pursue a claim against you for any losses and costs
              (including legal costs) we may suffer as a result of your actions.
              In the event YOS has reasons to believe that you have indulged in
              any of the activities specified above, we reserve the right to
              immediately suspend or terminate your Account and restrict your
              access to the YOS Platform at our discretion. 
            </p>
            <div className='mt-12'>
              <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
                Site Disclaimer and availability
              </h2>
              <p className='sm:w-1/2  leading-8 mt-4'>
                You agree that your use of the YOS platform will be at your own
                risk. To the fullest extent permitted by law, YOS and its
                officers, members, employees, and agents disclaim all
                warranties, express, implied, statutory, or otherwise, and make
                no warranties or representations in connection with the YOS
                platform, the services offered on or through the YOS platform,
                any data, materials, content, relating to the quality,
                suitability, truth, accuracy, or completeness of any information
                or material contained or presented on the YOS platform. Unless
                otherwise explicitly stated, to the maximum extent permitted by
                applicable law, the YOS platform, the services offered on or
                through YOS platform, data, materials, submitted content, and
                any information or material contained or presented on YOS
                platform is provided to you “as-is”, “as available”, and
                “where-is” basis with no warranty, express or implied, of
                merchantability, fitness for a particular purpose, or
                non-infringement of third-party rights. YOS does not provide any
                warranty against errors, mistakes, or inaccuracies of data,
                content, information, materials, the substance of YOS platform,
                any unauthorized access to or use of our secure servers and/or
                any all personal information, and/or financial information
                stored therein, any bugs, viruses, trojan horses or the like
                which may be transmitted to or through the platform, any
                interruption or cessation of transmission to or from the
                platform, any defamatory, offensive, or illegal conduct of any
                third party or user, or any loss or damage of any kind incurred
                as a result of the use of any data, content, information,
                materials, the substance of the YOS platform or content posted,
                emailed, transmitted, or otherwise made available via the YOS
                platform. YOS does not endorse, warrant, or assume
                responsibility for any product or service advertised or offered
                by a third party through the YOS platform or featured in any
                advertisement. Nothing contained on the YOS platform should be
                construed as medical, commercial, legal, or other professional
                advice. Detailed professional; advice should be obtained before
                taking or refraining from any action based on any of the
                information or material contained on the YOS platform or any
                communication provided to you as a result of your registration
                or your order as a guest.
              </p>
            </div>
            <div className='mt-12'>
              <h2 className='text-xl sm:text-2xl font-medium text-gray-800'>
                Indemnification
              </h2>
              <p className='sm:w-1/2  leading-8 mt-4'>
                Users of this site agree to indemnify its owners, employees from
                and against all losses, expenses, damages, and costs, resulting
                from any violation of this Terms and Conditions (including
                negligent or wrongful conduct).
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Terms;
