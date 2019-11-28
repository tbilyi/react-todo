import React from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const TasksListItem = ({
  id,
  username,
  email,
  text,
  status,
  edited,
}) => {
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td>{text}</td>
        <td>{status ? "выполнено" : "не выполнено"}
          { edited ? 
          <small className="small-text"><br />отредактировано администратором</small>
           : null }
        </td>
        <th scope="row">  
        { token ?         
          <NavLink to={`/task/edit/${id}`}>
            edit
          </NavLink> : 
          <NavLink to={`/account`}>
            <small>log in</small>
          </NavLink>}
        </th>
      </tr>
    </>
  );
};

TasksListItem.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
};

export default TasksListItem;
