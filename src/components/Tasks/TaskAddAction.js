import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';

const TaskAddAction = () => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    username: {
      value: '',
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
    },
    email: {
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
    },
    text: {
      value: '',
      validation: {
        required: true,
        minLength: 5,
      },
      valid: false,
    },
  });
  const error = useSelector((state) => state.tasks.error);
  const AddTask = (event) => {
    event.preventDefault();
    dispatch(actions.AddTask(taskData.username.value, taskData.email.value, taskData.text.value));
  };
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
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value);
    }
    return isValid;
  };

  const onChangeHandler = (event) => {
    const elName = event.target.dataset.name;
    const elData = {
      ...taskData[elName],
      value: event.target.value,
      valid: checkValidity(event.target.value, taskData[elName].validation),
    };
    if (elData.valid) {
      event.target.className = 'form-control';
    } else {
      event.target.className = 'form-control is-invalid';
    }
    setTaskData({
      ...taskData,
      [elName]: elData,
    });
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          Добавить задачу
        </div>
        <div className="card-body">
          <h3>
            { error ? Object.keys(error).map(key => <div key={key}>{key + ": " + error[key]}</div>) : null }
          </h3>
          <form onSubmit={AddTask} autoComplete="on">
          <div className="row form-group">
              <div className="col-sm-12 col-md-8 col-lg-4 mb-12">
                <label htmlFor="inputUserName" />
                  username
                <div className="input-group">
                  <input
                    autoComplete="on"
                    type="text"
                    className="form-control"
                    id="inputUserName"
                    placeholder="UserName"
                    data-name="username"
                    onChange={(event) => onChangeHandler(event)}
                  />
                  <div className="invalid-feedback">
                    Username must be more than 2 characters.
                  </div>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-12 col-md-8 col-lg-4 mb-12">
                <label htmlFor="validationServerEmail" />
                  email
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend3">@</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="validationServerEmail"
                    placeholder="email"
                    aria-describedby="inputGroupPrepend3"
                    data-name="email"
                    onChange={(event) => onChangeHandler(event)}
                  />
                  <div className="invalid-feedback">
                    Please choose a correct email.
                  </div>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-12 col-md-8 col-lg-4 mb-12">
              <label htmlFor="inputText" />
                  text
                  <div className="input-group">
                <textarea 
                  className="form-control" 
                  id="exampleFormControlTextarea1"
                  data-name="text" 
                  onChange={(event) => onChangeHandler(event)}
                  rows="3">
                </textarea>
                <div className="invalid-feedback">
                  Description must be more than 4 characters.
                </div>
                </div>
              </div>
            </div>
            <button className="btn btn-primary" type="submit">Создать задачу</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default TaskAddAction;
