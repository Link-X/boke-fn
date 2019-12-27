import "babel-polyfill";
import React from 'react';
import { render } from 'react-dom';
import Root from './router/Routes.js'
import 'antd/lib/date-picker/style';
import '@/common/less/reset.less'
import wpkReporter from 'wpk-reporter' // 导入基础sdk

const __wpk = new wpkReporter({
  bid: 'xudaobin-dtagam3v', // 新建应用时确定
  spa: true,  // 单页应用开启后，可更准确地采集PV
  plugins: []
})
__wpk.installAll() // 初始化sdk 必须调用\
console.log(__wpk);
render( 
    <Root />,
    document.getElementById('app')
)


