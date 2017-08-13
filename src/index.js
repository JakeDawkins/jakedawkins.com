import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import registerServiceWorker from './registerServiceWorker';

import Background from './assets/bg.png';

import Header from './components/header';
import Content from './components/content';
import Social from './components/social';
import Footer from './components/footer';

const App = () => {
  return (
    <div style={styles.container}>
      <Header heading="Jake Dawkins" subHeading="I make dope stuff" />
      <Content content={content} />
      <Social accounts={socials} />
      <Footer />
    </div>
  );
};

const content = [
  {
    type: 'editorial',
    title: 'The Importance of Unimportant Hobbies',
    url: 'https://google.com',
  },
  {
    type: 'photo',
    title: 'Click this because I want you to',
    url: 'https://google.com',
  },
  {
    type: 'link',
    title: 'I Promise This Link Is Safe',
    url: 'https://google.com',
  },
];

const socials = [
  { name: 'twitter', url: 'https://twitter.com/jakedawkins' },
  { name: 'github', url: 'https://github.com/jakedawkins' },
  { name: 'medium', url: 'https://medium.com/@jakedawkins' },
];

const styles = {
  container: {
    minHeight: 'min-content',
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
