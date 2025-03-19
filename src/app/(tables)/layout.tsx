import { ReactNode } from 'react';

export default function TablesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <main className="container mx-auto">{children}</main>;
}
