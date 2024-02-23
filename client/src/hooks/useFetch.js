import { useQuery } from "@tanstack/react-query";

const FetchData = (url , keys)=>{
    const {data , isPending , error} = useQuery(
        {
            queryKey:[keys],
            queryFn:()=>{
                fetch(url)
            },
        })
    return [data , isPending , error]
}

export {FetchData}
