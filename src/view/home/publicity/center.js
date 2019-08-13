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
                                 快加入我们，一起分享把&nbsp;
                                <a href="#/login">注册</a>
                            </TabPane>
                            <TabPane tab="" key="2" className="center-box_article">
                                <ul className="box-article_list">
                                    <li>人生是什么，也许就是一条不断追逐中的路吧。</li>
                                    <li>当时间过去这个世界依然会变。我们还能继续跟上它的步伐吗？</li>
                                    <li>人生你有着怎么样的思考呢？你是否也会感觉到思维似乎也是有边界。</li>
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