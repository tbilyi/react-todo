import * as actionTypes from './actionTypes';
import { instance as axios } from '../../axios';

export const reqFail = (error) => ({
  type: actionTypes.REQ_FAIL,
  error,
});

export const successReq = () =>({
  type: actionTypes.REQ_SUCCESS
});

export const clearMessage = () =>({
  type: actionTypes.CLEAR_MESSAGE
});

export const AddTask = (username, email, text) => (dispatch) => {
  
    var bodyFormData = new FormData();
    bodyFormData.set('username', username);
    bodyFormData.append('email', email);
    bodyFormData.append('text', text);
  
    axios.post("create?developer=taras", bodyFormData)
    .then((response) => {
      if (response.data.status === "ok"){
        dispatch(getTasks());
        dispatch(successReq())
      } else if (response.data.status === "error") {
        dispatch(reqFail(response.data.message));
      }
    })
    .catch((err) => {
      dispatch(reqFail(err));
    });
};

export const saveTasks = (tasks, tasksCount) => ({
    type: actionTypes.SAVE_TASKS,
    tasks,
    tasksCount,
  });

export const getTasks = (page=1, sortField="id", sortDirection="desc") => (dispatch) => {
    axios.get(`?developer=taras&page=${page}&sort_field=${sortField}&sort_direction=${sortDirection}`)
    .then((response) => {
      if (response.data.status === "ok"){
        const editedText = localStorage.getItem("editedText");
        let respTasks = response.data.message.tasks;
        if (editedText) {
          respTasks = respTasks.map((TaskItem) => {
            if (TaskItem.id === +editedText) {
              TaskItem.edited = true;
            }
            return TaskItem;
          });
        }
        dispatch(saveTasks(respTasks, response.data.message.total_task_count));
        localStorage.removeItem('editedTask');
      } else if (response.data.status === "error") {
        dispatch(reqFail(response.data.message));
      }
    })
    .catch((err) => {
      dispatch(reqFail(err));
    });
};


export const editTask = (id, token, text, status, isEdited) => (dispatch) => {
  var bodyFormData = new FormData();
    bodyFormData.set('token', token);
    bodyFormData.append('text', text);
    bodyFormData.append('status', status);
    axios.post(`/edit/${id}/?developer=taras`, bodyFormData)
    .then((response) => {
      if (response.data.status === "ok"){
        if (isEdited) {
          localStorage.setItem("editedText", id);
        }
        dispatch(getTasks());
        dispatch(successReq())
      } else if (response.data.status === "error") {
        dispatch(reqFail(response.data.message));
      }
    })
    .catch((err) => {
      dispatch(reqFail(err));
    });
};


