import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../Provider/AuthProvider'
import Profile from './Profile'

const Navbar = () => {
 const {user} =useContext(AuthContext)
    return (
        <div className='container mx-auto relative border-b-2 border-gray-300 '>
           <div className='navbar py-6 justify-evenly'>

           <div className="navbar-start flex flex-1 gap-10">
                <div className="dropdown dropdown-start">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <FontAwesomeIcon icon={faBars} style={{color: "black", fontSize:"20px"}} />
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-white  bg-blue-500 rounded-md  " : ""
                    }
                    >
                <li className='py-2 px-4 text-lg rounded-md items-center hover:bg-blue-500 hover:text-gray-50'>Home</li>
                </NavLink>
                
                <NavLink
                   to="/products"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "text-white  bg-blue-500 rounded-md  " : ""
                    }
                    >
                <li className='py-2 px-4 text-lg rounded-md items-center hover:bg-blue-500 hover:text-gray-50'>products</li>
                </NavLink>
            
              
        
            </ul>
            

                </div>
                
                {/* <img className='w-12 h-12' src="https://www.shutterstock.com/image-vector/tech-store-logo-design-vector-260nw-2330175501.jpg" alt="" /> */}
                <h className="-ml-10 w-56 text-3xl font-bold">
                    <div className="navbar-start flex flex-1 gap-10">Hi Tech</div>
                </h>
               
            </div>

            <div className='hidden lg:block navbar-center flex-1  '>
                <ul className='flex gap-10 text-lg font-medium justify-center '>
                    <NavLink to="/"><li>Home</li></NavLink>
                    <NavLink to="/products"><li>Prodects</li></NavLink>                   
                    
                </ul>
            </div>

            <div className='navbar-end flex-1'>
             
            {
                    !user?
                    <NavLink to={"/login"} >
                     <button className='w-24 h-12 rounded-full border-2 text-[#00A9FF] border-[#A0E9FF] text-md hover:text-white font-medium text-lg hover:bg-[#00A9FF]'>Log in</button>
                    </NavLink>            
                :<Profile></Profile>
                }
               
            </div>
           </div>
        </div>
    )
}

export default Navbar