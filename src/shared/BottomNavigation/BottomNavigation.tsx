'use client';
import { HomeIcon, ViewColumnsIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, ViewColumnsIcon as ViewColumnsIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Route } from 'next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const BottomNavigation = () => {
  const pathname = usePathname();
  const {favorites} = useSelector((state: RootState) => state.app)
  const navItems = [
    {
      label: 'Главный',
      href: '/',
      icon: HomeIcon,
      activeIcon: HomeIconSolid
    },
    {
      label: 'Каталог',
      href: '/category',
      icon: ViewColumnsIcon,
      activeIcon: ViewColumnsIconSolid
    },
    {
      label: 'Избранное',
      href: '/favourites',
      hasBadge: true,
      icon: HeartIcon,
      activeIcon: HeartIconSolid
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="border-t bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = isActive ? item.activeIcon : item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href as Route}
                className={`flex flex-col items-center py-2 px-3 min-w-[80px] relative ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
    
            <div className="relative inline-block">
            {item.hasBadge && favorites && (
              <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-[-4px] right-[-4px] rounded-full text-[10px] leading-none text-white font-medium">
                <span className="mt-[1px]"> {favorites?.length}</span>
              </div>
            )}
            <Icon className="w-6 h-6" />
            </div>
      
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;