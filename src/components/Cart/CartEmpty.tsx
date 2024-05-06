import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../../assets/img/empty-cart.png';

export const CartEmpty: React.FC = () => (
  <div className="cart cart--empty">
    <h2>
      Empty cart <span>😕</span>
    </h2>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Back</span>
    </Link>
  </div>
);
