import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions';

const TasksListWrapper = ({ children }) => {
  const tasksCount = useSelector((state) => state.tasks.tasksCount);
  let pageNumbers = [];

  const dispatch = useDispatch();
  const getTasks = (page) => {
    dispatch(actions.getTasks(page, sortField, sortDirection));
    setcount(page);
  }
  const increaseCount = () => {
    dispatch(actions.getTasks(count + 1, sortField, sortDirection));
    setcount(count + 1);
  }
  const decreaseCount = () => {
    const newCount = count > 1 ? count -1 : count;
    dispatch(actions.getTasks(newCount, sortField, sortDirection));
    setcount(newCount);
  }

  const sortTable = (value) => {
    setSortField(value);
    let sort = sortDirection;
    if (sort === "asc"){
      sort = "desc";
      setSortDirection("desc");
    } else {
      sort = "asc";
      setSortDirection("asc");
    }
    dispatch(actions.getTasks(count, value, sort));
  }

  const [count, setcount] = useState(1);
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortField, setSortField] = useState("id");

  for (let i=1; i<(tasksCount / 3)+1 && i<30; i++) {
    pageNumbers.push (
      <li key={i} className={ i===count ? `active page-item` : `page-item`}><button onClick={() => getTasks(i)} className="page-link" >{i}</button></li>
    )
  }


  return (
  <div>
    <div className="card">
      <div className="card-header">
        Задачи
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{width: "10%"}} onClick={() => sortTable("id")} className="sort-table" scope="col">id</th>
              <th style={{width: "15%"}} onClick={() => sortTable("username")} className="sort-table" scope="col">имя пользователя</th>
              <th style={{width: "25%"}} onClick={() => sortTable("email")} className="sort-table" scope="col">email</th>
              <th style={{width: "25%"}} scope="col">текст задачи</th>
              <th style={{width: "15%"}} onClick={() => sortTable("status")} className="sort-table" scope="col">статус</th>
              <th style={{width: "10%"}} scope="col">действие</th>
            </tr>
          </thead>
          <tbody>
            { children }
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
         <li className="page-item">
            <button onClick={() => decreaseCount()} disabled={ count === 1 ? true : false } className="page-link" tabIndex="-1">Previous</button>
          </li>
            {pageNumbers.map(i=>i)}
            
          <li className="page-item">
            <button onClick={() => increaseCount()} disabled={ count < tasksCount / 3 ? false : true } className="page-link" >Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);
};

TasksListWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
export default TasksListWrapper;
