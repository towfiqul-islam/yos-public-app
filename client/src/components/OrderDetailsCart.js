import React from 'react';

const OrderDetailsCart = ({carts}) => {
  return (
    <div className='mx-auto flex justify-center my-8'>
      <table className='sm:w-1/4 w-11/12 pt-8'>
        <thead className='text-sm text-gray-800 '>
          <tr>
            <th className='px-2 py-1 border border-gray-300 font-normal'>
              Item name
            </th>
            <th className='px-2 py-1 border border-gray-300 font-normal'>
              Qty
            </th>
            <th className='px-2 py-1 border border-gray-300 font-normal'>
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {carts.map(item => (
            <tr className='text-center' key={item.medicine_id}>
              <td className='px-2 py-1 border  border-gray-300'>
                {item.trade_name}
              </td>
              <td className='px-2 py-1 border  border-gray-300'>
                {item.quantity}
              </td>
              <td className='px-2 py-1 border  border-gray-300'>
                {Math.round((item.price + Number.EPSILON) * 100) / 100}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetailsCart;
