"use client";
import React, { FC, useEffect, useId, useState } from "react";
import Heading from "@/components/Heading/Heading";
import { HeartIcon as HeartOutline } from "lucide-react";
import { HeartIcon as HeartSolid } from "lucide-react";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import { Product } from "@/data/fakeData";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: Product[];
}

const ProductCard: FC<{ data: Product }> = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Status Badge */}
      {data.status?.isNew && (
        <span className="absolute top-2 left-2 z-10 bg-blue-600 text-white px-2 py-1 text-xs font-medium rounded">
          Новинка
        </span>
      )}
      
      {/* Favorite Button */}
      <button 
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
      >
        {isFavorite ? (
          <HeartSolid className="w-5 h-5 text-red-500" />
        ) : (
          <HeartOutline className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Image */}
      <div className="aspect-square overflow-hidden rounded-t-lg">
        <img
          src={data.images.main}
          alt={data.name}
          className="w-full h-full object-contain max-h-[200px] transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category & Brand */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{data.category.sub}</span>
          <span className="text-sm font-medium">{data.brand}</span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-medium mb-2 line-clamp-2">{data.name}</h3>

        {/* Specifications Preview */}
        <div className="space-y-1 mb-3">
          {data.specifications.material && (
            <p className="text-sm text-gray-600">
              Материал: {data.specifications.material}
            </p>
          )}
          {data.specifications.strength && (
            <p className="text-sm text-gray-600">
              Прочность: {data.specifications.strength}
            </p>
          )}
        </div>

        {/* Price & Stock */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-xl font-bold">
              {formatPrice(data.price.value)}/{data.price.unit}
            </p>
            {data.stock.available > 0 ? (
              <span className="text-sm text-green-600">В наличии</span>
            ) : (
              <span className="text-sm text-red-600">Под заказ</span>
            )}
          </div>

          {/* See More Link */}
          <a
            href={`/products/${data.id}`}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Подробнее
          </a>
        </div>
      </div>
    </div>
  );
};

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "Качественные строительные материалы",
  data = [],
}) => {
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      perView: 4,
      gap: 24,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4,
          gap: 24,
        },
        1024: {
          perView: 3,
          gap: 20,
        },
        768: {
          perView: 2,
          gap: 16,
        },
        640: {
          perView: 1.5,
          gap: 12,
        },
        500: {
          perView: 1.2,
          gap: 12,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    setIsShow(true);

    return () => {
      slider.destroy();
    };
  }, [UNIQUE_CLASS]);

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `Новые поступления`}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {data.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <ProductCard data={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;