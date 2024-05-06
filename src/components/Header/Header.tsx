import React from 'react';

import { useRef, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Search } from '..';
import { selectCart } from '../../redux/cart/selectors';

import { PizzaLogo } from '../../assets/icons/PizzaLogo/PizzaLogo';
import { HeaderCartIcon } from '../../assets/icons/HeaderCartIcon/HeaderCartIcon';

export const Header: React.FC = () => {
  const { items, totalPrice } = useSelector(selectCart);
  const location = useLocation();
  const isMounted = useRef(false);

  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <PizzaLogo />
            <div>
              <h1>PH</h1>
              <p>iconic</p>
            </div>
          </div>
        </Link>
        {location.pathname !== '/cart' && <Search />}
        <div className="header__cart">
          {location.pathname !== '/cart' && (
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} $</span>
              <div className="button__delimiter"></div>
              <HeaderCartIcon />
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
