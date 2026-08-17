import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex items-start justify-center min-h-screen mt-32">
      {children}
    </div>
  );
}
