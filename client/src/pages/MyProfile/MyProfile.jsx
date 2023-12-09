import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../Provider/AuthProvider';
import manageuserHook from '../../components/Hooks/manageuserHook';
import PrimePakage from '../../components/PrimePakage/PrimePakage';

const MyProfile = () => {
    const {user,loading} = useContext(AuthContext)
    const {data} = manageuserHook()
    const [Access,setAccess] = useState();
    const [status ,setstatus] = useState()
    useEffect(() =>{
        fetch("https://server-pi-blush-73.vercel.app/user")
        .then(res =>res.json())
        .then(data =>{
            const filterdata = data.find(data =>data.email==user?.email)
            
            setAccess(filterdata?.access)
            setstatus(filterdata?.status)
        })
    },[data])
    console.log(user);
    return (
        <div className='pb-10'>
              <Helmet>
                
                <title>My Profile</title>
                
            </Helmet>
           <h1 className='text-4xl font-bold mt-10 ml-10'>My Profile</h1>
           <div className='mt-8 ml-10 flex'>
            <div><img className='rounded-full w-60' src={user.photoURL} alt="" /></div>
            <div className='ml-16 mt-5'>
                <h1 className='text-xl font-bold '>User Name    : {user.displayName}</h1>
                <h1 className='text-xl font-bold mt-6'>User Email   : {user.email}</h1>
                <h1 className='text-xl font-bold mt-6'>User Access  : {Access}</h1>
                {
                    Access=="User" ?<h1 className='text-xl font-bold mt-6'>User Status  : {status}</h1>
                    :<h1 className='text-xl font-bold mt-6'>User Status  : {Access}</h1>
                }
            </div>
           </div>

            <div>
                {
                    status=="Free"&& Access== "User"?<PrimePakage></PrimePakage>
                    :""
                }
            </div>
           
        </div>
    )
}

export default MyProfile