import React from 'react';
import logo from '../Images/Logo.svg';
import { Button } from '../Button/Button';

export const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <nav className='header__nav'>
        <a href='#'><img src={logo}/></a>
        <div className='header__nav_buttons'>
          <Button content='Users' nameClass="header__nav_btn button"/>
          <Button content='Sign up' nameClass="header__nav_btn button"/>
        </div>
        </nav>
        <div className='header__main'>
          <h1 className='header__main_title'>
            Test assignment for front-end developer
          </h1>
          <p className='header__main_description'>
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they&apos;ll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
          </p>
          <Button content='Sign up' nameClass="header__nav_btn button"/>
        </div>
      </div>
    </header>
  );
};
