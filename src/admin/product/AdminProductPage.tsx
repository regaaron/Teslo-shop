// https://github.com/Klerith/bolt-product-editor

import { Navigate, useNavigate, useParams } from 'react-router';

import { useProduc } from '@/hooks/useProduc';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';


export const AdminProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {isLoading,isError,data: product, mutation} = useProduc(id || "")

    const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
    const subTitle =
        id === 'new'
            ? 'Aquí puedes crear un nuevo producto.'
            : 'Aquí puedes editar el producto.';

    const handleSubmit = async(productLike: Partial<Product> & {files?: File[]}) =>{
        await mutation.mutateAsync(productLike,{
            onSuccess: (data)=>{
                toast.success(`Producto ${id === 'new' ? 'creado' : 'actualizado'} con éxito`,
                    {
                        position: 'top-right',
                    }
                )
                navigate(`/admin/products/${data.id}`) 
            },
            onError: (error)=>{
                console.log("error en la mutacion", error);
                toast.error("Ocurrió un error al guardar el producto",
                    {
                        position: 'top-right',
                    }
                )
            }
        })
    }
    
    if(isError) return <Navigate to="/admin/products" />

    if(isLoading) return <CustomFullScreenLoading/> 

  if(!product) return <Navigate to="/admin/products" />

  return <ProductForm
    title={title}
    subTitle={subTitle}
    product={product}
    onSubmit={handleSubmit}
    isPendig= {mutation.isPending}
    />
 
};