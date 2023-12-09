import React from 'react';


const MyProductCards = ({productData}) => {



    return (
        <div className=''>
      <div className='grid grid-cols-4 gap-4 mt-2'>
        {
            productData?.map(queue => (
                <div key={queue._id} className='bg-white shadow-2xl p-2 rounded-md'>
                    <div className='shadow-lg'>
                        <img className='w-full h-[160px]' src={queue.Prodect_PhotoURL} alt="" />
                    </div>
                    <div className='mt-2'>
                        <div className='flex gap-2'>
                            <div className='w-[20%] h-12'>
                                <img className='rounded-full' src={queue.photoURL} alt="" />
                            </div>
                            <div className='w-[80%]'>
                                <h1 className='text-lg font-bold'>{queue.Prodect_Name}</h1>
                                <h1 className='text-sm font-semibold'>Total like: {queue?.like?.length}</h1>
                          
                            </div>
                        </div>
                        <div>
                            <Link  to={`/product/${queue._id}`}>
                            <button className='w-full h-12 border-2 border-[#A0E9FF] mt-2 rounded-md text-sm hover:bg-[#A0E9FF] hover:font-semibold  '>See Details</button>
                            </Link>
                           
                    
                        </div>
                        <div className='flex gap-2'>
                        <Link to={`/dashboard/updateproduct/${queue._id}`}>
                             <button className='w-32 h-12 border-2 border-[#A0E9FF] mt-2 rounded-md text-sm hover:bg-[#A0E9FF] hover:font-semibold  ' >Update Product</button>
                             </Link>
                        <button onClick={() => DeleteproductHandler(queue._id)} className='w-32 h-12 border-2 border-[#A0E9FF] mt-2 rounded-md text-sm hover:bg-[#A0E9FF] hover:font-semibold  '>Delete Product</button>
                        </div>
                    </div>
                </div>
            ))
        }
       </div>
        </div>
        
    )
}

export default MyProductCards