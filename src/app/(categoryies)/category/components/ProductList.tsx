"use-client"
import { Product } from '@/data/fakeData';
import { useState } from 'react';
import { FiShoppingCart, FiHeart, FiBarChart2, FiCheckCircle, FiTruck, FiPackage } from 'react-icons/fi';




interface ProductListProps {
  product: Product;
}

export function ProductList({ product }: ProductListProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="relative w-full md:w-48 h-48">
          <img
            src={product.images.main}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          />
          {product.status?.onSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              -{product.status.onSale.discountPercent}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{product.brand}</p>
              <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">
                {product.name}
              </h3>
            </div>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <FiHeart
                className={`${
                  isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'
                }`}
              />
            </button>
          </div>

          {/* Detailed Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
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
              {product.specifications.dimensions && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Размеры: {product.specifications.dimensions.length}x
                  {product.specifications.dimensions.width}x
                  {product.specifications.dimensions.height} {product.specifications.dimensions.unit}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FiTruck className="mr-2" />
                <span>Доставка: {product.stock.leadTime || 'В наличии'}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FiPackage className="mr-2" />
                <span>Мин. заказ: {product.stock.minOrder} {product.price.unit}</span>
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">
                {product.price.value.toLocaleString()} сум/{product.price.unit}
              </div>
              {product.status?.onSale && (
                <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  {(
                    product.price.value *
                    (1 + product.status.onSale.discountPercent / 100)
                  ).toLocaleString()} сум
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                Подробнее
              </button>
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                <FiShoppingCart />
                <span>В корзину</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}