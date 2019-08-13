import React, { Component } from 'react'
import '@/common/less/article.less'
import { getArticleDate } from '@/common/utils/utils.js'
import { Carousel, Skeleton, BackTop } from 'antd';
import { getTags, getArticle } from '@/js/api.js'
class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navData: [],
            list: {
                list: [],
                major: [],
                major2: []
            }
        }
        this.getNav = () => {
            getTags().then(res => {
                if (res) {
                    this.setState({
                        navData: res.data || []
                    })
                }
            })
        }
        this.getArticle = () => {
            getArticle().then(res => {
                if (res && res.data.code === 0) {
                    this.setState({
                        list: res.data.data
                    })
                }
            })
        }
        this.goEditArticle = () => {
            this.props.history.push({
                pathname: '/edit-article'
            })
        }
        this.getTagName = (id) => {
            if (this.state.navData && this.state.navData.length) {
                const data = this.state.navData.filter(v => {
                    return v.id === id
                }) || [{ tag: '' }]
                return data[0].tag
            }
            return ''
        }
    }
    componentWillMount() {
        this.getNav()
        this.getArticle()
    }
    render() {
        const { navData, list } = this.state
        return (
            <div className="home-article-box">
                <div className="home-article">
                    <div className="article-header_banner">
                        <div className={`header-banner_left ${!(list.list && list.list.length) ? 'zhanwei zhanwei-article' : '' }`}>
                            <Carousel >
                                {
                                    list.major.map(v => {
                                        return (
                                            <div className="banner-left_item" key={v.id}>
                                                <img src={v.articleImg} />
                                                <span className="article-tip_span">{v.title}</span>
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                        <div className="header-banner_right">
                            {
                                !(list && list.list.length) && <ul>
                                    <li className="zhanwei zhanwei-article"></li>
                                    <li className="zhanwei zhanwei-article"></li>
                                    <li className="zhanwei zhanwei-article"></li>
                                    <li className="zhanwei zhanwei-article"></li>
                                </ul>
                            }
                            <ul>
                                {
                                    list.major2.map(v => {
                                        return (
                                            <li key={v.id}>
                                                <img src={v.articleImg} />
                                                <span className="article-tip_span">{v.title}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="article-center">
                        <div className="article-center_title">
                            <h3>最新</h3>
                        </div>
                        <Skeleton active loading={!(list.list && list.list.length)}>
                            <ul className="article-center_text">
                                {
                                    list.list.map(v => {
                                        return (
                                            <li className="center-text_li" key={v.id}>
                                                <div className="text-li_left">
                                                    <img src={v.articleImg} />
                                                    <span className="article-tip_span">{v.title}</span>
                                                </div>
                                                <div className="text-li_text">
                                                    <span className="text-li_label text-li_dian label-tag">{this.getTagName(v.tagId)}</span>
                                                    <span className="text-li_label text-li_dian label-userName">{v.userName || '佚名'}</span>
                                                    <span className="text-li_label label-date">{getArticleDate(v.createDate)}</span>
                                                    <h4 className="text-li_header">{v.title}</h4>
                                                    <p className="text-li_center">{v.introduce}</p>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </Skeleton>
                    </div>
                </div>
                <div className="article-edit-box">
                    <i className="edit-article" onClick={this.goEditArticle}>+</i>
                </div>
            </div>
        )
    }
}

export default Article