import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export default function Button({ text, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={
        `w-full bg-primary-blue text-white font-bold py-3 px-6 rounded-lg shadow-md border-2
    transition duration-300 ease-in-out transform hover:scale-[1.02]
    disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed` +
        className
      }
    >
      {text || props.children}
    </button>
  );
}
