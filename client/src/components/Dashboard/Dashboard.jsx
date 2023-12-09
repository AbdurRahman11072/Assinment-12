import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const Dashboard = () => {

    const[productData,setproductData] = useState([])
    const {user,loading} = useContext(AuthContext)
    const[reportData,setreportData] = useState()
    const [productqueue,setproductqueue] =useState()
    const [Access,setAccess] = useState();
    useEffect(() =>{
        fetch("https://server-pi-blush-73.vercel.app/user")
        .then(res =>res.json())
        .then(data =>{
            const filterdata = data.find(data =>data.email==user?.email)          
            setAccess(filterdata?.access)
        })
    },[loading])
 
     useEffect(()=>{
         fetch("https://server-pi-blush-73.vercel.app/product")
         .then(res => res.json())
         .then(data => {
           if(Access=="user")
           {
             const filter = data?.filter(data =>data.email == user?.email)
           setproductData(filter)
           }
           else{
             setproductData(data)
           }
         })
         

       
         
     },[])
     useEffect(() =>{
        fetch("https://server-pi-blush-73.vercel.app/report")
         .then(res => res.json())
         .then(data => setreportData(data))
     },[])
     useEffect(() =>{
        fetch("https://server-pi-blush-73.vercel.app/productqueue")
        .then(res => res.json())
        .then(data => setproductqueue(data))
     },[])
    return (
        <div className='py-10 pl-5'>
            <div className='flex gap-8'>
                <div className='w-[35%] h-52 bg-[#A0E9FF] shadow-2xl rounded-xl'>
                    <h1 className='text-3xl font-bold text-center  py-5'>Total Product</h1>
                    <h1 className='text-5xl font-bold text-center mt-5'>{productData?.length}</h1>
                </div>
             {
                Access=="User"?   <div className='w-[35%] h-52 bg-[#A0E9FF] shadow-2xl  rounded-xl'>
                <h1 className='text-3xl font-bold text-center  py-5'>Total like</h1>
                <div className='flex gap-2 items-center justify-center'>
                <h1 className='text-5xl font-bold text-center mt-5'>0 </h1>
                <FontAwesomeIcon icon={faHeart} className='text-red-600 text-4xl mt-5'></FontAwesomeIcon>
                </div>
            </div>
            :
            <div className='w-[35%] h-52 bg-[#A0E9FF] shadow-2xl rounded-xl '>
            <h1 className='text-3xl font-bold text-center  py-5'>Product Pending</h1>
            <div className='flex gap-2 items-center justify-center'>
            <h1 className='text-5xl font-bold text-center mt-5'>{productqueue?.length} </h1>
            
            </div>
        </div>
             }
               {
                Access=="User"?
                 <div className='w-[35%] h-52 bg-[#A0E9FF] shadow-2xl rounded-xl'>
                <h1 className='text-3xl font-bold text-center  py-5'>Total Earning</h1>
               <div className='flex gap-2 items-center justify-center'>
               <h1 className='text-5xl font-bold text-center mt-5'>00 </h1>
                <span className='text-4xl mt-5 font-bold'>$</span>
               </div>
            </div>
            : 
            <div className='w-[35%] h-52 bg-[#A0E9FF] shadow-2xl rounded-xl'>
                <h1 className='text-3xl font-bold text-center  py-5'>Total Report</h1>
               <div className='flex gap-2 items-center justify-center'>
               <h1 className='text-5xl font-bold text-center mt-5'>{reportData?.length} </h1>
                
               </div>
            </div>
               }
               
            </div>
        </div>
    )
}

export default Dashboard