import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Dashboard from '../components/Dashboard/dashboard'
import MainLayout from '../components/layout/MainLayout'
import DashboardLayout from '../components/layout/dashboardLayout'
import ProdectDetailsCard from '../components/product/p_DetailsCard'
import Updateproduct from '../components/updateproduct/UpdateProduct'
import Addproduct from '../pages/Addprodect/Addprodect'
import Error from '../pages/Error/Error'
import FeatureProduct from '../pages/FeatureProduct/FeatureProduct'
import Home from '../pages/Home/home'
import Login from '../pages/Login/Login'
import ManageUser from '../pages/ManageUser/ManageUser'
import Myproduct from '../pages/MyProduct/MyProduct'
import MyProfile from '../pages/MyProfile/MyProfile'
import Payment from '../pages/Payment/Payment'
import ReportedProduct from '../pages/ReportedProduct/ReporteProduct'
import ReviewQueue from '../pages/ReviewProductQueue/reviewQueue'
import SignUp from '../pages/SignUp/SignUp'
import ManageCoupon from '../pages/managecoupon/managecoupon'
import Products from '../pages/product/product'
import Privateroutes from './Privateroutes'


const Routes =createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        errorElement:<Error></Error>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/products",
                element:<Products></Products>,
                loader: () =>fetch("https://server-pi-blush-73.vercel.app/allproduct")
            },
            {
                path:"/product/:id",
                element:<ProdectDetailsCard></ProdectDetailsCard>,
                loader: () =>fetch(`https://server-pi-blush-73.vercel.app/allproduct`)
              
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/signup",
                element:<SignUp></SignUp>
            }
        ]
    },
    {
        path:"/dashboard",
        element:<DashboardLayout></DashboardLayout>,
        errorElement:<Error></Error>,
        children:[
            {
                path:'/dashboard',
                element:<Privateroutes> <Dashboard></Dashboard></Privateroutes>
            },
            {
                path:"/dashboard/updateproduct/:id",
                element:<Privateroutes> <Updateproduct></Updateproduct></Privateroutes>,
                loader: () =>fetch("https://server-pi-blush-73.vercel.app/product")
            },
            {
                path:"/dashboard/myproduct",
                element:<Privateroutes> <Myproduct></Myproduct></Privateroutes>,
                loader: () =>fetch("https://server-pi-blush-73.vercel.app/product")
            },
            {
                path:"/dashboard/myproduct/:id",
                element:<Privateroutes> <ProdectDetailsCard></ProdectDetailsCard></Privateroutes>,
                loader: () => fetch("https://server-pi-blush-73.vercel.app/product")
            },
            {
                path:"/dashboard/addproduct",
                element:<Privateroutes> <Addproduct></Addproduct></Privateroutes>
            },
            {
                path:"/dashboard/reviewqueue",
                element:<Privateroutes> <ReviewQueue></ReviewQueue></Privateroutes>,
                loader: () => fetch("https://server-pi-blush-73.vercel.app/productqueue")
            },
            {
                path:"/dashboard/reviewqueue/:id",
                element:<Privateroutes> <ProdectDetailsCard></ProdectDetailsCard></Privateroutes>,
                loader: () => fetch("https://server-pi-blush-73.vercel.app/productqueue")
            },
            {
                path:"/dashboard/reportedproduct",
                element:<Privateroutes> <ReportedProduct></ReportedProduct></Privateroutes>

            },
            {
                path:"/dashboard/featureprouduct",
                element:<Privateroutes> <FeatureProduct></FeatureProduct></Privateroutes>
                
            },
            {
                path:"/dashboard/manageuser",
                element:<Privateroutes> <ManageUser></ManageUser></Privateroutes>,
                loader:() => fetch("https://server-pi-blush-73.vercel.app/user")
            },
            {
                path:"/dashboard/managecoupon",
                element:<Privateroutes> <ManageCoupon></ManageCoupon></Privateroutes>
            },
            {
                path:"/dashboard/myprofile",
                element:<Privateroutes> <MyProfile></MyProfile></Privateroutes>
                
            },
            {
                path:"/dashboard/payment",
                element:<Payment></Payment>
            }
           
        ]
    }
    
    
])

export default Routes