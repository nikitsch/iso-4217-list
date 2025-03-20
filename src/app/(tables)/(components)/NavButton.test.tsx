import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import NavButton from './NavButton';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('NavButton', () => {
  it('Должен отображаться с активным классом, если текущий путь совпадает с href', () => {
    (usePathname as jest.Mock).mockReturnValue('/countries');

    render(<NavButton href="/countries">Countries</NavButton>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-blue-500');
    expect(button).toHaveClass('text-white');
  });

  it('Должен отображаться с неактивным классом, если текущий путь НЕ совпадает с href', () => {
    (usePathname as jest.Mock).mockReturnValue('/countries');

    render(<NavButton href="/currencies">Currencies</NavButton>);

    const button = screen.getByRole('button');

    expect(button).toHaveClass('text-blue-500');
    expect(button).toHaveClass('hover:bg-blue-500/10');
  });

  it('Должен поддерживать дополнительные классы, переданные в buttonClassName', () => {
    (usePathname as jest.Mock).mockReturnValue('/countries');

    render(
      <NavButton href="/currencies" buttonClassName="bg-yellow-100">
        Currencies
      </NavButton>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-yellow-100');
  });
});
