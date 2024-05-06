import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, minusItem, removeItem } from '../../redux/cart/slice';
import { CartItem as CartItemType } from '../../redux/cart/types';

import { CartDeleteIcon } from '../../assets/icons/CartDeleteIcon/CartDeleteIcon';
import { CartPlusIcon } from '../../assets/icons/CartPlusIcon/CartPlusIcon';
import { CartMinusIcon } from '../../assets/icons/CartMinusIcon/CartMinusIcon';

type CartItemProps = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
};

export const CartItem: React.FC<CartItemProps> = ({ id, title, type, size, price, count, imageUrl }) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      } as CartItemType),
    );
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm('Ты действительно хочешь удалить товар?')) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} cm.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          disabled={count === 1}
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <CartMinusIcon />
        </button>
        <b>{count}</b>
        <button onClick={onClickPlus} className="button button--outline button--circle cart__item-count-plus">
          <CartPlusIcon />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} $</b>
      </div>
      <div className="cart__item-remove">
        <div onClick={onClickRemove} className="button button--outline button--circle">
          <CartDeleteIcon />
        </div>
      </div>
    </div>
  );
};
