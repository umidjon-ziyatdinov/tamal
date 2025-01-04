"use client";
import { useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { FiFilter, FiGrid, FiList, FiChevronDown, FiChevronUp, FiTruck, FiPackage, FiAward } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// import { CategoryWithSubcategories } from '@/types/category';

// import { getBreadcrumbsFromSlug } from '@/utils/navigation';
import { FAKE_PRODUCTS, Product } from '@/data/fakeData';
import { ProductList } from '../components/ProductList';
import { CATEGORIES, CategoryItemType } from '../../enhance/data';
import { ProductCard } from '../components/ProductCard';

interface CategoryDetailPageProps {
  params: {
    slug: string[];
  };
}

export default function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [filterBrands, setFilterBrands] = useState<string[]>([]);
  
  // Derived from slug: /category or /category/subcategory
  const categoryId = params.slug[0];
  const subCategoryId = params.slug[1];

  // Simulated data fetch - in real app, use server components or React Query
  const category: CategoryItemType =  CATEGORIES.find(cat => cat.slug === categoryId)  as CategoryItemType;
  const products: Product[] = FAKE_PRODUCTS as Product[];
  const brands = Array.from(new Set(products.map((p) => p.brand)));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Category Info */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900">
        <div className="absolute inset-0">
          <img 
            src={category.imageUrl} 
            alt={category.name}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <nav className="text-sm text-white/80 mb-4">
          /building-materials/cement
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            {subCategoryId ? category.subcategories?.find(s => s.id === subCategoryId)?.name : category.name}
          </h1>
          <p className="text-white/90 max-w-2xl">
            {subCategoryId 
              ? category.subcategories?.find(s => s.id === subCategoryId)?.description 
              : category.description}
          </p>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 text-sm">
              <FiTruck className="text-blue-600 dark:text-blue-400" />
              <span className="dark:text-gray-200">Доставка по всей стране</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <FiPackage className="text-blue-600 dark:text-blue-400" />
              <span className="dark:text-gray-200">Оптовые цены</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <FiAward className="text-blue-600 dark:text-blue-400" />
              <span className="dark:text-gray-200">Гарантия качества</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full">
                      <span className="font-medium dark:text-white">Цена</span>
                      {open ? <FiChevronUp /> : <FiChevronDown />}
                    </Disclosure.Button>
                    <Disclosure.Panel className="pt-4">
                      <div className="space-y-4">
                        <input
                          type="range"
                          min={0}
                          max={10000}
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>{priceRange[0]} сум</span>
                          <span>{priceRange[1]} сум</span>
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <Disclosure as="div" className="mt-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full">
                      <span className="font-medium dark:text-white">Бренды</span>
                      {open ? <FiChevronUp /> : <FiChevronDown />}
                    </Disclosure.Button>
                    <Disclosure.Panel className="pt-4">
                      <div className="space-y-2">
                        {brands.map((brand) => (
                          <label key={brand} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={filterBrands.includes(brand)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilterBrands([...filterBrands, brand]);
                                } else {
                                  setFilterBrands(filterBrands.filter(b => b !== brand));
                                }
                              }}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm dark:text-gray-300">{brand}</span>
                          </label>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${
                      viewMode === 'grid' 
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <FiGrid />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${
                      viewMode === 'list' 
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <FiList />
                  </button>
                </div>

                <Menu as="div" className="relative z-[10000]">
                  <Menu.Button className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                    <span>Сортировать по: {sortBy}</span>
                    <FiChevronDown />
                  </Menu.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Menu.Items className="absolute z-[10000] right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                      {['popular', 'price-asc', 'price-desc', 'newest'].map((option) => (
                        <Menu.Item key={option}>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-blue-50 dark:bg-blue-900' : ''
                              } w-full text-left px-4 py-2 text-sm dark:text-gray-200`}
                              onClick={() => setSortBy(option)}
                            >
                              {option}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>

            {/* Products */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <ProductList key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {products.length === 0 && (
              <div className="text-center py-12">
                <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                  Товары не найдены
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Попробуйте изменить параметры фильтрации
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}