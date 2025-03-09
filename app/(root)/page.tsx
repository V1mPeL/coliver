import FeaturesItem from '@/components/FeaturesItem';
import MainPageSearch from '@/components/forms/MainPageSearch';
import RecentListings from '@/components/RecentListings';
import { features_items } from '@/constants/constants';

export default function Home() {
  return (
    <>
      <section className='relative w-full h-screen max-[458px]:h-[300px]'>
        <div
          className='absolute inset-0 bg-cover bg-center z-0'
          style={{ backgroundImage: `url(/assets/main-page-wallpaper.jpg)` }}
        ></div>

        <div className='absolute inset-0 bg-black/30 z-10'></div>

        <div className='max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center relative z-20'>
          <div className='text-center text-neutrals-white'>
            <h1 className='h1B max-[458px]:sh1B'>
              Find Your Perfect Co-Living Space
            </h1>
            <p className='bodyR'>
              Discover a community that fits your lifestyle with CoLiver.
            </p>
          </div>
          <MainPageSearch />
        </div>
      </section>

      <RecentListings />

      <main className='py-8 w-full bg-white'>
        <div className='container'>
          <div>
            <h1 className='h2B text-neutrals-black mb-8 '>Our Features</h1>
            {features_items.map((item) => (
              <FeaturesItem
                key={item.id}
                title={item.title}
                text={item.text}
                image={item.image}
                id={item.id}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
