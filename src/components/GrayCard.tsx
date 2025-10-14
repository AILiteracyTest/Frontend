import React from "react";

interface GrayCardProps {
  className?: string;
  children?: React.ReactNode;
}

export default function GrayCard({ children, className }: GrayCardProps) {
  return (
    <div
      className={
        `p-4 rounded-lg bg-gray-50 border border-gray-200 ` + className
      }
    >
      {children}
    </div>
  );
}
