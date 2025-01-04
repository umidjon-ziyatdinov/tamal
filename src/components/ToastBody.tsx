import React, { FC } from "react";
import { Transition } from "@headlessui/react";
import { FiShoppingCart, FiX } from "react-icons/fi";
import { Product } from "@/data/fakeData";

interface Props {
  show: boolean;
  product: Product;
  quantity: number;
  isBulkPrice?: boolean;
  onClose: () => void;
  onViewCart: () => void;
}

const Toastbody: FC<Props> = ({
  show,
  product,
  quantity,
  isBulkPrice,
  onClose,
  onViewCart,
}) => {
  const calculatePrice = () => {
    if (isBulkPrice && product.price.bulkPrices) {
      const applicableBulkPrice = [...product.price.bulkPrices]
        .sort((a, b) => b.quantity - a.quantity)
        .find(bulk => quantity >= bulk.quantity);
      
      return applicableBulkPrice ? applicableBulkPrice.price : product.price.value;
    }
    
    if (product.status?.onSale) {
      return product.price.value * (1 - product.status.onSale.discountPercent / 100);
    }
    
    return product.price.value;
  };

  const renderPrice = () => {
    const price = calculatePrice();
    const totalPrice = price * quantity;
    
    return (
      <div className="flex items-center space-x-2">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          {totalPrice.toFixed(2)} ₽
        </span>
        {isBulkPrice && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({price.toFixed(2)} ₽/{product.price.unit})
          </span>
        )}
      </div>
    );
  };

  const renderProductInfo = () => {
    return (
      <div className="flex space-x-4">
        {/* Left side - Image */}
        <div className="h-24 w-24 flex-shrink-0 relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
          <img
            src={product.images.main}
            alt={product.name}
            className="h-full w-full object-contain object-center"
          />
          {product.status?.onSale && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -{product.status.onSale.discountPercent}%
            </div>
          )}
        </div>

        {/* Right side - Product Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Product Info */}
          <div className="space-y-1">
            {/* Product Name */}
            <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
              {product.name}
            </h3>

            {/* Brand and Material - Stacked on mobile */}
            <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <div className="flex items-center">
                <span className="truncate">{product.brand}</span>
              </div>
              {product.specifications.material && (
                <div className="flex items-center">
                  <span className="truncate">{product.specifications.material}</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="mt-2">
              {renderPrice()}
            </div>
          </div>

          {/* Bottom Section - Quantity and Actions */}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Кол-во: {quantity} {product.price.unit}
            </span>
            <button
              type="button"
              onClick={onViewCart}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Просмотр корзины
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Transition
      show={show}
      appear
    className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
      enter="transition-all duration-300"
      enterFrom="opacity-0 translate-y-2 translate-x-2"
      enterTo="opacity-100 translate-y-0 translate-x-0"
      leave="transition-all duration-300"
      leaveFrom="opacity-100 translate-y-0 translate-x-0"
      leaveTo="opacity-0 translate-y-2 translate-x-2"
    >

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FiShoppingCart className="w-5 h-5 text-green-500" />
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              Товар добавлен в корзину
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <hr className="border-gray-200 dark:border-gray-700 mb-4" />
        {renderProductInfo()}
        
        {isBulkPrice && (
          <div className="mt-4 text-sm text-green-600 dark:text-green-400">
            Применена оптовая цена
          </div>
        )}
 
    </Transition>
  );
};

export default Toastbody;