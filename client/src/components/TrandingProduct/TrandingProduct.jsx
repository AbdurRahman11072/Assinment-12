import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TrandingProudct = () => {

    const[productData,setproductData] = useState();

    useEffect(()=>{
        fetch("https://server-pi-blush-73.vercel.app/product")
        .then(res => res.json())
        .then(data => {
            const sortdata =  data?.sort((a,b) =>b.like.length - a.like.length)
            setproductData(sortdata.slice(0,4));
            
            
        })
        
    },[])


    console.log(productData);



    return (
        <div className='my-16 justify-center'>
            <h1 className='text-4xl font-bold text-center'>---Tranding Product---</h1>

         <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  mt-12 mx-12 p-5  '>
           {
            productData?.map(productData =>
                
                
              
                <div  className='w-[300px]  group border-2 border-gray-100 rounded-lg overflow-hidden bg-white shadow-2xl' >
                <div className='relative'>
                <Link to={`/product/${productData._id}`} key={productData._id} >
                   <div className='w-full overflow-hidden '>
                   <img  src={productData.Prodect_PhotoURL} alt="" className='w-[300px] h-48 group-hover:scale-110 transition-transform'/>
                   </div>
                   </Link>
                    <div className='absolute top-2 right-2  items-center gap-2'>
                  
                    <div className='text-2xl text-white px-2 pt-[5px] rounded-full  bg-[#CDF5FD]/60 hover:text-red-500'>
                    <FontAwesomeIcon icon={faHeart} />
                    <p className='text-white text-md text-center font-bold'>{productData.like.length}</p>
                    </div>
                   
                    </div>
                </div>
                <Link to={`/product/${productData._id}`} >
                <div className='mt-2  p-4 gap-3'>
                    <div className='flex  gap-2 mb-2'> 
                        <div className='flex-1 flex overflow-hidden gap-2 w-[100px]'>
                        {
                            productData?.Prodect_Tag.map(data =>(
                                <p className='bg-[#CDF5FD] p-2 rounded-md font-medium text-sm'>{data}</p>
                            ))
                           }
                       
                            
                        </div>
                        <p className='text-2xl font-bold text-gray-600'>${productData.Prodect_Price}</p>
                    </div>
                    <p className='text-2xl font-bold mt-2'>{productData.Prodect_Name}</p>
                    
                </div>
                </Link>
            
            </div>
                  
          
                )
           }
        </div>
       </div>
    )
}

export default TrandingProudct