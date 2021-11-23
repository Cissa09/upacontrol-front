import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import App from './containers/App';
import reportWebVitals from './reportWebVitals'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();


const Root = () => (
    <Router history={history}>
      <Switch>
        <Route path="/" component={App} />
        <Redirect to="/" />
      </Switch>
    </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
