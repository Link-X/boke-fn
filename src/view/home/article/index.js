import React, { Component } from 'react'
import '@/common/less/article.less'
import { getArticleDate, throttle } from '@/common/utils/utils.js'
import { Carousel, Skeleton } from 'antd';
import { getTags, getArticle, getMajor } from '@/js/api.js'
class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navData: [],
            list: {
                list: [],
                major: [],
                major2: []
            },
            page: 1
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
        this.getArticle = (page = 1) => {
            getArticle({
                page: page,
                pageSize: 20
            }).then(res => {
                if (res && res.data && res.data.code === 0) {
                    let { list } = this.state
                    list.list = list.list.concat(res.data.data.list)
                    this.setState({
                        list,
                        page: page
                    })
                }
            })
        }
        this.getMajor = () => {
            getMajor().then(res => {
                if (res && res.data && res.data.code === 0) {
                    let { list } = this.state
                    list.major = list.major.concat(res.data.data.major)
                    list.major2 = list.major2.concat(res.data.data.major2)
                    this.setState({
                        list
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
        this.getScrollTop = () => {
        　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        　　if(document.body){
        　　　　bodyScrollTop = document.body.scrollTop;
        　　}
        　　if(document.documentElement){
        　　　　documentScrollTop = document.documentElement.scrollTop;
        　　}
        　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        　　return scrollTop;
        }
        this.getWindowHeight = () => {
            var windowHeight = 0;
        　　if(document.compatMode == "CSS1Compat"){
        　　　　windowHeight = document.documentElement.clientHeight;
        　　}else{
        　　　　windowHeight = document.body.clientHeight;
        　　}
        　　return windowHeight;
        }
        this.getScrollHeight = () => {
        　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        　　if(document.body){
        　　　　bodyScrollHeight = document.body.scrollHeight;
        　　}
        　　if(document.documentElement){
        　　　　documentScrollHeight = document.documentElement.scrollHeight;
        　　}
        　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        　　return scrollHeight;
        }
        this.initScroll = () => {
            const that = this
            window.addEventListener('scroll', throttle(function(){
            　　if(that.getScrollTop() + that.getWindowHeight() == that.getScrollHeight()){
                    that.getArticle(that.state.page += 1)
            　　}
            }, 500, 800))
        }
        this.goDetiles = (e) => {
            if (e.target.nodeName !== "UL") {
                const id = Number(e.target.getAttribute('id'))
                this.props.history.push({
                    pathname: '/article-detials/' + id
                })
            }
        }
    }
    componentWillMount() {
        this.getNav()
        this.getArticle()
        this.getMajor()
        this.initScroll()
    }
    render() {
        const { navData, list } = this.state
        return (
            <div className="home-article-box">
                <div className="home-article">
                    <div className="article-header_banner">
                        <div className={`header-banner_left ${!(list.list && list.list.length) ? 'zhanwei zhanwei-article' : '' }`}>
                            <Carousel>
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
                            <ul onClick={this.goDetiles}>
                                {
                                    list.major2.map(v => {
                                        return (
                                            <li key={v.id} id={v.id}>
                                                <img src={v.articleImg}  id={v.id} />
                                                <span className="article-tip_span"  id={v.id}>{v.title}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="article-center">
                        <div className="article-center_title">
                            <h3>最新<span style={{ display: 'inline-block', fontWeight: '100', fontSize: '12px', marginLeft: '3px'}}>news</span></h3>
                        </div>
                        <Skeleton active loading={!(list.list && list.list.length)}>
                            <ul className="article-center_text" onClick={this.goDetiles}>
                                {
                                    list.list.map(v => {
                                        return (
                                            <li className="center-text_li" key={v.id} id={v.id}>
                                                <div className="text-li_left"  id={v.id}>
                                                    <img src={v.articleImg}  id={v.id} />
                                                    <span className="article-tip_span"  id={v.id}>{v.title}</span>
                                                </div>
                                                <div className="text-li_text"  id={v.id}>
                                                    <span className="text-li_label text-li_dian label-tag"  id={v.id}>{this.getTagName(v.tagId)}</span>
                                                    <span className="text-li_label text-li_dian label-userName"  id={v.id}>{v.userName || '佚名'}</span>
                                                    <span className="text-li_label label-date"  id={v.id}>{getArticleDate(v.createDate)}</span>
                                                    <h4 className="text-li_header"  id={v.id}>{v.title}</h4>
                                                    <p className="text-li_center"  id={v.id}>{v.introduce}</p>
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