import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import Loadable from 'react-loadable';


const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return <div>....</div>
    }
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>
    }
    else {
        return null;
    }
};

const App = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ './../App.js'),
    loading: MyLoadingComponent
})
const Home = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ '@/view/home/index.js'),
    loading: MyLoadingComponent
})
const Chat = Loadable({
    loader: () => import(/* webpackChunkName: "home" */ '@/view/chat/index.js'),
    loading: MyLoadingComponent
})
const Login = Loadable({
    loader: () => import(/* webpackChunkName: "login" */ '@/view/login/index.js'),
    loading: MyLoadingComponent
})
const EditArticle = Loadable({
    loader: () => import(/* webpackChunkName: "article" */ '@/view/edit-article/index.js'),
    loading: MyLoadingComponent
})
const ArticleDetials = Loadable({
    loader: () => import(/* webpackChunkName: "article" */ '@/view/article-details/index.js'),
    loading: MyLoadingComponent
})
const Datum = Loadable({
    loader: () => import(/* webpackChunkName: "Datum" */ '@/view/datum/index.js'),
    loading: MyLoadingComponent
})
// const rootRoute = {
//     path: '/xdb',
//     getChildRoutes(location, cb) {
//         cb(null, [
//             {
//                 path: '/chat',
//                 onEnter: (r) => {
//                     setTitle('俩套');
//                 },
//             }
//         ])
//     }
// }
const Root = () => (
    <HashRouter>
        <Switch>
            <Route
                path="/"
                render={props => (
                    <App>
                        <Switch>
                            <Route path="/" exact component={ Home }></Route>
                            <Route path="/chat" component={ Chat } />
                            <Route path="/login" component={ Login } />
                            <Route path="/edit-article" component={ EditArticle } />
                            <Route path="/datum" component={Datum}></Route>
                            <Route exact path="/article-detials/:id" component={ ArticleDetials } />
                            {/*路由不正确时，默认跳回home页面*/}
                            <Route render={() => <Redirect to="/" />} />
                        </Switch>
                    </App>
                )}>
            </Route>
        </Switch>
    </HashRouter>
 );
  
 export default Root;