import { ReactNode } from "react";

type PageShellProps = {
  children?: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return (
    <main className={`mx-auto flex w-full max-w-6xl flex-1 px-6 py-10 ${className ?? ""}`}>
      {children}
    </main>
  );
}
