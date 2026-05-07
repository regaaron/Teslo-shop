import { getProductByIdAction } from "@/admin/action/get-product-by-id.action"
import type { Product } from "@/interfaces/product.interface"
import { useMutation, useQuery } from "@tanstack/react-query"




export const useProduc = (id:string) => {
  
  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5
  })

  // const mutation = useMutation()

  //TODO mutacion
   const handleSubmitForm = async (productLike: Partial<Product>)=>{
        console.log({productLike});
    }


    return {
        ...query,
        handleSubmitForm
        
  }
}
