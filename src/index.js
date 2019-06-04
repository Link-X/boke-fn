import React, { Component } from 'react';
import { render } from 'react-dom';
import Root from './router/Routes.js'
import 'antd/lib/date-picker/style';
import '@/common/less/reset.less'
import { Form, Icon, Input, Button, Checkbox  } from 'antd'

render( 
    <Root />,
    document.getElementById('app')
)


