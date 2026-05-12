import { useProduc } from "@/hooks/useProduc"
import { useState } from "react"
import { useParams } from "react-router"



export const ProductPage = () => {
    const {id} = useParams()
    const {data,isLoading,isError} = useProduc(id || "")

    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState(0)
    
    const genderLabel: Record<string, string> = {
        men: "HOMBRES",
        women: "MUJERES",
        kid: "NIÑOS",
        unisex: "UNISEX",
    }


    if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto px-6 py-10">
        <div className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
        <div className="flex flex-col gap-4 pt-4">
          <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
          <div className="h-10 w-3/4 rounded bg-gray-200 animate-pulse" />
          <div className="h-8 w-1/3 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-gray-200 animate-pulse" />
          <div className="h-12 w-full rounded-xl bg-gray-200 animate-pulse mt-4" />
        </div>
      </div>
    )
  }

 
  if (isError) {
    
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
      <span className="text-6xl">😵</span>
      <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">
        Algo salió mal
      </h2>
      <p className="text-sm text-gray-400 max-w-xs">
        No pudimos cargar el producto. Intenta de nuevo más tarde.
      </p>
      <button
        onClick={() => window.history.back()}
        className="mt-2 px-6 py-3 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gray-700 transition-colors duration-200"
      >
        ← Volver
      </button>
    </div>
  )
}
 
  const { title, price, description, sizes, gender, stock, images, tags } = data!
   
    
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto px-6 py-10">
 
      {/* Gallery */}
      <div className="flex flex-col gap-3">
        <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square group">
          <img
            src={images[selectedImage]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {stock > 0 && stock <= 5 && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              ¡Solo quedan {stock}!
            </span>
          )}
          {stock === 0 && (
            <span className="absolute top-3 left-3 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Agotado
            </span>
          )}
        </div>
 
        {images.length > 1 && (
          <div className="flex gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-gray-100
                  ${selectedImage === i
                    ? "border-red-600 scale-105"
                    : "border-transparent hover:border-gray-400"
                  }`}
              >
                <img src={img} alt={`${title} ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
 
      {/* Product Info */}
      <div className="flex flex-col gap-5 pt-2">
 
        <p className="text-xs font-semibold tracking-[0.15em] text-gray-400 uppercase">
          {genderLabel[gender] ?? gender.toUpperCase()} · {tags.join(", ").toUpperCase()}
        </p>
 
        <h1 className="text-4xl font-black uppercase tracking-tight leading-none text-gray-900">
          {title}
        </h1>
 
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">${price}</span>
          <span className="text-sm font-medium text-gray-400">USD</span>
        </div>
 
        {/* Size selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-[0.12em] text-gray-500 uppercase">Talla</span>
            {selectedSize && (
              <span className="text-xs font-bold tracking-wider text-red-600 uppercase">
                {selectedSize} seleccionada
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[52px] h-11 px-3 rounded-lg border-[1.5px] text-sm font-semibold tracking-wide transition-all duration-150
                  ${selectedSize === size
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "bg-white border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
 
        {/* CTA */}
        <button
          disabled={!selectedSize || stock === 0}
          className={`py-3.5 w-full rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200
            ${!selectedSize || stock === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] shadow-lg shadow-red-200"
            }`}
        >
          {stock === 0
            ? "Producto agotado"
            : !selectedSize
            ? "Selecciona una talla"
            : "Agregar al carrito"}
        </button>
 
        <hr className="border-gray-100" />
 
        {/* Description */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold tracking-[0.12em] text-gray-500 uppercase">Descripción</h2>
          <p className="text-sm leading-relaxed text-gray-500">{description}</p>
        </div>
 
        {/* Stock */}
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${stock > 0 ? "bg-emerald-500" : "bg-red-500"}`} />
          <span className="text-xs text-gray-400">
            {stock > 0 ? `${stock} unidades disponibles` : "Sin stock"}
          </span>
        </div>
 
      </div>
    </div>
    )
}
