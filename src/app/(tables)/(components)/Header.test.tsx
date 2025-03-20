import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('Должен содержать компоненты NavButton внутри header', () => {
    render(<Header />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('Должен отображать кнопки с правильными ссылками', () => {
    render(<Header />);

    expect(screen.getByText('Countries')).toBeInTheDocument();
    expect(screen.getByText('Currencies')).toBeInTheDocument();
  });
});
