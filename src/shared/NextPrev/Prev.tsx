"use client";
import React, { FC } from "react";

export interface PrevProps {
  btnClassName?: string;
  className?: string;
  svgSize?: string;
  onClickPrev?: () => void;
}

const Prev: FC<PrevProps> = ({
  className = "relative",
  onClickPrev = () => {},
  btnClassName = "w-10 h-10",
  svgSize = "w-5 h-5",
}) => {
  return (
    <div
      className={`nc-Prev text-slate-500 dark:text-slate-400 ${className}`}
      data-glide-el="controls"
    >
      <button
            className={`
              group
              fixed
              flex
              items-center
              justify-center
              w-10
              h-10
              sm:w-12
              sm:h-12
              rounded-full
              border-2
              border-gray-200
              dark:border-gray-700
              bg-white/90
              dark:bg-gray-800/90
              backdrop-blur
              transition-all
              duration-200
              hover:border-gray-300
              dark:hover:border-gray-600
              hover:bg-white
              dark:hover:bg-gray-800
              hover:scale-110
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-blue-500
              dark:focus:ring-blue-400
        'left-2 sm:left-6
              top-1/2
              -translate-y-1/2
              z-10
              shadow-lg
              ${className}
            `}
            aria-label='Previous' 
        onClick={onClickPrev}
        title="Prev"
        data-glide-dir="<"
      >
        <svg className={svgSize} viewBox="0 0 24 24" fill="none">
          <path
            d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.5 12H3.67004"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Prev;
