import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';

const ManageCoupon = () => {
  const [coupondata,setcoupondata] = useState()

useEffect(() =>{
  fetch("https://server-pi-blush-73.vercel.app/coupon")
  .then(res => res.json())
  .then(data => setcoupondata(data))
})
console.log(coupondata);
const AddCouponHandler = (e) =>{
e.preventDefault();
const form = e.target;
const coupon = form.coupon.value;
const discount = form.discount.value;
const ExpireAt = form.ExpireAt.value;
const Data = {coupon,discount,ExpireAt}
console.log(Data);
fetch("https://server-pi-blush-73.vercel.app/coupon",{
      method:"POST",
      headers:{
          'content-type': 'application/json'
      },
      body : JSON.stringify(Data)
     })
      .then(res => res.json())
  
      .then (data => {
        if(data.insertedId)
         {
         return toast.success('Coupon has been added')
         }
           
          })


}



    return (
        <div className='mt-5'>
            <Helmet>
                
                <title>Manage Coupon</title>
                
            </Helmet>
           <div>
           <h1 className='text-3xl font-bold'>Add Coupon</h1>
             <form onSubmit={AddCouponHandler}>
                <div className='flex gap-2'>
                   <div className='mt-5 flex gap-3'>
                   <input className='w-[320px] h-12 px-5 border-2 border-[#a0e9ff] rounded-lg font-semibold focus:border-2 focus:outline-[#00A9FF] transition-transform' placeholder='Enter Coupon Name' name='coupon'/>
                    <input className='w-[320px] h-12 px-5 border-2 border-[#a0e9ff] rounded-lg font-semibold focus:border-2 focus:outline-[#00A9FF] transition-transform' placeholder='Discount Price' name='discount'/>
                    <input className='w-[320px] h-12 px-5 border-2 border-[#a0e9ff] rounded-lg font-semibold focus:border-2 focus:outline-[#00A9FF] transition-transform' placeholder='Enter Expire Date' name='ExpireAt'/>
                   </div>
                    <button type='submit' className='w-32 h-12 border-2 border-[#a0e9ff] rounded-xl mt-5 hover:bg-[#a0e9ff]  font-bold '>Add Coupon</button>
                </div>
             </form>
           </div>

             <div>
             <h1 className='text-3xl font-bold mt-10 pb-3 border-b-2 border-gray-400'>All Coupon</h1>
             <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Coupon</th>
        <th>Discount</th>
        <th>Expire Date</th>
        <th>Delete</th>
    
      </tr>
    </thead>
    <tbody>
   {
    coupondata?.map(data =>(
        
      <tr key={data._id} className='shadow-lg'>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
         
          <div>
            <div className="font-bold">{data.coupon}</div>
         
          </div>
        </div>
      </td>
      <td>
       
        <h1 className=" font-bold">{data.discount}</h1>
      </td>
      
      <td><h1  className=" font-bold">{data.ExpireAt}</h1></td>
      <td><button><h1  className=" font-bold">Delete</h1></button></td>
    
    </tr>
    ))
   }

 
    </tbody>
 
    
  </table>
             </div>
             <Toaster 
            position="top-right"
            reverseOrder={false}/>
        </div>
    )
}

export default ManageCoupon