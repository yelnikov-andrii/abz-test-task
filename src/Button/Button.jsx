import React from 'react';

export const Button = ({
  content,
  nameClass,
  getUsers,
  pageUp,
  buttonDisabled
}) => {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        if (getUsers) {
          if (buttonDisabled === false) {
            pageUp();
          }
        }
      }}
      className={buttonDisabled === true ? `${nameClass} ${nameClass}--disabled` : nameClass}
      disabled={buttonDisabled}
    >
      {content}
    </button>
  );
};
