import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';
import Root from './router/Routes.js'
import 'antd/lib/date-picker/style';
import '@/common/less/reset.less'

render( 
    <Root />,
    document.getElementById('app')
)


