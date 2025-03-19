'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

import type { LinkProps } from 'next/link';
import type { FC } from 'react';

interface INavButtonProps extends LinkProps {
  buttonClassName?: string;
}

const BLUE_COLOR = 'blue-500';

const NavButton: FC<PropsWithChildren<INavButtonProps>> = (props) => {
  const { href, buttonClassName = '', children, ...restLinkProps } = props;

  const path = usePathname();
  const active =
    path === href
      ? `bg-${BLUE_COLOR} text-white hover:bg-blue-600`
      : 'hover:bg-blue-500/10';
  const className = `px-4 py-2 rounded-full border border-${BLUE_COLOR} text-${BLUE_COLOR} ${active} ${buttonClassName}`;

  return (
    <Link href={href} {...restLinkProps}>
      <button className={className}>{children}</button>
    </Link>
  );
};

export default NavButton;
