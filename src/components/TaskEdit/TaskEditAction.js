import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';

const TaskEditAction = ({ match, history }) => {
  const taskId = match.params.id;
  const tasks = useSelector((state) => state.tasks.tasks);
  let [task] = tasks.filter((TaskItem) => TaskItem.id === +taskId);
  if (task) {
    localStorage.setItem('editedTask', task);
  } else {
    task = localStorage.getItem('editedTask') || {};
  }
  const dispatch = useDispatch();
  const error = useSelector((state) => state.tasks.error);
  let token = useSelector((state) => state.auth.token);
  if (!token && localStorage.getItem('expirationDate')) {
    token = localStorage.getItem('token');
  }
  const [textData, setTextData] = useState(task.text);
  const [checked, setChecked] = useState(task.status);

  const editTask = (event) => {
    event.preventDefault();
    const checkToken = localStorage.getItem('token') && localStorage.getItem('expirationDate');
    const isEdited = (task.text !== textData)
    if (checkToken) {
      dispatch(actions.editTask(taskId, token, textData, checked, isEdited));
    } else {
      dispatch(actions.logOut());
      history.push("/account");
    }
  };

  const onChangeTextHandler = (event) => {
    setTextData(event.target.value);
  };
  const onChangeCheckHandler = (event) => {
    setChecked(event.target.checked ? 10 : 0);
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          Edit Task
        </div>
        <div className="card-body">
          <h3>
            { error ? Object.keys(error).map(key => <div key={key}>{key + ": " + error[key]}</div>) : null }
          </h3>
          <form onSubmit={editTask} autoComplete="on">
            <input 
              type="checkbox" 
              data-name="status"
              checked={checked}
              onChange={(event) => onChangeCheckHandler(event)} />
               Задача Выполнена
            <br></br>
            <div className="row form-group">
              <div className="col-sm-12 col-md-8 col-lg-4 mb-12">
              <label htmlFor="inputText" />
                  Описание
                  <div className="input-group">
                <textarea 
                  className="form-control" 
                  id="exampleFormControlTextarea1"
                  data-name="text" 
                  onChange={(event) => onChangeTextHandler(event)}
                  rows="3"
                  defaultValue={task.text}>
                </textarea>
                </div>
              </div>
            </div>
            <button className="btn btn-primary" type="submit">Редактировать задачу</button>
          </form>
        </div>
      </div>
    </>
  );
};

TaskEditAction.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
};

export default TaskEditAction;
