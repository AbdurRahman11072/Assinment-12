import React, { useContext, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useLoaderData, useParams } from 'react-router-dom'
import { TagsInput } from 'react-tag-input-component'
import Swal from 'sweetalert2'
import { AuthContext } from '../../Provider/AuthProvider'

const Updateproduct = () => {
    const loderData = useLoaderData();
    const [data,setdata] = useState([])
    const id = useParams()
    const {user} = useContext(AuthContext)
    const [selected, setSelected] = useState([]);
    console.log(selected);
    useEffect(()=>{
        const FindData = loderData?.find((data) =>data._id.toLowerCase()===id.id.toLowerCase())
        setdata(FindData)
       setSelected(FindData?.Prodect_Tag)
     
    },[loderData])

    const UpdateHandler = (e) =>{
        e.preventDefault()
        const form = e.target;
        const name =form.User_name.value;
        const email = form.User_email.value;
        const photoURL = form.User_PhotoURL.value;
        const Prodect_Name =form.Prodect_Name.value;
        const Prodect_PhotoURL = form.Prodect_PhotoURL.value;
        const Prodect_Description = form.product_Description.value;
        const Prodect_Tag = selected;
        const like =0;
        const productData = {name,email,photoURL,Prodect_Name,Prodect_Description,Prodect_PhotoURL,Prodect_Tag,like};
        console.log(productData);
    
       fetch(`https://server-pi-blush-73.vercel.app/product/${data._id}`,{
        method:"PUT",
        headers:{
            'content-type': 'application/json'
        },
        body : JSON.stringify(productData)
       })
        .then(res => res.json())
    
            .then (data => {
                Swal.fire(
                    'successfull',
                    'Product has been Updated',
                    'success'
                  )
            })
            
    
     }
    
    return (
        <div className='w-[100%] h-[100vh]  text-gray-800 items-center my-10'>
            <div className='w-[800px] mx-auto  justify-center items-center bg-gray-100 border-2 border-[#a0e9ff] p-10 rounded-lg shadow-lg'>
            <form onSubmit={UpdateHandler}>

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
                    <div className=''>
                    <label htmlFor='Prodect_Name' className='text-lg font-bold pl-[2px]'>Prodect Name</label>
                    <input className='block w-full mt-1 h-16 px-5 border-2 border-[#a0e9ff]  rounded-lg font-semibold focus:border-2 focus:outline-[#00A9FF] transition-transform' type="text" name='Prodect_Name' Value={data.Prodect_Name} />
                    </div>
                    <div className=' mt-3'>
                    <label htmlFor='Prodect_PhotoURL' className='text-lg font-bold pl-[2px]'>Prodect PhotoURL</label>
                    <input className='block w-full mt-1 h-16 px-5 border-2 border-[#a0e9ff] rounded-lg font-semibold focus:border-2 focus:outline-[#00A9FF] transition-transform' type="text" name='Prodect_PhotoURL'  Value={data.Prodect_PhotoURL}/>
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
                        
                    <textarea className='w-full mt-1 h-32 rounded-lg border-2 border-[#a0e9ff] px-5 pt-3 font-medium focus:outline-[#00A9FF]' placeholder="Write your thought about room" name='product_Description' Value={data.Prodect_Description}></textarea>
                    </div>

                    

                    <button type='submit' className='w-28 h-12 border-2 border-[#a0e9ff] rounded-xl mt-5 hover:bg-[#a0e9ff]  font-bold '> Update</button>              

            </form>
            </div>
            <Toaster
            position="top-right"
            reverseOrder={false}/>
           
        </div>
    )
}

export default Updateproduct