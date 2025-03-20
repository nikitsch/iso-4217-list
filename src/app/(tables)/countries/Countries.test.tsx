import { render, screen, fireEvent } from '@testing-library/react';
import { useGetCountries } from '~hook/useGetCountries';
import { useGetInactiveCountries } from '~hook/useGetInactiveCountries';
import { useUpdateInactive } from '~hook/useUpdateInactive';
import { TableEnum } from '~interface/index';
import Countries from './page';

jest.mock('~hook/useGetCountries', () => ({
  useGetCountries: jest.fn(),
}));

jest.mock('~hook/useGetInactiveCountries', () => ({
  useGetInactiveCountries: jest.fn(),
}));

jest.mock('~hook/useUpdateInactive', () => ({
  useUpdateInactive: jest.fn(),
}));

jest.mock('../(components)/Loader', () => {
  const Loader = () => <div>Loading...</div>;
  Loader.displayName = 'Loader';
  return Loader;
});

jest.mock('../(components)/NoData', () => {
  const NoData = () => <div>No Data</div>;
  NoData.displayName = 'NoData';
  return NoData;
});

describe('Countries Component', () => {
  beforeEach(() => {
    (useGetCountries as jest.Mock).mockReturnValue({
      data: {
        isoCountries: [
          {
            _id: '1',
            country: 'AFGHANISTAN',
            currency: 'Afghani',
            alphabeticCode: 'AFN',
            numericCode: 971,
            minorUnit: '2',
          },
        ],
      },
      isLoading: false,
      isFetching: false,
    });

    (useGetInactiveCountries as jest.Mock).mockReturnValue({
      data: { inactiveCountries: [] },
      isLoading: false,
      isFetching: false,
    });

    (useUpdateInactive as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });
  });

  it('Должен показывать Loader, если данные стран загружаются', () => {
    (useGetCountries as jest.Mock).mockReturnValue({
      data: {},
      isLoading: true,
      isFetching: false,
    });

    render(<Countries />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Должен показывать NoData, если нет данных стран', () => {
    (useGetCountries as jest.Mock).mockReturnValue({
      data: { isoCountries: [] },
      isLoading: false,
      isFetching: false,
    });

    render(<Countries />);

    expect(screen.getByText('No Data')).toBeInTheDocument();
  });

  it('Должен вызвать updateInactive при изменении состояния чекбокса', () => {
    render(<Countries />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(useUpdateInactive(TableEnum.COUNTRIES).mutate).toHaveBeenCalledTimes(
      1
    );
  });

  it('Должен отключать чекбокс, если данные загружаются или обновляются', async () => {
    (useGetInactiveCountries as jest.Mock).mockReturnValue({
      data: { inactiveCountries: [] },
      isLoading: true,
      isFetching: false,
    });

    render(<Countries />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });
});
