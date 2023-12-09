import { ArrowLeftToLine, BadgePercent, BookCopy, BookHeart, CircleUserRound, Package, PackagePlus, ScanEye, ShieldAlert, UserRoundCog } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import manageuserHook from '../Hooks/manageuserHook';

const Sidebar = () => {
    const {user,loading} = useContext(AuthContext)
 const {data} =manageuserHook();
console.log(data);
    const [userData,setuserData] =useState();
    const [Access,setAccess] = useState();
    useEffect(() =>{
        fetch("https://server-pi-blush-73.vercel.app/user")
        .then(res =>res.json())
        .then(data =>{
            const filterdata = data.find(data =>data.email==user?.email)
            setuserData(filterdata)
            setAccess(filterdata?.access)
        })
    },[data,loading])

  
    return (
       <>
            <div className='w-[250px] h-[100vh] bg-white shadow-lg fixed z-50 flex flex-col'>
                <div className='bg-[#CDF5FD] m-4 h-40 justify-center items-center text-center rounded-md '>
                    <h1 className='text-3xl font-bold pt-[55px]'>TechWorld</h1>
                    <img src="" alt="" />
                </div>
                <div className='m-4 flex-1'>
                    <ul className='flex flex-col gap-3'>
                    <NavLink 
                         to="/dashboard"
                        
                                 >
                         
                             <li className='flex gap-2  h-12 items-center px-2  font-semibold'>
                             <BookCopy />
                                 <p>Dashboard</p>
                             </li>
                         </NavLink>
                   
                     {
                        Access=="User" ?   
                        <div className=''>
                        <NavLink 
                         to="/dashboard/myproduct"
                         className={({ isActive }) =>
                                     isActive ? "bg-[#A0E9FF] rounded-lg" : ""
                                 }
                                 >
                         
                             <li className='flex gap-2  h-12 items-center px-2 mb-3  font-semibold'>
                             <Package  />
                                 <p>My Prodect</p>
                             </li>
                         </NavLink>
                         <NavLink 
                         to="/dashboard/addproduct"
                         className={({ isActive }) =>
                                     isActive ? "bg-[#A0E9FF] rounded-lg" : ""
                                 }
                                 >
                         
                             <li className='flex gap-2  h-12 items-center px-2 rounded-lg  font-semibold '>
                             <PackagePlus />
                                 <p>Add Prodect</p>
                             </li>
                         </NavLink>
                        </div>
                        :""
                     }

                    {/* modarator menu  */}
                      {
                        Access=="Modarator" && 
                         <div>
                         <NavLink 
                          to="/dashboard/reviewqueue"
                          className={({ isActive }) =>
                                      isActive ? "bg-[#A0E9FF] rounded-lg" : ""
                                  }
                                  >
                          
                              <li className='flex gap-2  h-12 items-center px-2 rounded-lg  font-semibold mb-3'>
                              <ScanEye />
                              <p>Review Queue</p>
                              </li>
                          </NavLink>
                          <NavLink 
                          to="/dashboard/featureprouduct"
                          className={({ isActive }) =>
                                      isActive ? "bg-[#A0E9FF] rounded-lg" : ""
                                  }
                                  >
                          
                              <li className='flex gap-2  h-12 items-center px-2 rounded-lg  font-semibold mb-3'>
                              <BookHeart />
                              <p>Feature Prodect</p>
                              </li>
                          </NavLink>
                          <NavLink 
                          to="/dashboard/reportedproduct"
                          className={({ isActive }) =>
                                      isActive ? "bg-[#A0E9FF] rounded-lg" : ""
                                  }
                                  >
                          
                              <li className='flex gap-2  h-12 items-center px-2 rounded-lg  font-semibold '>
                              <ShieldAlert />
                              <p>Reported Prodect</p>
                              </li>
                          </NavLink>
                         </div>
                         
                      }
                  {
                      Access=="Admin" &&  
                      <div>

                    <div className=''>
                        <NavLink 
                         to="/dashboard/myproduct"
                         className={({ isActive }) =>
                                     isActive ? "bg-[#A0E9FF] rounded-lg" : ""
                                 }
                                 >
                         
                             <li className='flex gap-2  h-12 items-center px-2 mb-3  font-semibold'>
                             <Package  />
                                 <p>All Prodect</p>
                             </li>
                         </NavLink>
                         <NavLink 
                         to="/dashboard/addproduct"
                         className={({ isActive }) =>
                                     isActive ? "bg-[#A0E9FF] rounded-lg" : ""
                                 }
                                 >
                         
                             <li className='flex gap-2  h-12 items-center px-2 rounded-lg  font-semibold mb-3'>
                             <PackagePlus />
                                 <p>Add Prodect</p>
                             </li>
                         </NavLink>
                        </div>
                        <div>
                         <NavLink 
                          to="/dashboard/reviewqueue"
                          className={({ isActive }) =>
                                      isActive ? "bg-[#A0E9FF] rounded-lg" : ""
                                  }
                                  >
                          
                              <li className='flex gap-2  h-12 items-center px-2 rounded-lg  font-semibold mb-3'>
                              <ScanEye />
                              <p>Review Queue</p>
                              </li>
                          </NavLink>
                          <NavLink 
                          to="/dashboard/featureprouduct"
                          className={({ isActive }) =>
                                      isActive ? "bg-[#A0E9FF] rounded-lg" : ""
                                  }
                                  >
                          
                              <li className='flex gap-2  h-12 items-center px-2 rounded-lg  font-semibold mb-3'>
                              <BookHeart />
                              <p>Feature Prodect</p>
                              </li>
                          </NavLink>
                          <NavLink 
                          to="/dashboard/reportedproduct"
                          className={({ isActive }) =>
                                      isActive ? "bg-[#A0E9FF] rounded-lg" : ""
                                  }
                                  >
                          
                              <li className='flex gap-2  h-12 items-center px-2 rounded-lg  font-semibold mb-3 '>
                              <ShieldAlert />
                              <p>Reported Prodect</p>
                              </li>
                          </NavLink>
                         </div>
                        <NavLink 
                          to="/dashboard/manageuser"
                          className={({ isActive }) =>
                                      isActive ? "bg-[#A0E9FF] rounded-lg" : ""
                                  }
                                  >
                          
                              <li className='flex gap-2  h-12 items-center px-2 rounded-lg  font-semibold mb-3'>
                              <UserRoundCog />
                              <p>Manage User</p>
                              </li>
                          </NavLink>
                          <NavLink 
                          to="/dashboard/managecoupon"
                          className={({ isActive }) =>
                                      isActive ? "bg-[#A0E9FF] rounded-lg" : ""
                                  }
                                  >
                          
                              <li className='flex gap-2  h-12 items-center px-2 rounded-lg  font-semibold'>
                              <BadgePercent />
                              <p>Manage Coupon</p>
                              </li>
                          </NavLink>
                        </div>
                        
                  }
                    </ul>
                </div>

                <div className='m-2 rounded-md p-4 bg-[#CDF5FD]'>
                    <ul className='flex flex-col gap-4'>
                    <NavLink 
                        to="/dashboard/myprofile"
                        className={({ isActive }) =>
                                    isActive ? "bg-[#A0E9FF] rounded-lg" : ""
                                }
                                >
                        
                            <li className='flex gap-2  h-12 items-center px-2 bg-white rounded-lg  font-semibold'>
                            <CircleUserRound color="#00A9FF"/>
                                <p>Profile</p>
                            </li>
                        </NavLink>
                    <NavLink 
                        to="/"
                        className={({ isActive }) =>
                                    isActive ? "bg-[#A0E9FF] rounded-lg" : ""
                                }
                                >
                        
                            <li className='flex gap-2  h-12 items-center px-2 bg-white rounded-lg  font-semibold'>
                            <ArrowLeftToLine color="#00A9FF"/>
                                <p>Go To Home</p>
                            </li>
                        </NavLink>
                    </ul>
                </div>

            </div>

       </>
    )
}

export default Sidebar