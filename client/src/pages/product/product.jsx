import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCards from '../../components/product/productCards';

const Products = () => {
    const[productData,setproductData] = useState([])
    const data = useLoaderData()
    const [itemperPage,setitemperPage] = useState(2) ;
    const [currentPage,setcurrentPage] = useState(0)
    const totalPage = Math.ceil(data?.length /itemperPage)
    console.log(totalPage);
    const page = [...Array(totalPage).keys()];
    console.log(page);
    useEffect(()=>{
        setproductData(data)
    },[])
    console.log(productData);
    useEffect(()=>{
        fetch(`http://localhost:5000/allproduct/page=${currentPage+1}&size=${itemperPage}`)
    },[currentPage])

const HandlerItemPerPage =(e) =>{
    const pagevalue= parseInt(e.target.value)
    setitemperPage(pagevalue)
    setcurrentPage(0)
}
const PrivousPage =() =>{
    if(currentPage > 0)
    {
        setcurrentPage(currentPage-1)
    }
   
}
const NextPage =() =>{
    if(currentPage < page.length-1)
    {
        setcurrentPage(currentPage+1)
    }
   
}
console.log(page.length);
console.log("current page",currentPage);

    return (
        <div className='items-center my-10'>
          <ProductCards productData={productData}></ProductCards>
         <div className='container mx-auto text-center mt-10 flex gap-2 justify-center' >
         <button onClick={PrivousPage} className="px-3 py-2 bg-[#00A9FF] font-bold text-white text-lg rounded-md"> Privous </button>
         {
            page?.map(page =>(
                <button onClick={() =>setcurrentPage(page)} className={currentPage === page?"px-5 py-2 bg-[#00A9FF] font-bold text-white text-xl rounded-md":" px-5 py-2 font-bold text-black text-xl"}>{page+1}</button>
            ))
          }

<button onClick={NextPage} className="px-3 py-2 bg-[#00A9FF] font-bold text-white text-lg rounded-md"> Next </button>

     <select className= 'px-2 h-10 bg-[#00A9FF] font-bold text-white text-xl rounded-md'value={itemperPage} onChange={HandlerItemPerPage}>     
        <option value={2}>2</option>
        <option value={4}>4</option>
        <option value={20}>20</option>
     </select>
         </div>
        </div>
    )
}

export default Products