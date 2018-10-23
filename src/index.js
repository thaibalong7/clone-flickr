import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { configureStore } from './store';
import * as actions from './actions';
import {Provider} from 'react-redux';

// const listPhoto = [
//     {
//       id: 1,
//       title: 'Em của ngày hôm qua'
//     },
//     {
//       id: 2,
//       title: 'Cơn mưa ngang qua'
//     }
//   ];
  

const store = configureStore();
// store.dispatch(actions.ini_listphoto(listPhoto));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
