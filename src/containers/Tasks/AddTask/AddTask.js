import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskAddAction from '../../../components/Tasks/TaskAddAction';
import * as actions from '../../../store/actions';

const AddTask = () => {
  const successMessage = useSelector((state) => state.tasks.successMessage);
  const dispatch = useDispatch();
  return (
    <>
      { !successMessage ? <TaskAddAction /> : 
      <button style={{marginTop: "20px"}} className="btn btn-success" onClick={()=>dispatch(actions.clearMessage())}>Действие прошло успешно!</button> }
    </>
  );
};

export default AddTask;