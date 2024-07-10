import React from 'react';

import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../../redux/filter/slice';
import { Sort as SortType, SortPropertyEnum } from '../../redux/filter/types';

import { ArrowIcon } from '../../assets/icons/ArrowIcon/ArrowIcon';
import './sort.css';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

type SortPopupProps = {
  value: SortType;
};

export const sortList: SortItem[] = [
  { name: 'Popular (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'Popular (ASC)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'Price (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'Price (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'ABC (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'ABC (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

export const Sort: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const path = event.composedPath && event.composedPath();

      if (path && sortRef.current && !path.includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <ArrowIcon styles={open ? 'rotated' : ''} />
        <b>Sort by:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
