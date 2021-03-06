import React from 'react'
import { createRoot } from 'react-dom/client';
import App from '../src/App'
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom'

// redux part
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/Reducers';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, composeWithDevTools());
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
   <Provider store={store}>
      <Router>
         <App />
      </Router>
   </Provider>
);