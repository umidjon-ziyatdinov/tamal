"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES, CategoryItemType } from '@/app/(categoryies)/enhance/data';
import { 

    StarIcon,

  } from '@heroicons/react/24/outline';

interface FeaturedCategoriesProps {
    categories?: CategoryItemType[];
    showSubcategories?: Boolean
  }

  
export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ categories=CATEGORIES, showSubcategories=false }) => {
    return (
      <div className="space-y-8">
        {/* Featured Swiper */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-10"
          >
            {categories.filter(cat => cat.featured).map((category) => (
              <SwiperSlide key={category.id}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm h-full"
                >
                  {category.imageUrl && (
                    <div className="relative h-48">
                      <img 
                        src={category.imageUrl} 
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                      {category.badges && (
                        <div className="absolute top-2 right-2 flex gap-1">
                          {category.badges.map((badge, idx) => (
                            <span key={idx} className="px-2 py-1 text-xs rounded-full bg-indigo-600 text-white">
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                      {category.icon && <category.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                    {category.stats && (
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{category.stats.products} товаров</span>
                        <div className="flex items-center">
                          <StarIcon className="w-4 h-4 mr-1" />
                          {category.stats.rating}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
  
        {/* Popular Subcategories Grid */}
  {showSubcategories &&      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories
            .filter(cat => cat.featured)
            .flatMap(cat => cat.subcategories || [])
   
            .map((subcat) => (
              <motion.a
                key={subcat.id}
                href={subcat.href}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  {subcat.name}
                </h4>
                {subcat.itemCount && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {subcat.itemCount} товаров
                  </p>
                )}
              </motion.a>
            ))}
        </div>}
      </div>
    );
  };