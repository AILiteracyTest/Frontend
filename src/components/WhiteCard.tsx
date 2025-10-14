import React from "react";

interface WhiteCardProps {
  className?: string;
  children?: React.ReactNode;
}

export default function WhiteCard({ children, className }: WhiteCardProps) {
  return (
    <div
      className={
        `bg-white shadow-xl rounded-xl p-8 sm:p-12 w-full max-w-lg text-center ` +
        className
      }
    >
      {children}
    </div>
  );
}
