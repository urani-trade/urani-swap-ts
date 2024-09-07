import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export function Title({ children }: Props) {
  return (
    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight md:leading-none mb-6 md:mb-12 text-center md:text-left">
      {children}
    </h1>
  );
}
