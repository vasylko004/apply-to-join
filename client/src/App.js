import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// < pages
import Home from "./containers/home";
import ApplyToJoinComponent from "./containers/apply-to-join";
// pages >
// < redux functions
import reducer from './reducers';
import actionsSaga from './sagas';
// redux functions >
import { composeWithDevTools } from 'redux-devtools-extension';
import './App.css';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));


sagaMiddleware.run(actionsSaga);


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/apply-from" component={ApplyToJoinComponent} />
      </Router>
    </Provider>
  );
}

export default App;
