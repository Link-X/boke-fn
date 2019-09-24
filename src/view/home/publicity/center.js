import React, { Component } from 'react'
import { Tabs } from 'antd'
import '@/common/less/home.less'

const { TabPane } = Tabs

class Center extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="home-center page2">
                <div className="home-center_box">
                    <div className="center-box">
                        <Tabs tabPosition="bottom">
                            <TabPane tab="" key="1" className="center-box_article">
                                <h2 className="center-box_title">
                                    Hi,你好！ 我是
                                    <strong>许道斌</strong>
                                </h2>
                                <article>分享知识，传播快乐。很高兴认识你。欢迎来到这个网站。这里有前端开发最前沿的知识。以及一个前端开发工程师的日常(*^_^*)</article>
                                <ul className="box-article_tag">
                                    <li>Html</li>
                                    <li>Css</li>
                                    <li>JS</li>
                                    <li>Node</li>
                                    <li>以及更多.....</li>
                                </ul>
                                 欢迎加入，一起分享吧&nbsp;
                                <a href="#/login">注册</a>
                            </TabPane>
                            <TabPane tab="" key="2" className="center-box_article">
                                <ul className="box-article_list">
                                    <li>人生可以是一条可以不断追逐的路，也可以是一个波澜不惊的河流，但是它不会停止前进</li>
                                    <li>世界不会停止变化，若干年后。我们还能继续跟上它的步伐吗？</li>
                                    <li>信仰是人生杠杆的支撑点，具备这个支撑点，才可能成为一个强而有力的人</li>
                                </ul>
                            </TabPane>
                            <TabPane tab="" key="3" className="center-box_article">
                                我喜欢思考一些社会和哲学相关的问题。热爱生活，喜欢大海。正在看《人类简史》这是一部很有意思的书，推荐————
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}

export default Center