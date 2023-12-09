import React from 'react';
import { Link } from 'react-router-dom';

const PrimePakage = () => {
   
    return (
        <div className='flex gap-5 mt-20  bg-[#A0E9FF] rounded-lg container mx-auto py-5 px-10 justify-center'>
            <div className=' py-5 bg-white px-10 rounded-lg'>
               <div>
                <li className='mb-7 text-lg font-medium'>Can Add Only 1 Product</li>
                <li className='mb-7 text-lg font-medium'>Can't Add Product on Feature Tab For Free</li>
                <li className='mb-7 text-lg font-medium'>No Extra Security</li>
                <li className='mb-7 text-lg font-medium'>limeted Support</li>
               </div>
               <button className='flex gap-2  h-12 items-center py-3 px-5 ml-5 font-semibold bg-[#A0E9FF] rounded-lg'>                           
             <p>Free</p>
             </button>
            </div>
            <div className=' py-5 bg-white px-10 rounded-lg'>
               <div>
                <li className='mb-7 text-lg font-medium'>Umlimeted Product Add</li>
                <li className='mb-7 text-lg font-medium'>Add You Product No Feature Tab For Free</li>
                <li className='mb-7 text-lg font-medium'>Get Extra Security</li>
                <li className='mb-7 text-lg font-medium'>Unlimeted Support</li>
               </div>
              <Link to="/dashboard/payment">
              <button className='flex gap-2  h-12 items-center p-3 ml-5  font-semibold bg-[#A0E9FF] rounded-lg'>                           
             Buy Prime Now
             </button></Link>
            </div>
        </div>
    )
}

export default PrimePakage