import { ThumbsDown, ThumbsUp } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink, useLoaderData, useParams } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Review from './review';

const ProdectDetailsCard = () => {
    
    const productData = useLoaderData()
    const {user,loading} = useContext(AuthContext)
    const [PData,setPData] = useState(productData)    
    console.log(PData);
    
    const id =useParams();
    useEffect(() =>{
        const filterdata= productData?.find(product => product._id ==id.id)
        setPData(filterdata)
    },[loading])
    
 
    const [countLike,setCountLike] =useState()
const [likeCount,setLikeCount] = useState()

   useEffect(()=>{
    const alllikes = PData?.like;  
    const filter = alllikes?.find(like=> like ==user?.email)    
setLikeCount(alllikes);
    if (filter==user?.email) {
        setCountLike(true)
    }
    else if(!user)
    {
        setCountLike(null)
    }


},[PData,user])




const UpdateHandler = () =>{
    
   
    const name =PData.name;
    const email = PData.email;
    const photoURL = PData.photoURL;
    const Prodect_Name =PData.Prodect_Name;
    const Prodect_PhotoURL = PData.Prodect_PhotoURL;
    const Prodect_Description = PData.Prodect_Description;
    const Prodect_Tag = PData.Prodect_Tag;
    const like =[...[PData.like],...[user.email]];
    const productData = {name,email,photoURL,Prodect_Name,Prodect_Description,Prodect_PhotoURL,Prodect_Tag,like};
    console.log(productData);

  if(PData?.email == user?.email)
        {
            toast.error("You Can Not Give Like To Your Own Product")
        }
        else
        {
            fetch(`https://server-pi-blush-73.vercel.app/product/${PData._id}`,{
                method:"PUT",
                headers:{
                    'content-type': 'application/json'
                },
                body : JSON.stringify(productData)
               })
                .then(res => res.json())
            
                    .then (data => {
                       toast("Thank you for the  like")
                       fetch('https://server-pi-blush-73.vercel.app/allproduct')
                       .then(res =>res.json())
                       .then(data => {
                        const filterdata= data?.find(product => product._id ==id.id)
                         setPData(filterdata)})
                   
            
                       
                            })
        }

 }


//  report handlar 
const addreportHandler = () =>{
    
    console.log(PData);
    
   if(PData?.email == user?.email)
   {
    toast.error("Can't Report Your Product")
   }
   else{
    fetch("https://server-pi-blush-73.vercel.app/report",{
        method:"POST",
        headers:{
            'content-type': 'application/json'
        },
        body : JSON.stringify(PData)
       })
        .then(res => res.json())
    
        .then (data => {
          if(data.insertedId)
           {
           toast.success('Prodect has been Reported')
      
           }
             
            })
   }
    
    }
    


    

    return (
        <div className='container mx-auto py-20'>
            <div className='w-[80%] mx-auto mb-10'>
               <div className=' mb-5'>
               <h1 className='text-3xl font-bold mb-3'>{PData?.Prodect_Name}</h1>
             <div className='flex items-center '>
             <div className='flex flex-1 gap-5 text-lg font-bold'>
              <div className="rating">
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"  />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked/>
                </div>
                <span>|</span>
                <p> By 250 People</p>
              </div>

              <div className='flex gap-5 items-center'>
              <p className='text-base font-medium'>Like: {likeCount?.length}</p>
                <div className='flex gap-2 bg-[#A0E9FF] shadow-md w-36 h-10 items-center justify-center'>
                   {
                    countLike==true && user?
                       <button  className=' w-[60px] p-1 pl-5 rounded-lg'><ThumbsUp  color='red'/></button>                  
                   
                    :
                 
                    <div>               
                    {
                        user? 
                        <button onClick={UpdateHandler} className=' w-[60px] p-1 pl-5 rounded-lg'><ThumbsUp  /></button> 
                        :
                        <NavLink to="/login">
                            <button  className=' w-[60px] p-1 pl-5 rounded-lg'><ThumbsUp  /></button> 
                        </NavLink>
                    }
                  
                    </div>
                                      
                   } 
                   <span>|</span>

                   {
                    countLike==false?
                    <button onClick={() =>setCountLike(false)} className='  w-[60px] p-1 pl-5 rounded-lg'><ThumbsDown color='red'/></button>
                    :<button onClick={() =>setCountLike(false)} className='  w-[60px] p-1 pl-5 rounded-lg'><ThumbsDown /></button>
                   }
                </div>
                <button onClick={addreportHandler} className='w-32 h-10 text-md font-semibold border-2 hover:text-lg bg-[#A0E9FF] hover:border-[#00A9FF]'>Report</button>
              </div>
             </div>
               </div>
                
                <img className=' rounded-md w-full h-[600px]' src={PData.Prodect_PhotoURL} alt="" />
                <div className='mt-5'>
                    <div className=''>
                       <div className='flex gap-3 items-center mb-5'>
                       <img className='w-12 h-12 rounded-full ' src={PData.photoURL} alt="" />
                    <div>
                        <h1 className='font-medium text-sm'>Sealer:</h1>
                    <h1 className='text-lg font-semibold'>{PData.name}</h1>
                    </div>
                    
                       </div>
                    </div>
                    <h1 className='text-3xl font-bold underline mb-2'>Desciption :</h1>
                    <p className='text-md'>{PData.Prodect_Description}</p>
                </div>
            </div>

           {/* review */}
           <div className=''>
           <Review  id={id}></Review>
           </div>
           <Toaster
            position="top-right"
            reverseOrder={false}/>
        </div>
    )
}

export default ProdectDetailsCard