"use client";
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { Transition } from '@headlessui/react';
import { HiOutlineTrash, HiOutlineShoppingCart, HiOutlineExclamationCircle } from 'react-icons/hi';
import { FAKE_PRODUCTS, Product } from '@/data/fakeData';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromFavorites, setCart } from '@/store/reducers/appReducer';

interface FavoriteItem {
  productId: number;
}

type CartItem = {
    productId: number;
    quantity: number;
    price: number;
    bulkPrice?: boolean;
  };

const FavoritesPage = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const dispatch = useDispatch()
  const loadFavorites = () => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        const favoriteItems: FavoriteItem[] = JSON.parse(storedFavorites);
        // In a real application, you would fetch the product details from your API
        // This is a mock implementation

       
          const fetchedProducts = favoriteItems.map(cartItem => {
            const product = FAKE_PRODUCTS.find(p => Number(p.id) === Number(cartItem.productId));
            return product ? product : null;
          }).filter(Boolean) as Product[];
          
    
     

        setFavorites(fetchedProducts);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      setNotification('Ошибка при загрузке избранного');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
   
    loadFavorites();
  }, []);

  const removeFavorite = (productId: number) => {
    try {
     dispatch(removeFromFavorites(productId))
     loadFavorites();
     setNotification('Товар удален из избранного');
     setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error removing favorite:', error);
      setNotification('Ошибка при удалении из избранного');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleAddCart = (productId: number) => {
    try {
      // Implement your cart logic here
   const cartData = localStorage.getItem('cart');
      let cartItems: CartItem[] = cartData ? JSON.parse(cartData) : [];
      const product: Product = FAKE_PRODUCTS.find(i => i.id === productId)  as Product 
     
      const newItem: CartItem = {
        productId: Number(productId),
        quantity: 1,
        price: product.price.value,
        bulkPrice: false
      };
  
      const existingItemIndex = cartItems.findIndex(item => item.productId === Number(productId));
      
      if (existingItemIndex > -1) {
        const updatedCart = cartItems.map((item, index) => 
          index === existingItemIndex ? newItem : item
        );
        dispatch(setCart(updatedCart));
      } else {
        cartItems.push(newItem);
        dispatch(addToCart(newItem));
      }
      setNotification('Товар добавлен в корзину');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setNotification('Ошибка при добавлении в корзину');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Избранное</h1>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : favorites.length === 0 ? (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <div className="flex items-center">
            <HiOutlineExclamationCircle className="h-5 w-5 text-blue-400" />
            <p className="ml-3 text-blue-700">У вас пока нет товаров в избранном</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <Transition
              key={product.id}
              show={true}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <div className="relative aspect-square mb-4">
                    <Image
                      src={product.images.main}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
                      onClick={() => router.push(`/products/${product.id}`)}
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 
                      className="font-semibold text-lg cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => router.push(`/products/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600">{product.description.short}</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold">
                        {product.price.value.toLocaleString('ru-RU')} ₽/{product.price.unit}
                      </p>
                      {product.status?.inStock ? (
                        <span className="text-green-600 text-sm">В наличии</span>
                      ) : (
                        <span className="text-red-600 text-sm">Нет в наличии</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => removeFavorite(product.id)}
                        className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        <HiOutlineTrash className="h-5 w-5 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleAddCart(product.id)}
                        disabled={!product.status?.inStock}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <HiOutlineShoppingCart className="h-5 w-5" />
                        В корзину
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          ))}
        </div>
      )}

      {notification && (
        <div className="fixed top-[85px] right-4 z-[500]" >
          <Transition
            show={!!notification}
            enter="transition ease-out duration-300"
            enterFrom="transform translate-y-2 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition ease-in duration-200"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform translate-y-2 opacity-0"
          >
            <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg">
              {notification}
            </div>
          </Transition>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;