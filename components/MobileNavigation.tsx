'use client';
import { navigationItems } from '@/constants/constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'; // Додано useEffect і useState
import Button from './Button';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const MobileNavigation = () => {
  const isUser = true;
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false); // Стан для відображення меню

  // Забезпечуємо, що меню відображається одразу після завантаження
  useEffect(() => {
    setIsVisible(true); // Вмикаємо видимість одразу
  }, []);

  if (!isVisible) return null; // Не рендеримо, якщо ще не завантажено

  return (
    <div
      className='h-[50px] w-full flex md:hidden fixed bottom-0 left-0 bg-neutrals-20 z-50 items-center transition-all duration-300'
      style={{ transform: 'translateY(0)' }} // Додаємо стиль для плавного входження
    >
      <nav className='w-full flex items-center justify-around'>
        {navigationItems.map((link) => (
          <Link
            href={link.route}
            key={link.label}
            className={`${
              link.route === pathname ? 'bg-primary-60' : ''
            } rounded-lg p-1 sh3S text-neutrals-white transition-all hover:text-primary-60`}
          >
            <Image
              src={link.imageUrl}
              alt={link.label}
              width={20}
              height={20}
              className='w-5 h-5 sm:w-7 sm:h-7'
            />
          </Link>
        ))}

        {isUser ? (
          <>
            <Link href='/profile'>
              <Image
                src='/assets/user.svg'
                alt='User'
                width={20}
                height={20}
                className='w-5 h-5 sm:w-7 sm:h-7 text-neutrals-white hover:text-primary-60 transition-colors'
              />
            </Link>
            <Button className='!bg-transparent'>
              <Image
                src='/assets/logout.svg'
                alt='Logout'
                width={20}
                height={20}
                className='w-5 h-5 sm:w-7 sm:h-7 text-neutrals-white hover:text-primary-60 transition-colors'
              />
            </Button>
          </>
        ) : (
          <Link href='/login' className='text-neutrals-white sh3B'>
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default MobileNavigation;
