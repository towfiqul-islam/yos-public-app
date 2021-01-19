import React, {useState} from 'react';
import axios from 'axios';

const EmailVerifyWarning = () => {
  const [mailSent, setMailSent] = useState(false);
  const verifyYourMail = async () => {
    const yos_user = JSON.parse(localStorage.getItem('yos_user'));
    const res = await axios.post(
      `/api/users/send-verification-mail/${yos_user.id}`,
      {
        user_email: yos_user.email,
      },
    );
    if (res.data.msg === 'Verification link sent!') {
      setMailSent(true);
    }
  };
  return (
    <div>
      {mailSent ? (
        <div className='flex justify-center bg-green-700 py-3'>
          <p className='text-gray-100'>Verification mail has been sent</p>
        </div>
      ) : (
        <div className='flex justify-center bg-gray-900 py-3'>
          <p className='text-gray-100'>You need to verify your email</p>
          <button
            onClick={verifyYourMail}
            className='ml-2 bg-gray-100 px-2 py-1 rounded inline-block text-sm font-medium'
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailVerifyWarning;
