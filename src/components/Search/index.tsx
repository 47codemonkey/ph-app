import React from 'react';

import { useState, useCallback, useRef } from 'react';

import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { setSearchValue } from '../../redux/filter/slice';

import { SearchIcon } from '../../assets/icons/SearchIcon/SearchIcon';
import { SearchClearIcon } from '../../assets/icons/SearchClearIcon/SearchClearIcon';

import './search.css';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 150),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className="search-wrapper">
      <SearchIcon />
      <input ref={inputRef} value={value} onChange={onChangeInput} className="search-input" placeholder="Search" />
      {value && <SearchClearIcon onClick={onClickClear} />}
    </div>
  );
};
