import { HeartPulse } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ReportedProduct = () => {
    const[productData,setproductData] = useState([])
   console.log(productData);

    useEffect(()=>{
        fetch("https://server-pi-blush-73.vercel.app/report")
        .then(res => res.json())
        .then(data => setproductData(data))
        
    },[])
    console.log(productData);

    const DeleteReportHandler = (id) => {
        console.log(id);
    
        fetch(`https://server-pi-blush-73.vercel.app/report/${id}`,{
            method:"DELETE",
           
        })
        .then(res =>res.json())
        .then(data => 
            {
                if(data.deletedCount > 0)
            {
                fetch("https://server-pi-blush-73.vercel.app/report")
                .then(res =>res.json())
                .then(data => {
                    setproductData(data)});
                    console.log(data);
                    toast.success("Prodect has been removed from review")
                    DeleteproductHandler(id)
            }
            else{
                toast.error("Product has not been removed")
            }
        })
    }
    
    const DeleteproductHandler = (id) => {
        console.log(id);
    
        fetch(`https://server-pi-blush-73.vercel.app/product/${id}`,{
            method:"DELETE",
           
        })
        .then(res =>res.json())
        .then(data => 
            {
                if(data.deletedCount > 0)
            {
                fetch("https://server-pi-blush-73.vercel.app/product")
                .then(res =>res.json())
                .then(data => {
                    setproductData(data)});
                    console.log(data);
                    toast.success("Prodect has been removed from review")
            }
            else{
                toast.error("Product has not been removed")
            }
        })
    }
    
 
   
    return (
        <div className='items-center pl-12'>
            <Helmet>
                
                <title>Reported Product</title>
                
            </Helmet>

<div className="overflow-x-auto">
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
       
        <th>Delete</th>
        <th>Likes</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        productData?.map(queue => (
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
         {queue.Prodect_Description.slice(0,80)}...
         </h1>
        </td>
        <td>
        <Link  to={`/dashboard/myproduct/${queue._id}`}>
            <h1 className='font-semibold'>See Details</h1>
        </Link>
        </td>
      
        <td><button onClick={() => DeleteReportHandler(queue._id)} className='font-semibold'>Delete</button></td>
        <th>
          <div className='flex gap-2'>
          <h1>{queue.like.length}</h1> <HeartPulse color='red' />
          </div>
        </th>
      </tr>
        ))
      }
    
    </tbody>
    {/* foot */}
   
    
  </table>
</div>



      
       <Toaster 
            position="top-right"
            reverseOrder={false}/>
        </div>
    )
}



export default ReportedProduct