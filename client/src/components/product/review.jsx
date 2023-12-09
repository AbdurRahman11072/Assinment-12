import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
// import Swal from 'sweetalert2'

const Review = ({id}) => {
  
    const {user} = useContext(AuthContext)
    const [review,setreview] = useState()
    const time = moment().format('MMMM Do YYYY, h:mm:ss a')
   



useEffect(() =>{
    fetch('https://server-pi-blush-73.vercel.app/review')
    .then(res =>res.json())
    .then(data =>{
        const filterData = data?.filter(data => data._id ==id.id)
        setreview(filterData);
    })
},[])
console.log(review);



    const ReviewHandler = (e) =>{
        e.preventDefault()
           const _id =id.id
           console.log(_id);
           const name  = user?.displayName
           const email = user?.email           
           const review = e.target.review.value
           const Photo = user?.photoURL
           
          
       
           const Data = {
               name,
               email,
               time,
               _id,
               Photo,
               review
               
           };
           console.log(Data);
           
       
          fetch(`https://server-pi-blush-73.vercel.app/review`,{
           method:"POST",
           headers:{
               'content-type': 'application/json'
           },
           body : JSON.stringify(Data)
          })
           .then(res => res.json())
       
               .then (data => {
                Swal.fire({
                    title: "success",
                    text: "Review has been added",
                    icon: "success",
                    
                  });
                  fetch('https://server-pi-blush-73.vercel.app/review')
                .then(res =>res.json())
                .then(data =>{
                    const filterData = data?.filter(data =>data.roomid==id._id)
                    setreview(filterData)
                })
                     
               })
        }
        // const reviewalart =(e) =>{
        //     e.preventDefault()
        //     Swal.fire({
        //         title: "Error",
        //         text: "Please Book Room First",
        //         icon: "error",
                
        //       });
        // }
    return (
        <div className='border-[2px] shadow-md border-[#a0e9ff] rounded-md container mx-auto lg:flex gap-3 py-5 '>
            
        <div className='w-[100vw] xl:w-[50vw]  mx-auto'>
            <h1 className='text-xl font-extrabold text-center '>Review : [{review?.length}]</h1>
           <div className='flex gap-4 justify-center'>

           {
            review?.map(data =>(
                <div className='mt-10 w-80 h-[400px]  shadow-2xl p-6 '>
                <div className='text-center'>
                    <div className="avatar ">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={data.Photo} />
                        </div>
                    </div>
                    <h1 className='mt-2 text-lg font-bold'>{data.name}</h1>
                    <div className="rating rating-sm mt-2">
                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" checked />
                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" checked/>
                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" checked/>
                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                    </div>
                    <p>Post Time: {data.time}</p>
                    <h1 className='w-full'>{data.review}</h1>
                </div>
            </div> 
            ))
           }
           
            
           </div>          
        </div>

        <div className='w-[100vw] mt-10 xl:mt-0 xl:w-[50vw] mx-auto' >
            <h1 className='text-xl text-center font-extrabold py-5 '>Add Review</h1>

    
                    <form onSubmit={ReviewHandler} className='w-[400px]  mx-auto justify-center'>
                    {/* // <form className='w-[400px]  mx-auto justify-center'> */}
                        
                    <input className='block w-full mt-5 h-16 px-5 rounded-lg border-2 border-[#a0e9ff] font-semibold' type="text" placeholder='Enter Email' value={user?.displayName} />
                    <input className='block w-full mt-5 h-16 px-5 rounded-lg border-2 border-[#a0e9ff] font-semibold' type="email" placeholder='Enter Email' value={user?.email} />
                
                    <textarea className='w-full mt-5 h-32 rounded-lg border-2 border-[#a0e9ff] px-5 pt-3 font-medium' placeholder="Write your thought about room" name='review' required></textarea>
                  {
                    user &&   <button type='submit' className='w-28 h-12 border-2 border-[#a0e9ff] rounded-xl mt-5 hover:bg-[#a0e9ff]  font-bold '> Submit</button>   
                  }           

                </form>
         
        </div>
       

       </div>
    )
}

export default Review