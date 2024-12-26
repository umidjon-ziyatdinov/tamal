'use client';
import { HomeIcon, ViewColumnsIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, ViewColumnsIcon as ViewColumnsIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const BottomNavigation = () => {
  const pathname = usePathname();

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
                href={item.href}
                className={`flex flex-col items-center py-2 px-3 min-w-[80px] ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <Icon className="w-6 h-6" />
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