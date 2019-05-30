import React, { Component } from 'react';
import { render } from 'react-dom';
import Root from './router/Routes.js'
import 'antd-mobile/dist/antd-mobile.css'; 


render( 
    <Root />,
    document.getElementById('app')
)


