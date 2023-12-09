import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const Profile = () => {
    const {user,LogOut} =useContext(AuthContext);
    return (     


        <div className="z-50" >
            
        <div className="dropdown dropdown-end flex flex-row  p-0 " tabIndex={0}>
                <label  className="btn btn-ghost btn-circle avatar ring ring-[#00A9FF] ">
                    <div className="w-10 rounded-full">
                    <img src={user.photoURL} />                    
                    </div>
                    
                </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-20 z-[1]  border-2 shadow-xl bg-base-200 rounded-box w-56 ">
                    <div className='p-4 mx-auto '>
                        <div className="avatar ">
                        <div className="w-16 rounded-full ring ring-[#00A9FF] ring-offset-base-100 ring-offset-2">
                            <img src={user.photoURL} />
                        </div>
                        </div>
                    </div>
                   <div className='bg-white border-2  rounded-lg'>
                     <p className='text-center font-semibold'>Name</p>
                    <div className='w-16 h-1 bg-[#00a9ff] mx-auto'></div>
                    <p className='text-center font-semibold my-2'>{user.displayName}</p>
                   </div>

                   <div className='bg-white border-2  rounded-lg p-5 font-bold text-center mt-2 cursor-pointer'>
                        <NavLink to="/dashboard">
                            Dashboard
                        </NavLink>
                   </div>              

                   <button onClick={LogOut} className='w-24 h-12 bg-[#00a9ff] text-white font-semibold border-2 shadow-2xl rounded-lg my-3 text-center mx-auto'>Logout</button>
                    
             </ul>
             <p className='hidden md:block w-24 my-auto ml-1 font-bold text-center cursor-pointer'>{user.displayName}</p>
        </div>
        
    </div>
            
       
    );
};

export default Profile;