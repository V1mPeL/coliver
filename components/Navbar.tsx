import Image from 'next/image';
import Link from 'next/link';
import { FaRegUserCircle } from 'react-icons/fa';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 w-full bg-black z-50 flex items-center justify-between'>
      <div className='max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Лівий блок: Логотип */}
          <div className='flex items-center'>
            <Link href='/' className='flex items-center'>
              <div className='text-2xl font-bold text-neutrals-white flex items-center gap-2'>
                <Image
                  src='/assets/logo.png'
                  alt='Logo'
                  width={36}
                  height={36}
                />
                <p>CoLiver</p>
              </div>
            </Link>

            {/* Блок із випадаючим списком */}
            <div className='ml-6'>
              <Select>
                <SelectTrigger className='w-[180px] text-neutrals-white bg-black border-neutrals-40'>
                  <SelectValue placeholder='Lviv' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='lviv'>Lviv</SelectItem>
                  <SelectItem value='kyiv'>Kyiv</SelectItem>
                  <SelectItem value='odesa'>Odesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Правий блок: Іконка профілю */}
          <div className='flex items-center'>
            <Link href='/profile'>
              <FaRegUserCircle className='text-neutrals-white w-8 h-8 hover:text-prime-60 transition-colors' />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
