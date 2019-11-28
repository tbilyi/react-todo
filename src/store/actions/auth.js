import * as actionTypes from './actionTypes';
import { instance as axios } from '../../axios';

export const checkAuth = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (token && localStorage.getItem('expirationDate')) {
    dispatch(saveToken(token));
  }
};

export const clearErrors = () => ({
  type: actionTypes.CLEAR_ERRORS
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const saveToken = (token) => ({
  type: actionTypes.SAVE_TOKEN,
  token,
});

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = () => (dispatch) => {
  setTimeout(() => {
    dispatch(logOut());
  }, 86400000);
};

export const LogIn = (username, password) => (dispatch) => {

  var bodyFormData = new FormData();
  bodyFormData.set('username', username);
  bodyFormData.append('password', password);

  axios.post("login?developer=taras", bodyFormData)
  .then((response) => {
    if (response.data.status === "ok"){
      const expirationDate = new Date(new Date().getTime() + 86400000);
      localStorage.setItem('token', response.data.message.token);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(saveToken(response.data.message.token));
      dispatch(checkAuthTimeout());
      dispatch(clearErrors());
    } else if (response.data.status === "error") {
      dispatch(authFail(response.data.message));
    }
  })
  .catch((err) => {
    dispatch(authFail(err));
  });
};