import React from 'react';
import IButton from '../interfaces/button-type';

const Button = (props: IButton) => {
  const { btnClass, text, clickHandler } = props;
  return (
    <a className={btnClass} onClick={clickHandler}>
      {text}
    </a>
  );
};

export default Button;
