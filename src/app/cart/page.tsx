"use client";
import React, { useEffect, useState } from 'react';
import { Trash2, ChevronRight, AlertCircle, Loader  } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FAKE_PRODUCTS, Product } from '@/data/fakeData';
import { Route } from 'next';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCart } from '@/store/reducers/appReducer';

 type CartItem = {
  productId: number;
  quantity: number;
  price: number;
  bulkPrice?: boolean;
};

const CartPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartProducts, setCartProducts] = useState<(Product & { cartInfo: CartItem })[]>([]);
const  dispatch = useDispatch()
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart) as CartItem[];
      setCartItems(parsedCart);
      
      const productsWithCartInfo = parsedCart.map(cartItem => {
        const product = FAKE_PRODUCTS.find(p => Number(p.id) === Number(cartItem.productId));
        return product ? { ...product, cartInfo: cartItem } : null;
      }).filter(Boolean) as (Product & { cartInfo: CartItem })[];
      
      setCartProducts(productsWithCartInfo);
    }
  }, []);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Update products with cart info
    const updatedProducts = cartProducts.map(product =>
      product.id === productId 
        ? { ...product, cartInfo: { ...product.cartInfo, quantity: newQuantity } }
        : product
    );
    setCartProducts(updatedProducts);
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCart);
    dispatch(setCart(updatedCart))
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartProducts(prev => prev.filter(p => p.id !== productId));
    toast.success('Товар удален из корзины', {
      duration: 2000, // Duration in milliseconds (2 seconds)
  });
  
  };

  const calculateSubtotal = () => {
    return cartProducts.reduce((total, product) => {
      const price = product.cartInfo.bulkPrice 
        ? (product.price.bulkPrices?.find(bp => bp.quantity <= product.cartInfo.quantity)?.price || product.price.value)
        : product.price.value;
      return total + (price * product.cartInfo.quantity);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = cartProducts.length > 0 ? 500 : 0; // Example shipping cost
    const tax = subtotal * 0.20; // 20% tax example
    return subtotal + shipping + tax;
  };


  const handleCheckout = async () => {
    const loadingToast = toast.loading('Обработка заказа...');
    
    try {
      setIsProcessing(true);

      const orderSummary = {
        subtotal: calculateSubtotal(),
        shipping: cartProducts.length > 0 ? 500 : 0,
        tax: calculateSubtotal() * 0.20,
        total: calculateTotal()
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_PDF_API_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartProducts,
          orderSummary,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Произошла ошибка при оформлении заказа');
      }

      // Download PDF
      const pdfBuffer = Buffer.from(data.pdfBuffer, 'base64');
      const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'заказ.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      // Clear cart
      localStorage.removeItem('cart');
      setCartItems([]);
      setCartProducts([]);

      toast.success('Заказ успешно оформлен! PDF-файл сохранен.', {
        duration: 5000,
      });
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Произошла ошибка при оформлении заказа');
    } finally {
      toast.dismiss(loadingToast);
      setIsProcessing(false);
    }
  };
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Корзина</h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">Главная</Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span>Корзина</span>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            {cartProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">Ваша корзина пуста</p>
                <Link 
                  href={"/products" as Route}
                  className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Перейти к покупкам
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    {/* Product Image */}
                    <Link 
                      href={`/products/${product.id}` as Route} 
                      className="relative w-full sm:w-32 h-32 bg-white dark:bg-gray-700 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={product.images.main}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link 
                            href={`/products/${product.id}` as Route}
                            className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {product.brand} • {product.specifications.material}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(product.id, product.cartInfo.quantity - 1)}
                            className="p-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            -
                          </button>
                          <span className="w-12 text-center">{product.cartInfo.quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, product.cartInfo.quantity + 1)}
                            className="p-1 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            +
                          </button>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {product.price.unit}
                          </span>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-medium text-gray-900 dark:text-white">
                            {(product.cartInfo.price * product.cartInfo.quantity).toFixed(2)} ₽
                          </div>
                          {product.cartInfo.bulkPrice && (
                            <div className="text-sm text-green-600 dark:text-green-400">
                              Оптовая цена
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Сводка заказа
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Подытог</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {calculateSubtotal().toFixed(2)} ₽
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Доставка</span>
                  <span className="font-medium text-gray-900 dark:text-white">500.00 ₽</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">НДС (20%)</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {(calculateSubtotal() * 0.2).toFixed(2)} ₽
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      Итого
                    </span>
                    <span className="text-base font-medium text-gray-900 dark:text-white">
                      {calculateTotal().toFixed(2)} ₽
                    </span>
                  </div>
                </div>
              </div>

              <button
        disabled={cartProducts.length === 0 || isProcessing}
        onClick={handleCheckout}
        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <Loader className="animate-spin mr-2" />
            Обработка...
          </>
        ) : (
          'Оформить заказ'
        )}
      </button>
      

              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span>
                  Нажимая «Оформить заказ», вы соглашаетесь с условиями покупки
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;