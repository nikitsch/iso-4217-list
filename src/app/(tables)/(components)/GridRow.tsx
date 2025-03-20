import type { ChangeEvent, FC } from 'react';

interface IGridRowProps {
  id: string;
  checked: boolean;
  content: string[];
  disabled: boolean;
  classNames: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const GridRow: FC<IGridRowProps> = (props) => {
  const { id, checked, content, disabled, classNames, onChange } = props;

  const [secondColCont, thirdColCont] = content;
  const [firstColClass, secondColClass, thirdColClass] = classNames;

  return (
    <div className="grid grid-cols-10 grid-flow-col gap-4 p-2">
      <div className={`col-span-1 ${firstColClass}`}>
        <input
          id={`checkbox-${id}`}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e, checked)}
          disabled={disabled}
        />
      </div>
      <div className={`${secondColClass} ${checked ? 'inactive' : ''}`}>
        {secondColCont}
      </div>
      <div
        className={`flex justify-end ${thirdColClass} ${checked ? 'inactive' : ''}`}
      >
        {thirdColCont}
      </div>
    </div>
  );
};
export default GridRow;
