import Image from 'next/image';

export default function Home() {
  const apiImage = '';
  const defaultBg = '/assets/main-page-wallpaper.jpg';
  const bgImage = defaultBg || apiImage;

  return (
    <section className='relative w-full h-screen max-[458px]:h-[300px]'>
      <div
        className='absolute inset-0 bg-cover bg-center z-0'
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className='absolute inset-0 bg-black/30 z-10'></div>

      <div className='max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center relative z-20'>
        <div className='text-center text-neutrals-white'>
          <h1 className='h1B max-[458px]:sh1B'>
            Find Your Perfect Co-Living Space
          </h1>
          <p className='bodyR'>
            Discover a community that fits your lifestyle with CoLiver.
          </p>
        </div>
      </div>
    </section>
  );
}
