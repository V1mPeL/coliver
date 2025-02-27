'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegUserCircle } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import Button from './Button';
import { navigationItems } from '@/constants/constants';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const isUser = true;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Відстежуємо скролінг
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // Змінюємо фон, якщо прокручено більше 10px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Очищення при розмонтуванні
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full ${
        pathname === '/' && !isScrolled ? 'bg-transparent' : 'bg-neutrals-60'
      } z-50 hidden items-center justify-between md:flex transition-colors duration-500 ease-in-out`}
    >
      <div className='container'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/' className='flex items-center'>
              <div className='text-neutrals-white flex items-center gap-2'>
                <Image
                  src='/assets/logo.png'
                  alt='Logo'
                  width={34}
                  height={34}
                  className='w-8 h-8 sm:w-9 sm:h-9'
                />
                <p className='text-xl max-[458px]:text-xl sm:h3B'>CoLiver</p>
              </div>
            </Link>
          </div>

          <nav className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              {navigationItems.map((link) => (
                <Link
                  href={link.route}
                  key={link.label}
                  className={`sh3S text-neutrals-white transition-all hover:text-primary-60 ${
                    link.route === pathname ? 'text-primary-60' : ''
                  } `}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className='flex items-center'>
              {isUser ? (
                <div className='flex justify-center'>
                  <Button className='!bg-transparent'>
                    <Image
                      src='/assets/logout.svg'
                      alt='Logout'
                      width={20}
                      height={20}
                      className='text-neutrals-white w-5 h-5 sm:w-7 sm:h-7'
                    />
                  </Button>
                  <Link href='/profile'>
                    <Image
                      src='/assets/user.svg'
                      alt='User'
                      width={20}
                      height={20}
                      className='text-neutrals-white w-5 h-5 sm:w-7 sm:h-7'
                    />
                  </Link>
                </div>
              ) : (
                <Link href='/login' className='text-neutrals-white sh3B'>
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
