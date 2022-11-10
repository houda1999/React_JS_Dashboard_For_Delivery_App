import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import Theme from './resources/theme';
import Routes from './routes/index';
import './index.css';

function App() {
  return (
    <ThemeProvider theme={Theme}>
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
