import React from 'react';
import { Title } from '../Title/Title';
import imgSuccess from '../Images/success-image.svg';

export const UserSuccessfully = () => {
  return (
    <section className="userSuccessfully">
      <div className="container">
        <Title content="User successfully registered"/>
        <div className="userSuccessfully__block">
          <img src={imgSuccess} />
        </div>
      </div>
    </section>
  );
};
