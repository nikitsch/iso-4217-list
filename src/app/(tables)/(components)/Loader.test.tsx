import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('Должен рендерить компонент с анимацией', () => {
    render(<Loader />);

    const loaderContainer = screen.getByRole('status');
    expect(loaderContainer).toBeInTheDocument();

    const srOnlyText = screen.getByText('Loading...');
    expect(srOnlyText).toHaveClass('sr-only');
  });
});
