import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CartItem, CartEmpty } from '../components';

import { selectCart } from '../redux/cart/selectors';
import { clearItems } from '../redux/cart/slice';

import { ReturnArrowIcon } from '../assets/icons/ReturnArrowIcon/ReturnArrowIcon';
import { TrashIcon } from '../assets/icons/TrashIcon/TrashIcon';
import { CartIcon } from '../assets/icons/CartIcon/CartIcon';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCart);

  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  const onClickClear = () => {
    if (window.confirm('Empty the trash?')) {
      dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <CartIcon />
            Cart
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <TrashIcon />
            <span>Empty trash</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item: any) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              {' '}
              Total: <b>{totalCount}</b>{' '}
            </span>
            <span>
              {' '}
              Total cost: <b>{totalPrice} $</b>{' '}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <ReturnArrowIcon />
              <span>Back</span>
            </Link>
            <div className="button pay-btn">
              <span>Proceed to checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
