import React, { useEffect, useState } from 'react';
import './App.scss';
import { Header } from './Header/Header';
import { WorkingWithGet } from './WorkingWithGet/WorkingWithGet';
import { WorkingWithPost } from './WorkingWithPost/WorkingWithPost';
import { UserSuccessfully } from './WorkingWithPost/UserSuccessfully';

const App = () => {
  const [userWasAdded, setUserWasAdded] = useState(false);
  const [displayUserSuccsessfullyAdded, setdisplayUserSuccessfullyAdded] = useState(false);
  const userWasDone = () => {
    setUserWasAdded(true);
    setdisplayUserSuccessfullyAdded(true);
  };

  const setUserWasAddedFalse = () => {
    setUserWasAdded(false);
  };

  useEffect(() => {
    if (displayUserSuccsessfullyAdded === true) {
      setTimeout(() => {
        setdisplayUserSuccessfullyAdded(false);
      }, 3000);
    }
  }, [displayUserSuccsessfullyAdded]);

  return (
    <>
    <Header />
    <WorkingWithGet userWasAdded={userWasAdded} setUserWasAddedFalse={setUserWasAddedFalse}/>
    {displayUserSuccsessfullyAdded
      ? (<UserSuccessfully />)
      : (<WorkingWithPost userCreated={userWasDone} />)}
    </>
  );
};

export default App;
