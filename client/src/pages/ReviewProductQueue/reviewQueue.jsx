import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';

const ReviewQueue = () => {
const productqueue=useLoaderData()
const [reviewQueue,setreviewQueue] = useState(productqueue)
console.log(reviewQueue);

// add review product to product database 
const addproductHandler = (id) =>{
const productData=reviewQueue?.find(data =>data._id==id)
console.log(productData);

fetch("https://server-pi-blush-73.vercel.app/product",{
    method:"POST",
    headers:{
        'content-type': 'application/json'
    },
    body : JSON.stringify(productData)
   })
    .then(res => res.json())

    .then (data => {
      if(data.insertedId)
       {
       toast.success('Prodect has been added')
       DeleteproductHandler(id);
       }
         
        })

}


// add reject product to reject database 

const rejectproductHandler = (id) =>{
    const productData=reviewQueue?.find(data =>data._id==id)
console.log(productData);

fetch("https://server-pi-blush-73.vercel.app/rejectedproduct",{
    method:"POST",
    headers:{
        'content-type': 'application/json'
    },
    body : JSON.stringify(productData)
   })
    .then(res => res.json())

    .then (data => {
      if(data.insertedId)
       {
       toast.success('Prodect has been rejected');
       DeleteproductHandler(id);
       }
         
        })

}

// Delete prodect from review database with rejectproductHandler 

const DeleteproductHandler = (id) => {
    
    fetch(`https://server-pi-blush-73.vercel.app/productqueue/${id}`,{
        method:"DELETE",
       
    })
    .then(res =>res.json())
    .then(data => 
        {
            if(data.deletedCount > 0)
        {
            fetch("https://server-pi-blush-73.vercel.app/productqueue")
            .then(res =>res.json())
            .then(data => {
                setreviewQueue(data)});
                console.log(data);
                toast.success("Prodect has been removed from review")
        }
        else{
            toast.error("Product has not been removed")
        }
    })
}

// add feature handler 
const addfeatureHandler = (id) =>{
  const PData=reviewQueue?.find(data =>data._id==id)
  const _id =id
  const name =PData.name;
  const email = PData.email;
  const photoURL = PData.photoURL;
  const Prodect_Name =PData.Prodect_Name;
  const Prodect_PhotoURL = PData.Prodect_PhotoURL;
  const Prodect_Description = PData.Prodect_Description;
  const Prodect_Tag = PData.Prodect_Tag;
  const like =[];
  const Prodect_Price = PData.Prodect_Price
  
  const productData = {_id,name,email,photoURL,Prodect_Name,Prodect_Description,Prodect_PhotoURL,Prodect_Tag,like,Prodect_Price };
  console.log(productData);
  
  fetch("https://server-pi-blush-73.vercel.app/feature",{
      method:"POST",
      headers:{
          'content-type': 'application/json'
      },
      body : JSON.stringify(productData)
     })
      .then(res => res.json())
  
      .then (data => {
        if(data.insertedId)
         {
         toast.success('Prodect has been added')
         addproductHandler(id);
         }
           
          })
  
  }



    return (
        <div className=''>
            <Helmet>
                
                <title>Review Queue</title>
                
            </Helmet>
              <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Product Img</th>
        <th>Product Name</th>
        <th>Description</th>
        <th>See Details</th>
        <th>Update</th>
        <th>Delete</th>
        <th>Likes</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        reviewQueue?.map(queue => (
            <tr key={queue._id}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div >
              <div className=" w-32 h-20">
                <img className='w-full h-20 rounded-lg' src={queue.Prodect_PhotoURL} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
         
          </div>
        </td>
        <td>
        <div>
              <div className="font-bold">Product Name:{queue.Prodect_Name}</div>
              <div className="text-sm opacity-70">User Name:{queue.name}</div>
            </div>
        </td>
        <td>
       
         <h1 className='w-52 font-medium'>
         {queue.Prodect_Description.slice(0,50)}......
         </h1>
        </td>
        <td>
        <Link  to={`/dashboard/reviewqueue/${queue._id}`}>
            <h1 className='font-semibold'>See Details</h1>
        </Link>
        </td>
        <td>
       
           <button> <h1 onClick={() => addproductHandler(queue._id)} className='font-semibold'>Accept</h1></button>
      
        </td>
        <td>
          <button>
            <h1 onClick={() => rejectproductHandler(queue._id)} className='font-semibold'>Reject</h1>
          </button>
        </td>
        <th>          
       <button>
       <h1 onClick={() => addfeatureHandler(queue._id)}className='font-semibold'>feature product</h1>  
       </button>    
        </th>
      </tr>
        ))
      }
    
    </tbody>
    {/* foot */}
   
    
  </table>
     {/* <div className='grid grid-cols-4 gap-4 mt-2'>
        {
            reviewQueue?.map(queue => (
                <div key={queue._id} className='bg-white shadow-2xl p-2 rounded-md'>
                    <div className='shadow-lg'>
                        <img className='w-full h-40' src={queue.Prodect_PhotoURL} alt="" />
                    </div>
                    <div className='mt-2'>
                        <div className='flex gap-2'>
                            <div className='w-[20%] h-12'>
                                <img className='rounded-full' src={queue.photoURL} alt="" />
                            </div>
                            <div className='w-[80%]'>
                                <h1 className='text-lg font-bold'>{queue.Prodect_Name}</h1>
                                <h1 className='text-sm font-semibold'>{queue.name}</h1>
                          
                            </div>
                        </div>
                        <div>
                           
                        <Link to={`/product/${queue._id}`}>
                             <button className='w-full h-12 border-2 border-[#A0E9FF] mt-2 rounded-md text-sm hover:bg-[#A0E9FF] hover:font-semibold  '>See Detail</button>
                             </Link>
                        </div>
                        <div className='flex gap-2'>
                        <button onClick={() =>addproductHandler(queue._id)} className='w-32 h-12 border-2 border-[#A0E9FF] mt-2 rounded-md text-sm hover:bg-[#A0E9FF] hover:font-semibold  '>Add Prodect</button>
                        <button onClick={() =>rejectproductHandler(queue._id)} className='w-32 h-12 border-2 border-[#A0E9FF] mt-2 rounded-md text-sm hover:bg-[#A0E9FF] hover:font-semibold  '>Reject Prodect</button>
                        </div>
                    </div>
                </div>
            ))
        }
       </div> */}
       <Toaster 
            position="top-right"
            reverseOrder={false}/>
        </div>
    )
}

export default ReviewQueue