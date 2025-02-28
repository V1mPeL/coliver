'use client';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { navigationItems } from '@/constants/constants';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const isUser = true;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Track scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest('.nav-menu') &&
        !target.closest('.hamburger')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full ${
        pathname === '/' && !isScrolled ? 'bg-transparent' : 'bg-neutrals-60'
      } z-50 transition-colors duration-500 ease-in-out`}
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

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center justify-between'>
            <div className='flex items-center gap-6'>
              {navigationItems.map((link) => (
                <Link
                  href={link.route}
                  key={link.label}
                  className={`flex justify-between items-center gap-2 sh3S text-neutrals-white transition-all duration-300 hover:text-primary-60 ${
                    link.route === pathname ? 'text-primary-60' : ''
                  } `}
                >
                  <Image
                    src={link.imageUrl}
                    alt={link.label}
                    width={24}
                    height={24}
                  />
                  {link.label}
                </Link>
              ))}
            </div>
            <div className='flex items-center ml-6'>
              {isUser ? (
                <div className='flex justify-center gap-4'>
                  <Link
                    href='/profile'
                    className='flex justify-between items-center gap-2 sh3S text-neutrals-white transition-all duration-300 hover:text-primary-60 '
                  >
                    <Image
                      src='/assets/user.svg'
                      alt='User'
                      width={20}
                      height={20}
                      className='text-neutrals-white w-5 h-5 sm:w-7 sm:h-7'
                    />
                    <p>Profile</p>
                  </Link>
                  <Button className='!bg-transparent'>
                    <Image
                      src='/assets/logout.svg'
                      alt='Logout'
                      width={20}
                      height={20}
                      className='text-neutrals-white w-5 h-5 sm:w-7 sm:h-7'
                    />
                  </Button>
                </div>
              ) : (
                <Link href='/login' className='text-neutrals-white sh3B'>
                  Login
                </Link>
              )}
            </div>
          </nav>

          {/* Hamburger Menu Button */}
          <button
            className='md:hidden hamburger flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Toggle menu'
          >
            <span
              className={`block w-6 h-0.5 bg-neutrals-white transition-transform duration-300 ${
                isMenuOpen ? 'transform rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-neutrals-white transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-neutrals-white transition-transform duration-300 ${
                isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`nav-menu md:hidden bg-neutrals-60 overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
          }`}
        >
          <div className='flex flex-col gap-4'>
            {navigationItems.map((link) => (
              <Link
                href={link.route}
                key={link.label}
                className={`flex items-center gap-2 px-4 py-2 sh3S text-neutrals-white transition-all duration-300 hover:text-primary-60 hover:bg-neutrals-70 ${
                  link.route === pathname ? 'text-primary-60' : ''
                } `}
              >
                <Image
                  src={link.imageUrl}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                {link.label}
              </Link>
            ))}

            <div className='flex items-center justify-between px-4 py-2 mt-2 border-t border-neutrals-50'>
              {isUser ? (
                <div className='flex items-center gap-6'>
                  <Link
                    href='/profile'
                    className='flex  items-center gap-2 text-neutrals-white sh3S '
                  >
                    <Image
                      src='/assets/user.svg'
                      alt='User'
                      width={20}
                      height={20}
                      className='w-5 h-5'
                    />
                    Profile
                  </Link>
                  <Button className='!bg-transparent flex items-center gap-2 text-neutrals-white sh3S'>
                    <Image
                      src='/assets/logout.svg'
                      alt='Logout'
                      width={20}
                      height={20}
                      className='w-5 h-5'
                    />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link
                  href='/login'
                  className='flex items-center gap-2 text-neutrals-white sh3B'
                >
                  <Image
                    src='/assets/user.svg'
                    alt='User'
                    width={20}
                    height={20}
                    className='w-5 h-5'
                  />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
