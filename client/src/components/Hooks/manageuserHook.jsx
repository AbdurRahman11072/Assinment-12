import { useQuery } from "@tanstack/react-query";

const manageuserHook = () => {
    const {data, isFetching,error,refetch} = useQuery({
        queryKey:['user'],
        queryFn: async () =>{
            const data = await fetch('https://server-pi-blush-73.vercel.app/user')
            return await data.json()
        }
    })
    
    return {data,isFetching,error,refetch}
        
   
}

export default manageuserHook

// https://server-pi-blush-73.vercel.app/user