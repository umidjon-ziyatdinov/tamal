"use client";
import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRightIcon,
  MagnifyingGlassIcon,
  FireIcon,
  StarIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import { IconType } from 'react-icons';
import { CATEGORIES } from '../enhance/data';
import { FeaturedCategories } from '@/components/FeaturedCategories/FeaturedCategories';

// Enhanced interface with new fields
interface CategoryItemType {
  id: string;
  name: string;
  href: string;
  slug: string;
  icon?: IconType;
  description?: string;
  featured?: boolean;
  subcategories?: CategoryItemType[];
  imageUrl?: string;
  itemCount?: number;
  stats?: {
    products: number;
    views: number;
    rating: number;
  };
  badges?: string[];
  lastUpdated?: string;
  trendingScore?: number;
}

interface FeaturedCategoriesProps {
  categories: CategoryItemType[];
}

interface AllCategoriesProps {
  categories: CategoryItemType[];
}
const CategoriesPage = () => {
  const [selectedView, setSelectedView] = useState('featured');
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white mb-8">
          <div className="relative z-10">
            <h1 className="text-2xl font-bold mb-2">
              Исследуйте категории
            </h1>
            <p className="text-indigo-100 max-w-xl">
              Найдите все, что вам нужно, организованное специально для вас
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10">
            <TagIcon className="w-64 h-64" />
          </div>
        </div>

        {/* Tab Navigation */}
        <Tab.Group>
          <Tab.List className="flex space-x-2 rounded-xl bg-white dark:bg-gray-800 p-2 shadow-sm mb-6">
            <Tab className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected 
                ? 'bg-indigo-600 text-white shadow'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }>
              Избранное
            </Tab>
            <Tab className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected 
                ? 'bg-indigo-600 text-white shadow'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }>
              Все категории
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <FeaturedCategories categories={CATEGORIES} showSubcategories />
            </Tab.Panel>
            <Tab.Panel>
              <AllCategories categories={CATEGORIES} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};



const AllCategories: React.FC<AllCategoriesProps> = ({ categories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<null | String>(null);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Поиск категорий..."
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories
          .filter(cat => 
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.subcategories?.some(sub => 
              sub.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
          .map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
            >
              <button
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  {category.icon && <category.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                </div>
                <ChevronRightIcon 
                  className={`h-5 w-5 text-gray-400 transform transition-transform
                    ${selectedCategory === category.id ? 'rotate-90' : ''}`}
                />
              </button>
              
              <AnimatePresence>
                {selectedCategory === category.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 ml-8 space-y-2"
                  >
                    {category.subcategories?.map((subcat) => (
                      <motion.a
                        key={subcat.id}
                        href={subcat.href}
                        className="block text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                        whileHover={{ x: 4 }}
                      >
                        {subcat.name}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default CategoriesPage;