'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

import type { LinkProps } from 'next/link';
import type { FC } from 'react';

interface INavButtonProps extends LinkProps {
  buttonClassName?: string;
}

const NavButton: FC<PropsWithChildren<INavButtonProps>> = (props) => {
  const { href, buttonClassName = '', children, ...restLinkProps } = props;

  const path = usePathname();
  const active =
    path === href
      ? `bg-blue-500 text-white hover:bg-blue-600`
      : `text-blue-500 hover:bg-blue-500/10`;
  const className = `px-4 py-2 rounded-full border border-blue-500 ${active} ${buttonClassName}`;

  return (
    <Link href={href} {...restLinkProps}>
      <button className={className}>{children}</button>
    </Link>
  );
};

export default NavButton;
