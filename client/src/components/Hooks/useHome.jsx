import { useQuery } from "@tanstack/react-query";

const useHome = () => {
    const {product, isFetching,error,refetch} = useQuery({
        queryKey:['user'],
        queryFn: async () =>{
            const product = await fetch('https://server-pi-blush-73.vercel.app/product')
            return await product.json()
        }
    })
    
    return {product,isFetching,error,refetch}
        
   
}

export default useHome