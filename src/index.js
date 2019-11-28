import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  createStore, applyMiddleware, combineReducers,
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import authReducer from './store/reducers/auth';
import tasksReducer from './store/reducers/tasks';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker.register();
