'use client';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { navigationItems } from '@/constants/constants';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { checkAuth, logout } from '@/lib/actions/user.actions'; // Імпортуємо серверні дії
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isUser, setIsUser] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const result = await checkAuth();
        setIsUser(result.isAuthenticated);
      } catch (error) {
        console.error('Failed to check auth:', error);
        setIsUser(false);
      }
    };

    verifyAuth();
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    setIsUser(false);
    router.push('/');
    toast.success('Logged out successfully!');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full ${
        pathname === '/' && !isScrolled
          ? 'bg-transparent'
          : 'bg-neutrals-90 shadow-md opacity-95'
      } z-50 transition-colors duration-500 ease-in-out`}
    >
      <div className='container'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/' className='flex items-center'>
              <div
                className={`${
                  pathname === '/' && !isScrolled
                    ? 'text-neutrals-white '
                    : 'text-neutrals-black'
                } flex items-center gap-2`}
              >
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
            <div className='flex items-center gap-4'>
              {navigationItems.map((link) => (
                <Link
                  href={link.route}
                  key={link.label}
                  className={`${
                    pathname === '/' && !isScrolled
                      ? 'text-neutrals-white '
                      : 'text-neutrals-black'
                  } flex justify-between items-center gap-2 sh3s transition-all duration-300 hover:text-primary-60 ${
                    link.route === pathname ? 'text-primary-60' : ''
                  } `}
                >
                  <link.icon className='w-6 h-6' />
                  {link.label}
                </Link>
              ))}
            </div>
            <div className='flex items-center ml-6'>
              {isUser ? (
                <div className='flex justify-center gap-4'>
                  <Link
                    href='/profile'
                    className={`${
                      pathname === '/' && !isScrolled
                        ? 'text-neutrals-white '
                        : 'text-neutrals-black'
                    } flex justify-between items-center gap-2 sh3s transition-all duration-300 hover:text-primary-60 ${
                      pathname == '/profile' ? 'text-primary-60' : ''
                    } `}
                  >
                    <AiOutlineUser className='w-6 h-6' />
                    Profile
                  </Link>
                  <Button className='!bg-transparent ' onClick={handleLogout}>
                    <BiLogOut
                      className={`${
                        pathname === '/' && !isScrolled
                          ? 'text-neutrals-white '
                          : 'text-neutrals-black'
                      } w-6 h-6 sh3S transition-all duration-300 hover:text-primary-60`}
                    />
                  </Button>
                </div>
              ) : (
                <Button href='/sign-in'>Login</Button>
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
              className={`block w-6 h-0.5 ${
                pathname === '/' && !isScrolled
                  ? 'bg-neutrals-white '
                  : 'bg-neutrals-black'
              } transition-transform duration-300 ${
                isMenuOpen ? 'transform rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 ${
                pathname === '/' && !isScrolled
                  ? 'bg-neutrals-white '
                  : 'bg-neutrals-black'
              } transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 ${
                pathname === '/' && !isScrolled
                  ? 'bg-neutrals-white '
                  : 'bg-neutrals-black'
              } transition-transform duration-300 ${
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
                {link.label}
              </Link>
            ))}
            <div className='flex items-center justify-between px-4 py-2 mt-2 border-t border-neutrals-50'>
              {isUser ? (
                <div className='flex items-center gap-6'>
                  <Link
                    href='/profile'
                    className='flex items-center gap-2 text-neutrals-white sh3S'
                  >
                    <AiOutlineUser className='w-6 h-6' />
                    Profile
                  </Link>
                  <Button
                    className='!bg-transparent flex items-center gap-2 text-neutrals-white sh3S'
                    onClick={handleLogout}
                  >
                    <BiLogOut className='w-6 h-6' />
                    Logout
                  </Button>
                </div>
              ) : (
                <Link
                  href='/sign-in'
                  className='flex items-center gap-2 text-neutrals-white sh3B'
                >
                  <AiOutlineUser className='w-6 h-6' />
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
