
import ncNanoId from "@/utils/ncNanoId";
import type { Route } from 'next';
// Import Heroicons
import {
  FaHammer,
  FaPaintRoller,
  FaToilet,
  FaPlug,
  FaWrench,
  FaDoorOpen,
  FaScrewdriver,
  FaLeaf,
  FaSquare,
  FaKitchenSet,
  FaCartShopping,
  FaShieldHalved,
  FaCircleQuestion,
  FaPercent,
  FaTruckFast,
  FaTruck,
  FaLock
} from 'react-icons/fa6';
import type { IconType } from 'react-icons';
// Import React Icons
import { GiKitchenTap as KitchenIcon, GiWaterDrop as FaucetIcon } from "react-icons/gi"; // Kitchen and Faucet icons
import { TbWindow as WindowIcon } from "react-icons/tb"; // Window icon
import { ReactNode } from "react";
import { NavItemType } from "@/shared/Navigation/NavigationItem";



const MEGAMENU_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Clothing",
    children: [
      { id: ncNanoId(), href: "/collection", name: "Activewear" },
      { id: ncNanoId(), href: "/collection", name: "Coats & Jackets" },
      { id: ncNanoId(), href: "/collection", name: "Sleep & Lounge" },
      { id: ncNanoId(), href: "/collection", name: "Sweatshirts" },
      { id: ncNanoId(), href: "/collection", name: "Hoodies" },
      { id: ncNanoId(), href: "/collection", name: "Underwear" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Accessories",
    children: [
      { id: ncNanoId(), href: "/collection-2", name: "Sunglasses" },
      { id: ncNanoId(), href: "/collection-2", name: "Gloves" },
      { id: ncNanoId(), href: "/collection-2", name: "Scarves" },
      { id: ncNanoId(), href: "/collection-2", name: "Wallets" },
      { id: ncNanoId(), href: "/collection-2", name: "Watches" },
      { id: ncNanoId(), href: "/collection-2", name: "Belts" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Shoes",
    children: [
      { id: ncNanoId(), href: "/collection", name: "Boots" },
      { id: ncNanoId(), href: "/collection", name: "Loafers " },
      { id: ncNanoId(), href: "/collection", name: "Slip-Ons" },
      { id: ncNanoId(), href: "/collection", name: "Slippers" },
      { id: ncNanoId(), href: "/collection", name: "Sneakers" },
      { id: ncNanoId(), href: "/collection", name: "Counterfeit" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Brands",
    children: [
      { id: ncNanoId(), href: "/search", name: "Full Nelson" },
      { id: ncNanoId(), href: "/search", name: "Backpacks" },
      { id: ncNanoId(), href: "/search", name: "My Way" },
      { id: ncNanoId(), href: "/search", name: "Significant Other" },
      { id: ncNanoId(), href: "/search", name: "Re-Arranged" },
      { id: ncNanoId(), href: "/search", name: "Counterfeit" },
    ],
  },
];

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Home Page",
    children: [
      { id: ncNanoId(), href: "/", name: "Home  1" },
      { id: ncNanoId(), href: "/home-2", name: "Home  2", isNew: true },
      { id: ncNanoId(), href: "/", name: "Header  1" },
      { id: ncNanoId(), href: "/home-2", name: "Header  2", isNew: true },
      { id: ncNanoId(), href: "/", name: "Coming Soon" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Shop Pages",
    children: [
      { id: ncNanoId(), href: "/collection", name: "Category Page 1" },
      { id: ncNanoId(), href: "/collection-2", name: "Category Page 2" },
      { id: ncNanoId(), href: "/product-detail", name: "Product Page 1" },
      { id: ncNanoId(), href: "/product-detail-2", name: "Product Page 2" },
      { id: ncNanoId(), href: "/cart", name: "Cart Page" },
      { id: ncNanoId(), href: "/checkout", name: "Checkout Page" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Other Pages",
    children: [
      { id: ncNanoId(), href: "/checkout", name: "Checkout Page" },
      { id: ncNanoId(), href: "/search", name: "Search Page" },
      { id: ncNanoId(), href: "/cart", name: "Cart Page" },
      { id: ncNanoId(), href: "/account", name: "Accout Page" },
      { id: ncNanoId(), href: "/account-order", name: "Order Page" },
      { id: ncNanoId(), href: "/subscription", name: "Subscription" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Blog Page",
    children: [
      { id: ncNanoId(), href: "/blog", name: "Blog Page" },
      { id: ncNanoId(), href: "/blog-single", name: "Blog Single" },
      { id: ncNanoId(), href: "/about", name: "About Page" },
      { id: ncNanoId(), href: "/contact", name: "Contact Page" },
      { id: ncNanoId(), href: "/login", name: "Login" },
      { id: ncNanoId(), href: "/signup", name: "Signup" },
    ],
  },
];


export const MENU: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/how-to-order" as Route,
    name: "Как заказать?",
    icon: FaCartShopping,
    type: "none"
  },
  {
    id: ncNanoId(),
    href: "/guarantees" as Route,
    name: "Гарантии",
    icon: FaShieldHalved,
    type: "none"
  },
  {
    id: ncNanoId(),
    href: "/faq" as Route,
    name: "FAQ",
    icon: FaCircleQuestion,
    type: "none"
  },
  {
    id: ncNanoId(),
    href: "/promotions" as Route,
    name: "Акции",
    icon: FaPercent,
    type: "none",
    isNew: true // Optional: highlight promotions as new
  },
  {
    id: ncNanoId(),
    href: "/delivery" as Route,
    name: "Доставка",
    icon: FaTruck,
    type: "none"
  },
  {
    id: ncNanoId(),
    href: "/privacy-policy" as Route,
    name: "Политика обработки персональных данных",
    icon: FaLock,
    type: "none",
    targetBlank: true // Optional: open privacy policy in new tab
  }
];

export const categories: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/collection" as Route,
    name: "Строительные материалы",
    icon: FaHammer,
    children: [
      { id: ncNanoId(), href: "/collection" as Route, name: "Цемент" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Песок" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Щебень" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Кирпич" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/collection" as Route,
    name: "Отделочные материалы",
    icon: FaPaintRoller,
    children: [
      { id: ncNanoId(), href: "/collection" as Route, name: "Ламинат" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Плитка" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Обои" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Краска" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/collection" as Route,
    name: "Сантехника",
    icon: FaToilet,
    children: [
      { id: ncNanoId(), href: "/collection" as Route, name: "Унитазы" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Раковины" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Ванны" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Смесители" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/collection" as Route,
    name: "Электротовары",
    icon: FaPlug,
    children: [
      { id: ncNanoId(), href: "/collection" as Route, name: "Кабели" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Розетки" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Выключатели" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Светильники" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/collection" as Route,
    name: "Инструменты",
    icon: FaWrench,
    children: [
      { id: ncNanoId(), href: "/collection" as Route, name: "Дрели" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Перфораторы" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Шуруповерты" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Болгарки" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/collection" as Route,
    name: "Двери и окна",
    icon: FaDoorOpen,
    children: [
      { id: ncNanoId(), href: "/collection" as Route, name: "Межкомнатные двери" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Входные двери" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Окна ПВХ" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Фурнитура" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/collection" as Route,
    name: "Крепеж и метизы",
    icon: FaScrewdriver,
    children: [
      { id: ncNanoId(), href: "/collection" as Route, name: "Гвозди" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Винты" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Болты" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Шурупы" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/collection" as Route,
    name: "Сад и огород",
    icon: FaLeaf,
    children: [
      { id: ncNanoId(), href: "/collection" as Route, name: "Садовый инвентарь" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Семена" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Удобрения" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Грунт" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/collection" as Route,
    name: "Напольные покрытия",
    icon: FaSquare,
    children: [
      { id: ncNanoId(), href: "/collection" as Route, name: "Ламинат" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Паркет" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Ковролин" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Линолеум" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/collection" as Route,
    name: "Кухни",
    icon: FaKitchenSet,
    children: [
      { id: ncNanoId(), href: "/collection" as Route, name: "Кухонные гарнитуры" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Мойки" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Смесители для кухни" },
      { id: ncNanoId(), href: "/collection" as Route, name: "Кухонные аксессуары" },
    ],
  },
];