import { CreateUpdateProductAction } from "@/admin/action/create-update-product.action"
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

  const mutation = useMutation({
    mutationFn: CreateUpdateProductAction,
    onSuccess: (product:Product) =>{
      console.log("todo salio bien en la mutacion", product);
       
    }
  })

  //TODO mutacion
  //  const handleSubmitForm = async (productLike: Partial<Product>)=>{
  //       console.log({productLike});
  //   }


    return {
        ...query,
        mutation
        
  }
}
