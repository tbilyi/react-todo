import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function SimpleTabs() {

  const [toggleButtonClass, setToggleButtonClass] = useState(['collapse', 'navbar-collapse']);
  const toggleButtonClassJoin = () => toggleButtonClass.join(' ');
  const avatar = require('../../../src/assets/images/account.jpg');

  const showMobileItems = () => {
    if (toggleButtonClass.length === 2) {
      setToggleButtonClass([...toggleButtonClass, 'show']);
    } else {
      setToggleButtonClass([...toggleButtonClass].splice(0, 2));
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <span className="navbar-brand">Задачник</span>
      <button
        onClick={showMobileItems}
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor02"
        aria-controls="navbarColor02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className={toggleButtonClassJoin()} id="navbarColor02">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/tasks"
            >
              Список задач
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/add-task"
            >
              Добавить задачу
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/account"
            >
              <img width="30px" alt="" src={avatar} />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
