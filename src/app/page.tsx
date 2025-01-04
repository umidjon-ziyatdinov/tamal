import React from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionPromo1 from "@/components/SectionPromo1";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
import SectionSliderLargeProduct from "@/components/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "@/components/SectionPromo2";
import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories";
import SectionPromo3 from "@/components/SectionPromo3";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import Heading from "@/components/Heading/Heading";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { PRODUCTS, SPORT_PRODUCTS } from "@/data/data";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import SectionMagazine5 from "@/app/blog/SectionMagazine5";
import ManufacturersSlider from "@/shared/ClientSlider/ClientSlider";

import { CATEGORIES } from "./(categoryies)/enhance/data";
import { FeaturedCategories } from "@/components/FeaturedCategories/FeaturedCategories";
import NewArrivals from "@/components/NewArrivalSection";
import { FAKE_PRODUCTS } from "@/data/fakeData";

function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      <SectionHero2 />
      <div className=" flex flex-col space-y-5 mt-12 px-5 lg:mt-32">
      <Heading
        className=" text-neutral-900 dark:text-neutral-50 nc-p-r-container "
        desc=""       
      >
    Найдите все, что вам нужно, организованное специально для вас
      </Heading>
   
      <FeaturedCategories />
      </div>
 
      <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider />
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
   <NewArrivals data={FAKE_PRODUCTS.slice(0, 5)} />
<ManufacturersSlider />
        <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div>
        <SectionPromo1 />

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>

        <SectionSliderProductCard
          heading="Best Sellers"
          subHeading="Best selling of the month"
        />

        <SectionPromo2 />

        <SectionSliderLargeProduct cardStyle="style2" />

        <SectionSliderCategories />

        <SectionPromo3 />

        <SectionGridFeatureItems />

        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the Ciseco blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div>
        <SectionClientSay />
      </div>
    </div>
  );
}

export default PageHome;
