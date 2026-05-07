import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";



export const CreateUpdateProductAction = async (productLike: Partial<Product>):Promise<Product> =>{

    const {id,user,images=[], ...rest} = productLike

    const isCreate = id === 'new';

    rest.stock = Number(rest.stock) || 0
    rest.price = Number(rest.price) || 0

    const {data} = await tesloApi<Product>({
        url: isCreate ? '/products' : `/products/${id}`,
        method: isCreate ? 'POST' : 'PATCH',
        data: rest
    })

    return{
        ...data,
        images: data.images.map(image =>{
            if(image.includes("http")) return image
            return `${import.meta.env.VITE_API_URL}/files/product/${image}`
        })
    }

    
}