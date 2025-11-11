import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styles?: string;
}

export default function Button({ children, styles, ...rest }: IButtonProps) {
  return (
    <button
      {...rest}
      className={`p-2 bg-blue-500 text-white rounded-xl ${styles} cursor-pointer hover:bg-blue-400 hover:-translate-y-1 hover:shadow-lg transition-transform duration-200`}
    >
      {children}
    </button>
  );
}
