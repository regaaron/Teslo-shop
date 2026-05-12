import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "../components/CustomJumbotron";
import { ProductsGrid } from "../components/ProductsGrid";

import { useProducts } from "@/hooks/useProducts";
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";

export const HomePage = () => {
  const { data, isLoading } = useProducts();
  return (
    <>
      <CustomJumbotron title="Todos los productos" />
      {isLoading ? (
        <CustomFullScreenLoading />
      ) : (
        <ProductsGrid products={data?.products || []} />
      )}

      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};
