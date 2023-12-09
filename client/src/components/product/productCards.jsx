import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCards = ({productData}) => {
    
   
    return (
        <div className='flex gap-6 flex-wrap container mx-auto '>
           {
            productData?.map(productData =>
                <Link to={`/product/${productData._id}`} key={productData._id}>
              
                <div  className='w-[300px]  group border-2 border-gray-100 rounded-lg overflow-hidden bg-white shadow-2xl'>
                <div className='relative'>
                   <div className='w-full overflow-hidden '>
                   <img  src={productData.Prodect_PhotoURL} alt="" className='w-[300px] h-48 group-hover:scale-110 transition-transform'/>
                   </div>
                    <div className='absolute top-2 right-2 text-2xl text-white px-2 pt-[5px] rounded-full  bg-[#CDF5FD]/60 hover:text-red-500'>
                    <FontAwesomeIcon icon={faHeart} />
                    </div>
                </div>
                <div className='mt-2  p-4 gap-3'>
                    <div className='flex  gap-2 mb-2'> 
                        <div className='flex-1 flex overflow-hidden gap-2 w-[100px]'>
                            <p className='bg-[#CDF5FD] p-2 rounded-md font-medium text-sm'>laptop</p>
                       
                            
                        </div>
                        <p className='text-2xl font-bold text-gray-600'>${productData.Prodect_Price}</p>
                    </div>
                    <p className='text-2xl font-bold mt-2'>{productData.Prodect_Name}</p>
                    <p className=' mt-2 h-[70px] text-sm'>{productData.Prodect_Description.slice(0,90)}...
                     <span className='font-bold'>see more</span></p>
                    <button className='w-32 h-12 border-2 border-[#A0E9FF] mt-2 rounded-md text-sm hover:bg-[#A0E9FF] hover:font-semibold  '>Add to Cart</button>
                </div>
            </div>
                  
            </Link>
                )
           }
        </div>
    )
}

export default ProductCards