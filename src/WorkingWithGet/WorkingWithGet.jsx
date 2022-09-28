import React, { useEffect, useState } from 'react';
import { getUsers } from '../api';
import { Button } from '../Button/Button';
import { Title } from '../Title/Title';

export const WorkingWithGet = ({ userWasAdded, setUserWasAddedFalse }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (userWasAdded === true) {
      setUsers([]);
      setPage(1);
      setUserWasAddedFalse();
    }

    getUsers(page)
      .then(result => {
        if (users.length === 0) {
          setUsers(result);
        } else {
          setUsers(users => [...users].concat(result));
        }
      });

    getUsers(page + 1)
      .then(res => {
        if (res === null) {
          setButtonDisabled(true);
        }
      });
  }, [page, userWasAdded]);

  const pageUp = () => {
    setPage(page => page + 1);
  };

  return (
    <section className="workingWithGet">
      <div className="container">
      <Title content="Working with GET request"/>
      <div className="workingWithGet__users">
        {Array.isArray(users) && (
          users.map(user => (
            <div className="workingWithGet__users_user userCard" key={user.id}>
              <img
                src={user.photo}
                className="userCard__img"
              />
              <p className="userCard__name">
                {user.name}
              </p>
              <p className="userCard__info">
                {user.position} <br />
                {user.email} <br />
                {user.number} <br />
              </p>
            </div>
          ))
        )}
      </div>
      <div className="workingWithGet__blockBtn">
      <Button
        content='Show more'
        nameClass="button"
        getUsers={true}
        pageUp={pageUp}
        buttonDisabled={buttonDisabled}
      />
      </div>
      </div>
    </section>
  );
};
