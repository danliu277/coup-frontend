import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { ActionCableProvider } from "actioncable-client-react";
import { API_WS_ROOT } from './constants';
import { register } from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import 'bootstrap/dist/css/bootstrap.min.css';

let store = createStore(reducer);

ReactDOM.render(
    <ActionCableProvider url={API_WS_ROOT}>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </ActionCableProvider>,
    document.getElementById('root')
);
register()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
