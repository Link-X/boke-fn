import React, { Component } from 'react'
import '@/common/less/article.less'
import { Carousel } from 'antd';
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
        this.getArticleDate = (timesData)  => {
            const dateBegin = new Date(timesData)
            const dateEnd = new Date()
            const dateDiff = dateEnd.getTime() - dateBegin.getTime() // 时间差的毫秒数
            const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)) // 计算出相差天数
            const leave1 = dateDiff % (24 * 3600 * 1000)    // 计算天数后剩余的毫秒数
            const hours = Math.floor(leave1 / (3600 * 1000))// 计算出小时数
            //计算相差分钟数
            const leave2 = leave1 % (3600 * 1000)    // 计算小时数后剩余的毫秒数
            const minutes = Math.floor(leave2 / (60 * 1000))// 计算相差分钟数
            //计算相差秒数
            const leave3 = leave2 % (60 * 1000)      // 计算分钟数后剩余的毫秒数
            const seconds = Math.round(leave3 / 1000)
            let timesString = ''
        
            if (dayDiff != 0) {
                timesString = dayDiff + '天之前'
            } else if (dayDiff == 0 && hours != 0) {
                timesString = hours + '小时之前'
            } else if (dayDiff == 0 && hours == 0) {
                timesString = minutes + '分钟之前'
            }
        
            return timesString
        }
        // <ul className="article-nav">
                    //     {
                    //         navData.map(v => {
                    //             return (
                    //                 <li key={v.id}>{v.tag}</li>
                    //             )
                    //         })
                    //     }
                    // </ul>
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
                        <div className="header-banner_left">
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
                                                <span className="text-li_label label-date">{this.getArticleDate(v.createDate)}</span>
                                                <h4 className="text-li_header">{v.title}</h4>
                                                <p className="text-li_center">{v.introduce}</p>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
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