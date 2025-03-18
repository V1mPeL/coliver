// components/Button.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  mailto?: string;
  tel?: string; // Додаємо новий параметр для телефонного номера
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  children,
  onClick,
  href,
  mailto,
  tel, // Додаємо новий параметр
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) => {
  // Якщо є tel, href або mailto, створюємо посилання
  if (tel || href || mailto) {
    let linkHref = '';

    if (tel) {
      linkHref = `tel:${tel}`;
    } else if (href) {
      linkHref = href;
    } else if (mailto) {
      linkHref = `mailto:${mailto}`;
    }

    return (
      <Link
        href={linkHref}
        className={`inline-flex items-center justify-center bg-primary-main text-neutrals-white rounded-[33px] px-5 py-2 sh3B hover:bg-primary-60 disabled:bg-neutrals-40 disabled:cursor-not-allowed transition-colors ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`flex items-center justify-center bg-primary-main text-neutrals-white rounded-[33px] px-5 py-2 sh3B duration-300 hover:bg-primary-60 disabled:bg-neutrals-40 disabled:cursor-not-allowed transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
