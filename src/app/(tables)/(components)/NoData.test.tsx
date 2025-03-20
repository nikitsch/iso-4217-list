import { render, screen } from '@testing-library/react';
import { NO_DATA_TITLE } from '~constant/index';
import NoData from './NoData';

describe('NoData', () => {
  it('Должен рендерить компонент с правильным текстом и стилями', () => {
    render(<NoData />);

    const noDataText = screen.getByText(NO_DATA_TITLE);
    expect(noDataText).toBeInTheDocument();

    expect(noDataText).toHaveClass('text-gray-400');
    expect(noDataText).toHaveClass('text-2xl');
    expect(noDataText).toHaveClass('font-bold');
    expect(noDataText).toHaveClass('text-center');
    expect(noDataText).toHaveClass('drop-shadow-lg');
    expect(noDataText).toHaveClass('animate-pulse');
  });

  it('Должен рендерить контейнер правильно', () => {
    render(<NoData />);

    const container = screen.getByRole('status');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('w-full');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
    expect(container).toHaveClass('mt-56');
  });
});
