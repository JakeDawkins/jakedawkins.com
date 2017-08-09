import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import registerServiceWorker from './registerServiceWorker';

import Background from './assets/bg.png';

import Header from './header';
import Content from './content';
import Social from './social';
import Footer from './footer';

const App = () => {
  return (
    <div style={styles.container}>
      <Header />
      <Content />
      <Social />
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'repeat',
    fontFamily: 'helvetica',
  },
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
