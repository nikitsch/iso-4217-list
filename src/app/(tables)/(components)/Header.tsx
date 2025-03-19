import NavButton from './NavButton';

import type { FC } from 'react';

const Header: FC = () => (
  <header className="sticky top-0 container mx-auto py-4 bg-white">
    <nav className="flex justify-end gap-4">
      <NavButton href="/countries">Countries</NavButton>
      <NavButton href="/currencies">Currencies</NavButton>
    </nav>
  </header>
);

export default Header;
