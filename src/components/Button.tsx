import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export default function Button({ text, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={
        `w-full bg-primary-blue text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-accent-blue focus:outline-none focus:ring-4 focus:ring-primary-blue focus:ring-opacity-50 transition duration-300 ease-in-out text-xl transform hover:scale-[1.02]` +
        className
      }
    >
      {text || props.children}
    </button>
  );
}
