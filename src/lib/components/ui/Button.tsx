/* eslint-disable no-console */
import React from 'react';

interface Props {
  title: string | JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  capitalizeTitle?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  className?: string;
  altClassName?: string;
  isBusy?: boolean;
}

const Button: React.FC<Props> = ({
  title,
  onClick,
  disabled,
  altClassName,
  isBusy,
}) => {
  return (
    <div className={disabled ? 'opacity-75 ' : ''}>
      <button
        className={
          altClassName ||
          `py-3 lg:text-lg w-full btn-primary fw-500 ${
            disabled ? 'cursor-not-allowed btn-disabled' : ''
          }`
        }
        onClick={onClick ? onClick : undefined}
        disabled={disabled}
      >
        {isBusy ? 'loading' : title}
      </button>
    </div>
  );
};

export default Button;