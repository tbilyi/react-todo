import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LogIn from '../../components/Auth/LogIn';
import LogOut from '../../components/Auth/LogOut';

const Account = () => {
  const token = useSelector((state) => state.auth.token);
  const [registered, setRegistered] = useState(0);

  useEffect(() => {
    if (token){
      setRegistered(1);
    } else {
      setRegistered(0);
    }
  },[token]);

  return (
    <>
      { !registered ? <LogIn /> : <LogOut /> }
    </>
  );
};

export default Account;