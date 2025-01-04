'use client';
import React, { useState } from 'react';
import NcImage from '@/shared/NcImage/NcImage';
import rightImgDemo from '@/images/rightLargeImg.png';
import rightLargeImgDark from '@/images/rightLargeImgDark.png';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Logo from '@/shared/Logo/Logo';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import RequestDialog from './RequestDialog';
import { useRouter } from 'next/navigation';


const SectionPromo1: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const exploreProducts = () => {
    router.push('/search');
  };

  return (
    <div className="nc-SectionPromo1 relative flex flex-col lg:flex-row items-center">
      <div className="relative flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <Logo className="w-28" />
        <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 leading-tight tracking-tight">
          Зарабатывайте с Tamal
        </h2>
        <span className="block mt-6 text-slate-500 dark:text-slate-400">
          С Tamal вы получите бесплатную доставку и скидки...
        </span>
        <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
          <ButtonPrimary onClick={openDialog}>
            Отправить запрос
          </ButtonPrimary>
          <ButtonSecondary onClick={exploreProducts}>
            Исследовать продукты
          </ButtonSecondary>
        </div>
      </div>
      <div className="relative flex-1 max-w-xl lg:max-w-none">
        <NcImage
          alt=""
          containerClassName="block dark:hidden"
          src={rightImgDemo}
          sizes="(max-width: 768px) 100vw, 50vw"
          className=""
        />
        <NcImage
          alt=""
          containerClassName="hidden dark:block"
          src={rightLargeImgDark}
          sizes="(max-width: 768px) 100vw, 50vw"
          className=""
        />
      </div>
      <RequestDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
};

export default SectionPromo1;
