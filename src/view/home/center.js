import React, { Component } from 'react';
import { Icon } from 'antd'
import '@/common/less/home.less'

class Center extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="home-center page2">
                <div className="home-center_box">
                    <div className="center-box">
                        <h2 className="center-box_title">
                            Hi,你好！ 我是
                            <strong>许道斌</strong>
                        </h2>
                        <article className="center-box_article">
                            分享知识，传播快乐。很高兴认识你。欢迎来到这个网站。这里有前端开发最前沿的知识。以及一个前端开发工程师的日常(*^_^*)
                            <div className="box-article_tag">
                                <span>Html</span>
                                <span>Css</span>
                                <span>JS</span>
                                <span>Node</span>
                                <span>以及更改多...</span>
                            </div>
                            快加入我们，一起分享把
                            <a href="/login"> 注册</a>
                        </article>
                    </div>
                    <ul className="center-box_btn">
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Center