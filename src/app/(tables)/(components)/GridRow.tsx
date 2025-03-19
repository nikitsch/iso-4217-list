import type { FC } from 'react';

interface IGridRowProps {
  key: string;
  page: string;
  checked: boolean;
  content: string[];
  classNames: string[];
  onChange: () => void;
}

const GridRow: FC<IGridRowProps> = (props) => {
  const { key, page, checked, content, classNames, onChange } = props;

  const [secondColCont, thirdColCont] = content;
  const [firstColClass, secondColClass, thirdColClass] = classNames;

  return (
    <div key={key} className="grid grid-cols-10 grid-flow-col gap-4 p-2">
      <div className={`col-span-1 ${firstColClass}`}>
        <input
          id={`${page}-${key}`}
          type="checkbox"
          checked={checked}
          onChange={onChange}
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
