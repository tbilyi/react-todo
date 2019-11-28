import React from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import TaskEditAction from '../../../components/TaskEdit/TaskEditAction';
import * as actions from '../../../store/actions';

const TaskEdit = ({ match, history }) => {
  const successMessage = useSelector((state) => state.tasks.successMessage);
  const dispatch = useDispatch();
  return (
    <>
      { !successMessage ? <TaskEditAction match={match} history={history} /> : 
      <button style={{marginTop: "20px"}} className="btn btn-success" onClick={()=>dispatch(actions.clearMessage())}>Действие прошло успешно!</button> }
    </>
  );
};

TaskEdit.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default TaskEdit;