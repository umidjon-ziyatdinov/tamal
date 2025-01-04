'use client';
import { Product } from "@/data/fakeData";
import { useState } from "react";
import { Route } from 'next';
import Image from "next/image";
import {
  FiShoppingCart,
  FiHeart,
  FiBarChart2,
  FiCheckCircle,
  FiTruck,
  FiPackage,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites, setFavorites } from "@/store/reducers/appReducer";
import Toastbody from "@/components/ToastBody";
import toast from "react-hot-toast";



interface ProductCardProps {
  product: Product;
}
type FavouriteItem = {
  productId: number;

};


export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter();

  const notifyAddToCart = () => {
    toast.custom(
      (t) => (
        <Toastbody
          show={t.visible}
          product={product}
          quantity={0}
          isBulkPrice={false}
          onClose={() => toast.dismiss(t.id)} // Use toast.dismiss with the toast id
          onViewCart={() => {
            toast.dismiss(t.id); // Dismiss toast before navigation
            router.push('/cart');
          }}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };
    const handleSaveFavourites = () => {
      const favouritesData = localStorage.getItem('favorites');
      let items: FavouriteItem[] = favouritesData ? JSON.parse(favouritesData) : [];
      
  
      const newItem: FavouriteItem = {
        productId: Number(product.id),
      };
  
      const existingItemIndex = items.findIndex(item => item.productId === Number(product.id));
      
      if (existingItemIndex > -1) {
        const updatedCart = items.map((item, index) => 
          index === existingItemIndex ? newItem : item
        );
        dispatch(setFavorites(updatedCart));
      } else {
        items.push(newItem);
        dispatch(addToFavorites(newItem?.productId));
      }
      notifyAddToCart()
  
    };

  const handleNavigate = () => {
    // Fixed: Use proper string concatenation for Next.js App Router

    router.push(`/products/${product.id}` as Route);
  };

  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleNavigate}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
      <img
          src={product.images.main}
          alt={product.name}

          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
     

          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.status?.onSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
            -{product.status.onSale.discountPercent}%
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if(isWishlisted){
              dispatch(removeFromFavorites(product.id))
            }else{
              handleSaveFavourites()
            }
            setIsWishlisted(!isWishlisted);
         
          }}
          className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
        >
          <FiHeart
            className={`${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"
            }`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">{product.brand}</p>
          <h3 className="font-medium text-gray-900 dark:text-gray-100 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Specifications Preview */}
        <div className="space-y-1 mb-3">
          {product.specifications.material && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Материал: {product.specifications.material}
            </p>
          )}
          {product.specifications.strength && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Прочность: {product.specifications.strength}
            </p>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center space-x-2 mb-3">
          {product.status?.inStock ? (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <FiCheckCircle className="mr-1" />
              <span className="text-sm">В наличии</span>
            </div>
          ) : (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Поставка: {product.stock.leadTime}
            </div>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {product.price.value.toLocaleString()} сум/{product.price.unit}
            </div>
            {product.status?.onSale && (
              <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {(
                  product.price.value *
                  (1 + product.status.onSale.discountPercent / 100)
                ).toLocaleString()}{" "}
                сум
              </div>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiShoppingCart />
            <span>В корзину</span>
          </button>
        </div>
      </div>
    </div>
  );
}