import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

const LogOut = () => {
  const dispatch = useDispatch();
  const logOut = (event) => {
    event.preventDefault();
    dispatch(actions.logOut());
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
            Добро пожаловать Администратор!
        </div>
        <div className="card-body">
          <form onSubmit={logOut} autoComplete="on">
            <button className="btn btn-primary" type="submit">Log Out</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default LogOut;
