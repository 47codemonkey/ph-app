import React from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Not found
      </h1>
      <p className={styles.description}>КSorry, this page is not available </p>
    </div>
  );
};
