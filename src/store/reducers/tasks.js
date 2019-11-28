import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility/index';

const initialState = {
  tasks: [],
  tasksCount: 0,
  error: null,
  successMessage: 0
};

const reqFail = (state, { error }) => updateObject(state,  { error });
const reqSuccess = (state) => updateObject(state,  { successMessage:1 });
const clearMessage = (state) => updateObject(state,  { successMessage:0 });
const clearErrors = (state) => updateObject(state,  { error:null });
const saveTasks = (state, { tasks, tasksCount }) => updateObject(state, { 
  tasks,
  tasksCount,
  error: null,
});

const authLogout = (state) => updateObject(state, { token: null, userId: null });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQ_FAIL: return reqFail(state, action);
    case actionTypes.SAVE_TASKS: return saveTasks(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.REQ_SUCCESS: return reqSuccess(state);
    case actionTypes.CLEAR_MESSAGE: return clearMessage(state);
    case actionTypes.CLEAR_ERRORS: return clearErrors(state);
    default:
      return state;
  }
};

export default reducer;