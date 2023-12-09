import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { TagsInput } from "react-tag-input-component";

const AddFrom = ({user,status,ProductInfo}) => {
  const [selected, setSelected] = useState([]);
  const [userData,setuserData] = useState()
  const navigate = useNavigate();
useEffect(()=>{
  fetch("https://server-pi-blush-73.vercel.app/product")
  .then(res => res.json())
  .then(data =>{
    console.log(data);
    const filter = data?.filter(data =>data.email==user?.email)
    setuserData(filter)
  })
},[])
console.log(status,userData);



    const addproductHandler = (e) =>{
        e.preventDefault();

        const form = e.target;
        const name =form.User_name.value;
        const email = form.User_email.value;
        const photoURL = form.User_PhotoURL.value;
        const Prodect_Name =form.Prodect_Name.value;
        const Prodect_PhotoURL = form.Prodect_PhotoURL.value;
        const Prodect_Description = form.product_Description.value;
        const Prodect_Tag = selected;
        const Prodect_Price = form.Prodect_Price.value
        const like =[];
        const productData = {name,email,photoURL,Prodect_Name,Prodect_Description,Prodect_PhotoURL,Prodect_Tag,like,Prodect_Price};
        console.log(productData);

        // axios.post("ttp://localhost:2000/productqueue",productData,
        // {
            
        //     headers:{
        //                 'content-type': 'application/json'
        //             },
        // })
        if(status=="Free" && userData?.length <=1)
        {
            navigate('/dashboard/myprofile')
        }
      else{
        fetch("https://server-pi-blush-73.vercel.app/productqueue",{
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
               return toast.success('Prodect has been send for review')
               }
                 
                })

      }
        
    }
    return (
        <div className='w-[100%] h-[100vh]  text-gray-800 items-center my-10'>
        <Helmet>
        
          
          <title>Add Product</title>
          
      </Helmet>
      <div className='w-[800px] mx-auto  justify-center items-center bg-gray-100 border-2 border-[#a0e9ff] p-10 rounded-lg shadow-lg'>
      <form onSubmit={addproductHandler} >

              <div className='flex gap-2'>
              <div className='flex-1'>
              <label htmlFor='User_name' className='text-lg font-bold pl-[2px]'>User Name</label>
              <input className='block w-full mt-1 h-16 px-5 border-2 border-[#a0e9ff] rounded-lg font-semibold focus:border-2 focus:outline-[#00A9FF] transition-transform' type="text" name='User_name' value={user?.displayName} />
              </div>

              <div className='flex-1'>
              <label htmlFor='User_name' className='text-lg font-bold pl-[2px]'>User Email</label>
              <input className='block w-full mt-1 h-16 px-5 border-2 border-[#a0e9ff] rounded-lg  font-semibold focus:border-2 focus:outline-[#00A9FF] transition-transform' type="text" name='User_email' value={user?.email} />
              </div>

              </div> 

              <div className=' mt-3'>
              <label htmlFor='User_PhotoURL' className='text-lg font-bold pl-[2px]'>User PhotoURL</label>                    
              <input className='block w-full mt-1 h-16 px-5 border-2 border-[#a0e9ff] rounded-lg  font-semibold focus:border-2 focus:outline-[#00A9FF] transition-transform' type="text" name='User_PhotoURL' value={user?.photoURL} />
              </div> 
            <div className='flex gap-3'>
            <div className='flex-1'>
              <label htmlFor='Prodect_Name' className='text-lg font-bold pl-[2px]'>Prodect Name</label>
              <input className='block w-full mt-1 h-16 px-5 border-2 border-[#a0e9ff]  rounded-lg font-semibold focus:border-2 focus:outline-[#00A9FF] transition-transform' type="text" name='Prodect_Name' required/>
              </div>
              <div className=''>
              <label htmlFor='Prodect_Price' className='text-lg font-bold pl-[2px]'>Prodect Price</label>
              <input className='block w-full mt-1 h-16 px-5 border-2 border-[#a0e9ff]  rounded-lg font-semibold focus:border-2 focus:outline-[#00A9FF] transition-transform' type="text" name='Prodect_Price' required/>
              </div>
            </div>
             <div className='flex gap-3'>
             <div className=' mt-3 flex-1'>
              <label htmlFor='Prodect_PhotoURL' className='text-lg font-bold pl-[2px]'>Prodect PhotoURL</label>
              <input className='block w-full mt-1 h-16 px-5 border-2 border-[#a0e9ff] rounded-lg font-semibold focus:border-2 focus:outline-[#00A9FF] transition-transform' type="text" name='Prodect_PhotoURL'  required/>
              </div>
             <div className=' mt-3'>
              <label htmlFor='External_URL' className='text-lg font-bold pl-[2px]'>External URL</label>
              <input className='block w-full mt-1 h-16 px-5 border-2 border-[#a0e9ff] rounded-lg font-semibold focus:border-2 focus:outline-[#00A9FF] transition-transform' type="text" name='External_URL'  required/>
              </div>
             </div>
              <div className=' mt-3'>
              <label htmlFor='Prodect_Tag' className='text-lg font-bold pl-[2px]'>Prodect Tag</label>    
                          
            
             <TagsInput
                  classNames={'bg-black'}
                  value={selected}
                  onChange={setSelected}
                  name="fruits"
                  placeHolder="Prodect Tag"
                   className ='h-12'
                  
              />
           
              </div>

              <div className=' mt-3'>
                  <label htmlFor='Prodect_Description' className='text-lg font-bold pl-[2px]'>Prodect Description</label>
                  
              <textarea className='w-full mt-1 h-32 rounded-lg border-2 border-[#a0e9ff] px-5 pt-3 font-mAddedium focus:outline-[#00A9FF]' placeholder="Write your thought about room" name='product_Description' required></textarea>
              </div>

              

              <button type='submit' className='w-28 h-12 border-2 border-[#a0e9ff] rounded-xl mt-5 hover:bg-[#a0e9ff]  font-bold '> Submit</button>              

      </form>
      </div>
      <Toaster 
      position="top-right"
      reverseOrder={false}/>
     
  </div>
    )
}

export default AddFrom