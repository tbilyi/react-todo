import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TasksListItem from '../../../components/TasksList/TasksListItem';
import TasksListWrapper from '../../../components/TasksList/TasksListWrapper';
import * as actions from '../../../store/actions';

const TasksList = () => {

    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (!tasks.length){
        dispatch(actions.getTasks());
      }
    },[tasks, dispatch]);

  return (
    <TasksListWrapper>
      <>
         { tasks.length ? tasks.map((task) => (
          <TasksListItem
            key={task.id}
            id={task.id}
            username={task.username}
            email={task.email}
            text={task.text}
            status={task.status}
            edited={task.edited}
          />
        ))
          : (
            <tr className="table-active">
              <th colSpan="4" scope="row">There are no tasks yet</th>
            </tr>
          )}
      </>
    </TasksListWrapper>
  );
};

export default TasksList;