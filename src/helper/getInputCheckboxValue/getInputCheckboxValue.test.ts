import { getInputCheckboxValue } from './index';

describe('getInputCheckboxValue', () => {
  it('Должен вернуть `true`, если значение есть в массиве', () => {
    expect(getInputCheckboxValue([532, 973, 8], 973)).toBe(true);
    expect(
      getInputCheckboxValue(
        ['ANTIGUA AND BARBUDA', 'ANGUILLA', 'ALBANIA'],
        'ALBANIA'
      )
    ).toBe(true);
  });

  it('Должен вернуть `false`, если значения нет в массиве', () => {
    expect(getInputCheckboxValue([532, 973, 8], 4)).toBe(false);
    expect(
      getInputCheckboxValue(
        ['ANTIGUA AND BARBUDA', 'ANGUILLA', 'ALBANIA'],
        'BELARUS'
      )
    ).toBe(false);
  });

  it('Должен корректно работать с пустым массивом', () => {
    expect(getInputCheckboxValue([], 973)).toBe(false);
    expect(getInputCheckboxValue([], 'ANTIGUA AND BARBUDA')).toBe(false);
  });
});
