import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
// need to imoport main js files

//components
import SVGIcons from "./components/SVGIcons";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TestContent from "./components/TestContent";

ReactDOM.render(
  <div style={{height:"100%"}}>
    <SVGIcons />
    <Header header="Jake Dawkins" subheader="Web Developer"/>

    <TestContent />

    <Footer />
  </div>,
  document.getElementById('root')
);
