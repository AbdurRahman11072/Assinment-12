import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';
import manageuserHook from '../../components/Hooks/manageuserHook';

const ManageUser = () => {
  const {data,refetch} = manageuserHook()
  console.log(data);

    const [Access,setAccess] = useState()

const formHandler = (e) =>{
setAccess(e.target.value)
}

console.log(Access);

    const UpdateHandler = (id) =>{
       console.log(id);
       const filteruser =data?.find(data => data._id ==id)
 
       const name= filteruser.name;
       const email= filteruser.email;
       const photo = filteruser.photo;
       const access =Access;
       const status = filteruser.status
       const userAccess={
        name,email,photo,access,status}
        console.log(userAccess);
    
    
       fetch(`https://server-pi-blush-73.vercel.app/user/${id}`,{
        method:"PUT",
        headers:{
            'content-type': 'application/json'
        },
        body : JSON.stringify(userAccess)
       })
        .then(res => res.json())
    
            .then (data => {
              toast(`${name}s access has been changed into ${access}`)
              refetch()
            })
            
    
     }

    
    return (
        <div className="overflow-x-auto">
            <Helmet>
                
                <title>Manage User</title>
                
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
        <th>Name</th>
        <th>Email</th>
        <th>Access</th>
        <th>Status</th>
        <th>Save</th>
    
      </tr>
    </thead>
    <tbody>
   {
    data?.map(data =>(
        
      <tr key={data._id} className='shadow-lg'>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={data.photo} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{data.name}</div>
         
          </div>
        </div>
      </td>
      <td>
       
        <h1 className=" font-bold">{data.email}</h1>
      </td>
      <td>
   
   <select onChange={formHandler} className="select  rounded-lg border w-32 bg-[#ffff] text-black font-semibold shadow-2xl  "  name="user" required>
        <option disabled selected >{data.access}</option>
          <option >Admin</option>
          <option >Modarator</option>
          <option >User</option>
          
        </select>
  
      </td>
      <td>{data.status}</td>
      <td><button><h1 onClick={() => UpdateHandler(data._id)} className=" font-bold">Save</h1></button></td>
    
    </tr>
    ))
   }

 
    </tbody>
 
    
  </table>
  <Toaster position="top-right" reverseOrder={false}/>
</div>
    )
}

export default ManageUser