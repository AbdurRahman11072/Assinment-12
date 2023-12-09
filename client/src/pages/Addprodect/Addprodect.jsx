import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../Provider/AuthProvider';
import manageuserHook from '../../components/Hooks/manageuserHook';
import AddFrom from './AddFrom';


const Addproduct = () => {
    const {user} = useContext(AuthContext)
       const {data} =manageuserHook()
    const [status,setstatus] = useState()
    
    useEffect(()=>{
        const filter = data?.find(data =>data.email==user?.email)
        setstatus(filter?.status)
       

    },[data])


    // const addproductHandler = (e) =>{
    //     e.preventDefault();

    //     const form = e.target;
    //     const name =form.User_name.value;
    //     const email = form.User_email.value;
    //     const photoURL = form.User_PhotoURL.value;
    //     const Prodect_Name =form.Prodect_Name.value;
    //     const Prodect_PhotoURL = form.Prodect_PhotoURL.value;
    //     const Prodect_Description = form.product_Description.value;
    //     const Prodect_Tag = selected;
    //     const Prodect_Price = form.Prodect_Price.value
    //     const like =[];
    //     const productData = {name,email,photoURL,Prodect_Name,Prodect_Description,Prodect_PhotoURL,Prodect_Tag,like,Prodect_Price};
    //     console.log(productData);

    //     // axios.post("ttp://localhost:2000/productqueue",productData,
    //     // {
            
    //     //     headers:{
    //     //                 'content-type': 'application/json'
    //     //             },
    //     // })
    //     if(status=="Free")
    //     {
    //         navigate('/dashboard/myprofile')
    //     }
    //   else{
    //     fetch("https://server-pi-blush-73.vercel.app/productqueue",{
    //         method:"POST",
    //         headers:{
    //             'content-type': 'application/json'
    //         },
    //         body : JSON.stringify(productData)
    //        })
    //         .then(res => res.json())
        
    //         .then (data => {
    //           if(data.insertedId)
    //            {
    //            return toast.success('Prodect has been send for review')
    //            }
                 
    //             })

    //   }
        
    // }

    

    return (
       <div>

        <AddFrom user={user}  status={status} ProductInfo={data}></AddFrom>
       </div>
    )
}

export default Addproduct