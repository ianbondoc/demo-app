import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {UserService} from "./services/UserService";

const renderApp = () => ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
UserService.initKeycloak(renderApp)