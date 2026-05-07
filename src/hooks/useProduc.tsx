import { getProductByIdAction } from "@/admin/action/get-product-by-id.action"
import { useQuery } from "@tanstack/react-query"




export const useProduc = (id:string) => {
  
  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5
  })

  //TODO mutacion


    return {
        ...query
  }
}
