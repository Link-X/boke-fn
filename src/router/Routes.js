import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'

import App from './../App.js'
import Home from '@/view/home/index.js'
import Chat from '@/view/chat/index.js'
import Login from '@/view/login/index.js'
import EditArticle from '@/view/home/article/edit-article.js'
import ArticleDetials from '@/view/article-details/index.js'
import PhotoAlbum from '@/view/photo-album/index.js'
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
                            <Route exact path="/article-detials/:id" component={ ArticleDetials } />
                            <Route path="/photo-album" component={ PhotoAlbum } />
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