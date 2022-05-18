import React, {Component, Fragment} from 'react';
import ReactDom from 'react-dom';
import  {Provider} from 'react-redux';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import store from '../store';

import Header from './layout/Header';
import Dashboard from './leads/Dashboard';
import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';
import { loadUser } from '../actions/auth';

//Alert Options

const alertOptions = {
    timeout : 4000,
    position : "top center"
}

class App extends Component{
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return ( 

            <Provider store={store} >
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header/>
                            <Alerts/>
                            <div className="container">
                                <Switch>
                                    <PrivateRoute exact path="/" component={Dashboard}/>
                                </Switch>
                                <Switch>
                                    <Route exact path="/register" component={Register} />
                                </Switch>
                                <Switch>
                                    <Route exact path="/login" component={Login} />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )   
        
    }
}

ReactDom.render(<App/>, document.getElementById('app'));