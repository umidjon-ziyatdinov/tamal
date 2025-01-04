import React, { FC } from "react";
import Image from "next/image";
import HIW1img from "@/images/HIW1img.png";
import HIW2img from "@/images/HIW2img.png";
import HIW3img from "@/images/HIW3img.png";
import HIW4img from "@/images/HIW4img.png";

export interface SectionHowItWorkProps {
  className?: string;
  data?: typeof DEMO_DATA[0][];
}

const DEMO_DATA = [
  {
    id: 1,
    img: HIW1img,
    title: "Фильтрация и поиск",
    desc: "Умные фильтры и рекомендации помогут найти нужный товар.",
  },
  {
    id: 2,
    img: HIW2img,
    title: "Добавление в корзину",
    desc: "Выбирайте товары и добавляйте их в корзину одним кликом.",
  },
  {
    id: 3,
    img: HIW3img,
    title: "Быстрая доставка",
    desc: "Товары оперативно доставляются на ваш адрес.",
  },
  {
    id: 4,
    img: HIW4img,
    title: "Получение и использование",
    desc: "Наслаждайтесь качественной продукцией.",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <section className={`py-10 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Как это работает
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={item.img}
                alt={item.title}
                className="w-24 h-24 mb-4 object-contain"
              />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionHowItWork;
