// components/ShareDialog.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { IoMdShare } from 'react-icons/io';
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
} from 'react-share';
import {
  FaEnvelope,
  FaFacebookF,
  FaPinterestP,
  FaTelegramPlane,
  FaTwitter,
  FaViber,
  FaWhatsapp,
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

interface ShareDialogProps {
  listingId: string;
}

export default function ShareDialog({ listingId }: ShareDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  // Обчислюємо shareUrl після монтування компонента
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/listing/${listingId}`);
    }
  }, [listingId]);

  // Закриття по клавіші Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Закриття по кліку поза вікном
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        setIsOpen(false);
      }
    },
    []
  );

  // Функція копіювання посилання
  const handleCopy = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  };

  return (
    <>
      {/* Кнопка для відкриття діалогу */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label='Share listing'
        className='text-2xl font-bold text-neutrals-30 hover:text-primary-main transition-colors'
      >
        <IoMdShare />
      </button>

      {/* Діалогове вікно */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'
          onClick={handleOverlayClick}
        >
          <div className='bg-white dark:bg-neutrals-20 rounded-lg p-6 w-full max-w-md shadow-lg'>
            {/* Заголовок і кнопка закриття */}
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl font-bold text-neutrals-black dark:text-neutrals-white'>
                Share this listing
              </h2>
            </div>

            {/* Поле з посиланням і кнопка копіювання */}
            <div className='mb-6'>
              <label
                htmlFor='share-url'
                className='block text-sm font-medium text-neutrals-30 mb-1'
              >
                Share URL
              </label>
              <div className='flex items-center gap-2'>
                <input
                  id='share-url'
                  type='text'
                  value={shareUrl}
                  readOnly
                  className='w-full p-2 border border-neutrals-90 rounded-md text-neutrals-black dark:text-neutrals-white bg-neutrals-95 dark:bg-neutrals-30 focus:outline-none focus:ring-2 focus:ring-primary-main'
                />
                <button
                  onClick={handleCopy}
                  className='px-4 py-2 bg-primary-main hover:bg-primary-60 text-white rounded-md transition-colors'
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Кнопки для поширення в соціальних мережах */}
            <div className='mb-6'>
              <h3 className='text-sm font-medium text-neutrals-30 mb-3'>
                Share via
              </h3>
              <div className='grid grid-cols-4 gap-3'>
                {/* Email */}
                <EmailShareButton
                  url={shareUrl}
                  subject='Check out this listing!'
                >
                  <div className='flex items-center justify-center p-2 bg-[#d44638] hover:bg-[#c13525] rounded-full transition-colors'>
                    <FaEnvelope className='text-white text-xl' />
                  </div>
                </EmailShareButton>

                {/* Facebook */}
                <FacebookShareButton
                  url={shareUrl}
                  title='Check out this listing!'
                >
                  <div className='flex items-center justify-center p-2 bg-[#1877f2] hover:bg-[#1566d3] rounded-full transition-colors'>
                    <FaFacebookF className='text-white text-xl' />
                  </div>
                </FacebookShareButton>

                {/* Twitter */}
                <TwitterShareButton
                  url={shareUrl}
                  title='Check out this listing!'
                >
                  <div className='flex items-center justify-center p-2 bg-[#1da1f2] hover:bg-[#1a91da] rounded-full transition-colors'>
                    <FaTwitter className='text-white text-xl' />
                  </div>
                </TwitterShareButton>

                {/* WhatsApp */}
                <WhatsappShareButton
                  url={shareUrl}
                  title='Check out this listing!'
                >
                  <div className='flex items-center justify-center p-2 bg-[#25d366] hover:bg-[#20b858] rounded-full transition-colors'>
                    <FaWhatsapp className='text-white text-xl' />
                  </div>
                </WhatsappShareButton>

                {/* Telegram */}
                <TelegramShareButton
                  url={shareUrl}
                  title='Check out this listing!'
                >
                  <div className='flex items-center justify-center p-2 bg-[#0088cc] hover:bg-[#0077b3] rounded-full transition-colors'>
                    <FaTelegramPlane className='text-white text-xl' />
                  </div>
                </TelegramShareButton>

                {/* Viber */}
                <ViberShareButton
                  url={shareUrl}
                  title='Check out this listing!'
                >
                  <div className='flex items-center justify-center p-2 bg-[#7360f2] hover:bg-[#6655d3] rounded-full transition-colors'>
                    <FaViber className='text-white text-xl' />
                  </div>
                </ViberShareButton>

                {/* Pinterest */}
                <PinterestShareButton
                  url={shareUrl}
                  media={shareUrl}
                  description='Check out this listing!'
                >
                  <div className='flex items-center justify-center p-2 bg-[#e60023] hover:bg-[#cc001f] rounded-full transition-colors'>
                    <FaPinterestP className='text-white text-xl' />
                  </div>
                </PinterestShareButton>
              </div>
            </div>

            {/* Кнопка закриття */}
            <div className='flex justify-end'>
              <button
                onClick={() => setIsOpen(false)}
                className='px-4 py-2 bg-neutrals-90 hover:bg-neutrals-80 text-neutrals-black dark:text-neutrals-white rounded-md transition-colors'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
