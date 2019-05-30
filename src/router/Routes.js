import React from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'

import App from './../App.js'
import Chat from '@/view/chat.js'
import Login from '@/view/login.js'
import Test from '@/view/test.js'
const Root = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route
                    path="/"
                    render={props => (
                        <App>
                            <Switch>
                                <Route path="/" exact component={Chat} />
                                <Route path="/login" component={Login} />
                                <Route path="/test" component={Test}></Route>
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