import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import { hashHistory } from 'react-router';

//components
import Routes from "./Routes";

ReactDOM.render(
  <Routes history={hashHistory}/>,
  document.getElementById('root')
);
