'use client';
import React, { useEffect, useState } from 'react';
import { Dialog, Disclosure, Tab } from '@headlessui/react';
import { FiTruck, FiPackage, FiShield, FiArchive, FiStar, FiX, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';

import { format } from 'date-fns';
import { FAKE_PRODUCTS, Product } from '@/data/fakeData';
import Toastbody from '@/components/ToastBody';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart, addToFavorites, setCart, setFavorites } from '@/store/reducers/appReducer';


type Props = {
    params: {
      productId: string;
    };
  };
  type CartItem = {
    productId: number;
    quantity: number;
    price: number;
    bulkPrice?: boolean;
  };

  type FavouriteItem = {
    productId: number;
  
  };
  
  
  const ProductDetailPage = ({ params }: Props) => {
    const { productId } = params;
    return <ProductDetail productId={productId} />;
  };
  
  export default ProductDetailPage;
// Types
interface ProductDetailProps {
  productId: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.app.cart);
  
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isBulkOrder, setIsBulkOrder] = useState(false);

  const product = FAKE_PRODUCTS.find(i => Number(i.id) === Number(productId)) || {} as Product;

  const router = useRouter();

  useEffect(() => {
    if (product?.stock?.minOrder) {
      setQuantity(product.stock.minOrder);
    }
  }, [product]);




  useEffect(() => {
    // Reset added to cart message after 3 seconds
    if (addedToCart) {
      const timer = setTimeout(() => setAddedToCart(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  if (!productId) {
    return <div className="p-4">Error: Product ID is required</div>;
  }

  if (!product) {
    return <div className="p-4">Product not found</div>;
  }

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  const calculatePrice = (qty: number) => {
    if (product.price.bulkPrices && isBulkOrder) {
      // Sort bulk prices by quantity in descending order
      const applicableBulkPrice = [...product.price.bulkPrices]
        .sort((a, b) => b.quantity - a.quantity)
        .find(bulk => qty >= bulk.quantity);
      
      return applicableBulkPrice ? applicableBulkPrice.price : product.price.value;
    }
    
    if (product.status?.onSale) {
      return product.price.value * (1 - product.status.onSale.discountPercent / 100);
    }
    
    return product.price.value;
  };

  const handleQuantityChange = (newQuantity: number) => {
    const validatedQuantity = Math.max(
      product.stock.minOrder,
      Math.min(newQuantity, product.stock.maxOrder)
    );
    setQuantity(validatedQuantity);
  };

  const calculateDiscount = () => {
    if (product.status?.onSale) {
      const discountedPrice = product.price.value * (1 - product.status.onSale.discountPercent / 100);
      return {
        original: product.price.value,
        discounted: discountedPrice,
        savings: product.price.value - discountedPrice,
      };
    }
    return null;
  };
  const discount = calculateDiscount();
  const notifyAddToCart = () => {
    toast.custom(
      (t) => (
        <Toastbody
          show={t.visible}
          product={product}
          quantity={quantity}
          isBulkPrice={isBulkOrder}
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
  const handleAddToCart = () => {
    const cartData = localStorage.getItem('cart');
    let cartItems: CartItem[] = cartData ? JSON.parse(cartData) : [];
    
    const currentPrice = calculatePrice(quantity);
    const newItem: CartItem = {
      productId: Number(productId),
      quantity,
      price: currentPrice,
      bulkPrice: isBulkOrder
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


    notifyAddToCart()
    setAddedToCart(true);
  };

  const handleSaveFavourites = () => {
    const favouritesData = localStorage.getItem('favorites');
    let items: FavouriteItem[] = favouritesData ? JSON.parse(favouritesData) : [];
    

    const newItem: FavouriteItem = {
      productId: Number(productId),
    };

    const existingItemIndex = items.findIndex(item => item.productId === Number(productId));
    
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
    setAddedToCart(true);
  };



  // Add this section after the delivery section and before the tabs
  const renderQuantitySelector = () => (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="quantity" className="text-sm font-medium text-gray-900 dark:text-white">
          Количество ({product.price.unit})
        </label>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
            disabled={quantity <= product.stock.minOrder}
          >
            <FiMinus className="w-4 h-4" />
          </button>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            className="w-20 px-3 py-2 border rounded-md text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min={product.stock.minOrder}
            max={product.stock.maxOrder}
          />
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
            disabled={quantity >= product.stock.maxOrder}
          >
            <FiPlus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {product.price.bulkPrices && (
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isBulkOrder}
              onChange={(e) => setIsBulkOrder(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-900 dark:text-white">
              Применить оптовые цены
            </span>
          </label>
          {isBulkOrder && (
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Текущая цена: {calculatePrice(quantity)} ₽/{product.price.unit}
              </div>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={!product.status?.inStock || quantity < product.stock.minOrder}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <FiShoppingCart className="w-5 h-5" />
        <span>Добавить в корзину</span>
      </button>

      {addedToCart && (
        <div className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 p-3 rounded-md text-sm">
          Товар добавлен в корзину
        </div>
      )}

      {!product.status?.inStock && (
        <div className="text-red-600 dark:text-red-400 text-sm">
          Товар временно отсутствует в наличии
        </div>
      )}

      <div className="text-sm text-gray-500 dark:text-gray-400">
        Минимальный заказ: {product.stock.minOrder} {product.price.unit}
        <br />
        Максимальный заказ: {product.stock.maxOrder} {product.price.unit}
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <nav className="px-4 py-3 bg-white dark:bg-gray-800 shadow-sm">
        <ol className="flex space-x-2 text-sm">
          <li className="text-gray-500 dark:text-gray-400">{product.category.main}</li>
          <li className="text-gray-500 dark:text-gray-400">/</li>
          <li className="text-gray-500 dark:text-gray-400">{product.category.sub}</li>
          <li className="text-gray-500 dark:text-gray-400">/</li>
          <li className="text-gray-900 dark:text-white font-medium">{product.name}</li>
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Header */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Image Gallery */}
          <div className="mb-8 lg:mb-0">
            <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
              <img
                src={product.images.main}
                alt={product.name}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => openImageModal(product.images.main)}
              />
              {product.status?.onSale && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                  -{product.status.onSale.discountPercent}%
                </div>
              )}
            </div>
            {product.images.gallery && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className="aspect-square rounded-lg object-cover cursor-pointer hover:opacity-75 transition"
                    onClick={() => openImageModal(image)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating?.average || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  ({product.rating?.count} отзывов)
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">SKU: {product.sku}</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {discount ? (
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {discount.discounted.toFixed(2)} ₽/{product.price.unit}
                  </div>
                  <div className="text-lg text-gray-500 line-through">
                    {discount.original.toFixed(2)} ₽
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Экономия: {discount.savings.toFixed(2)} ₽
                  </div>
                </div>
              ) : (
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {product.price.value} ₽/{product.price.unit}
                </div>
              )}

              {product.price.bulkPrices && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Оптовые цены:
                  </h3>
                  <div className="space-y-2">
                    {product.price.bulkPrices.map((bulk, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span>от {bulk.quantity} {product.price.unit}</span>
                        <span>{bulk.price} ₽/{product.price.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.status?.inStock ? (
                <div className="text-green-600 dark:text-green-400 flex items-center">
                  <FiPackage className="w-5 h-5 mr-2" />
                  В наличии ({product.stock.available} {product.price.unit})
                </div>
              ) : (
                <div className="text-red-600 dark:text-red-400 flex items-center">
                  <FiPackage className="w-5 h-5 mr-2" />
                  Нет в наличии
                </div>
              )}
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Склад: {product.stock.warehouse}
              </div>
            </div>

            {/* Delivery Options */}
            {product.delivery && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Способы доставки:
                </h3>
                <div className="space-y-2">
                  {product.delivery.methods.map((method, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center">
                        <FiTruck className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {method.type === 'pickup' ? 'Самовывоз' : 'Доставка'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {method.estimatedDays} {method.estimatedDays === 0 ? 'дней' : 'дня'}
                          </div>
                        </div>
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {method.price === 0 ? 'Бесплатно' : `${method.price} ₽`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

{renderQuantitySelector()}
      
            {/* Product Tabs */}
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                    ${
                      selected
                        ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`
                  }
                >
                  Описание
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                    ${
                      selected
                        ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`
                  }
                >
                  Характеристики
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                    ${
                      selected
                        ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`
                  }
                >
                  Отзывы
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-4">
                <Tab.Panel className="rounded-xl bg-white dark:bg-gray-800 p-4">
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{product.description.full}</p>
                    {product.description.technical && (
                      <div className="mt-4">
                        <h3 className="text-lg font-medium mb-2">Технические характеристики</h3>
                        <p>{product.description.technical}</p>
                      </div>
                    )}
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-xl bg-white dark:bg-gray-800 p-4">
                  <dl className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {key}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                          {typeof value === 'object' ? JSON.stringify(value) : value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Tab.Panel>
                <Tab.Panel className="rounded-xl bg-white dark:bg-gray-800 p-4">
                  {product.rating?.reviews ? (
                    <div className="space-y-4">
                      {product.rating.reviews.map((review, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-200 dark:border-gray-700 pb-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {review.author}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {format(new Date(review.date), 'dd.MM.yyyy')}
                              </div>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">Нет отзывов</p>
                  )}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <Dialog
        open={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <FiX className="w-6 h-6" />
            </button>
            <div className="p-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

