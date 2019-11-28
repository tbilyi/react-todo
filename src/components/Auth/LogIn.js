import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';

const LogIn = () => {
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState({
    username: {
      value: '',
      validation: {
        required: true,
      },
      valid: false,
    },
    password: {
      value: '',
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
    },
  });
  const LogIn = (event) => {
    event.preventDefault();
    dispatch(actions.LogIn(authData.username.value, authData.password.value));
  };
  const error = useSelector((state) => state.auth.error);
  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '';
      if (!isValid) return false;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength;
      if (!isValid) return false;
    }
    return isValid;
  };

  const onChangeHandler = (event) => {
    const elName = event.target.dataset.name;
    const elData = {
      ...authData[elName],
      value: event.target.value,
      valid: checkValidity(event.target.value, authData[elName].validation),
    };
    if (elData.valid) {
      event.target.className = 'form-control';
    } else {
      event.target.className = 'form-control is-invalid';
    }
    setAuthData({
      ...authData,
      [elName]: elData,
    });
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          Authorisation
        </div>
        <div className="card-body">
          <h3>
            { error ? Object.keys(error).map(key => <div key={key}>{key + ": " + error[key]}</div>) : null }
          </h3>
          <form onSubmit={LogIn} autoComplete="on">
            <div className="row form-group">
              <div className="col-sm-12 col-md-8 col-lg-4 mb-12">
                <label htmlFor="validationServerUsername" />
                  Username (admin)
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend3"></span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="validationServerUsername"
                    placeholder="username"
                    aria-describedby="inputGroupPrepend3"
                    data-name="username"
                    onChange={(event) => onChangeHandler(event)}
                  />
                  <div className="invalid-feedback">
                    Please choose a correct username.
                  </div>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-12 col-md-8 col-lg-4 mb-12">
                <label htmlFor="inputPassword" />
                  Password (123)
                <div className="input-group">
                  <input
                    autoComplete="on"
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                    data-name="password"
                    onChange={(event) => onChangeHandler(event)}
                  />
                  <div className="invalid-feedback">
                    Password must be more than 2 characters.
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-primary" type="submit">Log In</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default LogIn;
