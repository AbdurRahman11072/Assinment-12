import { HeartPulse } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const Myproduct = () => {
   const[productData,setproductData] = useState([])
   const {user,loading} = useContext(AuthContext)

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
    console.log(productData);

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
    
    const addfeatureHandler = (id) =>{
      const PData=productData?.find(data =>data._id==id)
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
      
      const FeatureData = {_id,name,email,photoURL,Prodect_Name,Prodect_Description,Prodect_PhotoURL,Prodect_Tag,like,Prodect_Price };
      console.log(productData);
      
      fetch("https://server-pi-blush-73.vercel.app/feature",{
          method:"POST",
          headers:{
              'content-type': 'application/json'
          },
          body : JSON.stringify(FeatureData)
         })
          .then(res => res.json())
      
          .then (data => {
            if(data.insertedId)
             {
             toast.success('Prodect has been added')
             
             }
               
              })
      
      }
   
    return (
        <div className='items-center pl-12'>
            <Helmet>
                
                <title>Product</title>
                
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
       
        {
          Access=="User"? <th>Update</th>
          :<th>Add to Feature</th>
        }
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
         {queue.Prodect_Description.slice(0,90)}...
         </h1>
        </td>
        <td>
        <Link  to={`/dashboard/myproduct/${queue._id}`}>
            <button><h1 className='font-semibold'>See Details</h1></button>
        </Link>
        </td>
        <td>
       {
        Access=="User"? <Link  to={`/dashboard/updateproduct/${queue._id}`}>
        <button><h1 className='font-semibold'>Update</h1></button>
    </Link>
    :  <button>
    <h1 onClick={() => addfeatureHandler(queue._id)}className='font-semibold'>feature product</h1>  
    </button> 
       }
        </td>
        <td><button><h1 onClick={() => DeleteproductHandler(queue._id)} className='font-semibold'>Delete</h1></button></td>
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

export default Myproduct