import React from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'

import App from './../App.js'
import Home from '@/view/home/index.js'
import Chat from '@/view/chat/index.js'
import Login from '@/view/login/index.js'
const Root = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route
                    path="/"
                    render={props => (
                        <App>
                            <Switch>
                                <Route path="/" exact component={Home}></Route>
                                <Route path="/chat" component={Chat} />
                                <Route path="/login" component={Login} />
                                {/*路由不正确时，默认跳回home页面*/}
                                <Route render={() => <Redirect to="/" />} />
                            </Switch>
                        </App>
                    )}>
                </Route>
            </Switch>
        </div>
    </BrowserRouter>
 );
  
 export default Root;