// components/Button.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  children,
  onClick,
  href,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className={`inline-block bg-primary-main text-neutrals-white rounded-[33px] px-5 py-1.25 sh3B hover:bg-primary-60 disabled:bg-neutrals-40 disabled:cursor-not-allowed transition-colors ${className}`}
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
      className={`flex items-center  bg-primary-main text-neutrals-white rounded-[33px] px-5 py-2 sh3B duration-300 hover:bg-primary-60 disabled:bg-neutrals-40 disabled:cursor-not-allowed transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
