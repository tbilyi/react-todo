import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import TaskEdit from './containers/Tasks/TaskEdit/TaskEdit';
import Account from "./containers/Account/Account";
import AddTask from './containers/Tasks/AddTask/AddTask';
import TasksList from './containers/Tasks/TasksList/TasksList';
import * as actions from './store/actions';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  dispatch(actions.checkAuth());

  return (
    <div className="App">
      <Navigation />
      <div className="container-fluid">
        <Switch>
          <Route path="/tasks" exact component={TasksList} /> 
          <Route path="/task/edit/:id" component={TaskEdit} />
          <Route path="/account" component={Account} />
          <Route path="/add-task" component={AddTask} />
          <Redirect to="/tasks" />
        </Switch>
      </div>
    </div>
  );
}
export default App
