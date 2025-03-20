import { render, screen, fireEvent } from '@testing-library/react';
import GridRow from './GridRow';

describe('GridRow', () => {
  const mockOnChange = jest.fn();

  it('Должен рендерить контент и чекбокс с правильными аттрибутами', () => {
    render(
      <GridRow
        id="1"
        checked={false}
        content={['Second column', 'Third column']}
        disabled={false}
        classNames={['first-class', 'second-class', 'third-class']}
        onChange={mockOnChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    expect(screen.getByText('Second column')).toBeInTheDocument();
    expect(screen.getByText('Third column')).toBeInTheDocument();
  });

  it('Должен вызывать onChange при изменении состояния чекбокса', () => {
    render(
      <GridRow
        id="1"
        checked={false}
        content={['Second column', 'Third column']}
        disabled={false}
        classNames={['first-class', 'second-class', 'third-class']}
        onChange={mockOnChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('Должен отключать чекбокс, если disabled = true', () => {
    render(
      <GridRow
        id="1"
        checked={false}
        content={['Second column', 'Third column']}
        disabled={true}
        classNames={['first-class', 'second-class', 'third-class']}
        onChange={mockOnChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeDisabled();
  });
});
