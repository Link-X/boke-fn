import React, { Component } from 'react';
import { getArticleDetails, loveArticle, addCommentArticle, delArticle } from '@/js/api.js'
import { throttle } from '@/common/utils/utils.js'
import { formatDateTime, getArticleDate } from '@/common/utils/utils.js'
import { Input, Button, message, Modal } from 'antd';
import ReactMarkdown from 'react-markdown'
import CodeStyle from '@/view/edit-article/code-style.js'
import HeadingBlock from './heading-block.js'
import '@/common/less/article-details.less'
import 'github-markdown-css'

const { confirm } = Modal;
const { TextArea } = Input;
class ArticleDetails extends Component {
    constructor (props) {
        super(props)
        this.state = {
          details: {
            userName: '***',
            createDate: '2019-10-10 10:10',
            readNumber: 0,
            title: '标题',
            loverArticle: '',
            markdown: '<div></div>',
          },
          goTop: false,
          pinglun: '',
          pinglunList: []
        }
        this.loverArticle = this.loverArticle.bind(this)
        this.goPinLun = this.goPinLun.bind(this)
        this.editArticle = this.editArticle.bind(this)
        this.delArticle = this.delArticle.bind(this)
        this.scrollPage = this.scrollPage.bind(this)
        this.onChange = this.onChange.bind(this)
        this.submitPingLun = this.submitPingLun.bind(this)
    }
    onChange (e) {
      this.setState({
        pinglun: e.target.value
      })
    }
    submitPingLun() {
      if (this.state.pinglun && this.state.pinglun.length >= 5) {
        addCommentArticle({
          text: this.state.pinglun,
          articleId: this.state.details.id
        }).then(res => {
          if (res && res.data && res.data.code === 0) {
            message.success('评论成功')
            const { pinglunList } = this.state
            pinglunList.unshift(res.data.data)
            this.setState({
              pinglunList
            })
          }
        }).catch(err => {
          message.error('评论失败')
        })
        return
      }
      message.info('请最少输入5个字符')
    }
    scrollPage () {
      const that = this
      window.addEventListener('scroll', throttle(function(){
        if (document.documentElement.scrollTop >= 100) {
          that.setState({
            goTop: true
          })
        } else {
          that.setState({
            goTop: false
          })
        }
      }, 500, 800))
    }
    goPageTop() {
      window.scrollTo(0, 0)
    }
    getData() {
      const { id } = this.props.match.params
      if (id) {
        getArticleDetails({
          id
        }).then(res => {
          if (res && res.data && res.data.code === 0) {
            const data = res.data.data
            this.initNav(data.markdown)
            this.setState({
              details: data,
              pinglunList: [...data.pinglunList]
            })
          }
        })
      }
    }
    initNav(content) {
      let nav = [];
      let tempArr = [];
      content.replace(/(#+)[^#][^\n]*?(?:\n)/g, function(match, m1, m2) {
          let title = match.replace('\n', '');
          let level = m1.length;
          tempArr.push({
              title: title.replace(/^#+/, '').replace(/\([^)]*?\)/, ''),
              level: level,
              children: []
          });
      });
      console.log(tempArr)
      
      function initNav2(arr, arrObj, level) {
        arr.forEach((v, i) => {
          if(v.level > level) {
            v.children.push(arr.splice(i, 0))
            initNav2(arr, v.children, v.level)
          } else {
            arrObj.push(arr.splice(i, 0))
          }
        })
      }
      // 只处理一级二级标题，以及添加与id对应的index值
      nav = tempArr.filter(item => item.level <= 2);
      let index = 0;
      nav = nav.map(item => {
          item.index = index++;
          return item;
      });
      console.log(nav)
    }
    loverArticle() {
      loveArticle({
        id: this.state.details.id
      }).then(res => {
        if (res.data.code === 0) {
          const { details } = this.state
          details.userLoveStatus = res.data.data.status
          details.loveLen = Number(res.data.data.loveLen)
          this.setState({
            details
          })
        }
      })
    }
    goPinLun() {
      const height = document.querySelector('.article-details_box').getBoundingClientRect().height
      window.scrollTo(0, height);
      this.refs.pinglunRef.focus()
    }
    editArticle(e) {
      e.preventDefault()
      this.props.history.push({
        pathname: '/edit-article',
        query: {
          id: this.state.details.id
        }
      })
    }
    delTip (cb, text) {
      confirm({
        title: text ? text: '确定删除？',
        content: '确定要删除吗？',
        okType: 'danger',
        cancelText: '取消',
        okText: '删',
        onOk: () => {
          cb()
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
    delArticle() {
      this.delTip(() => {
        this.delTip(() => {
          delArticle({id: this.state.details.id}).then(res => {
            message.success('删除成功')
            setTimeout(() => {
              window.location.href = '/'
            }, 500)
          })
        }, '再次确定？')
      })
    }
    componentDidMount() {
      this.getData()
      this.scrollPage()
    }
    render () {
        const { details, goTop, pinglun, pinglunList } = this.state
        return (
          <div className="article-details_box" ref="articleDetailsBox">
            <div className="markdown-body_box">
              <div className="article-user_box">
                <div className="user-box_image">
                  <img src={details.userImage} />
                </div>
                <div className="article-user_text">
                  <span className="user-text_title">{details.userName}</span>
                  <p className="user-text_date">
                    <span>{formatDateTime(details.createDate)}</span>
                    <span>阅读: {details.articleReadCountLen || 0}</span>
                    {details.isEdit && <a onClick={this.editArticle}> <b className="article-edit_btn" onClick={this.editArticle}>编辑</b> </a>}
                    {details.isEdit && <a> <b className="article-edit_btn" onClick={this.delArticle}>删除</b> </a>}
                  </p>
                </div>
              </div>
              <h2 className="markdown-body_title">{details.title}</h2>
              <ReactMarkdown 
                  className="markdown-body"
                  skipHtml={true}
                  renderers={{
                    code: CodeStyle,
                    heading: HeadingBlock
                  }}
                  source={details.markdown}>
              </ReactMarkdown>
              <div className="article-left-tools">
                <div className="left-tools_box" onClick={this.loverArticle}>
                    <span className="left-tools_tip">{details.loveLen}</span> 
                    <i className={`iconfont icon-dianzan-copy left-tools_love ${details.userLoveStatus === '1' ? 'left-tools-love_article' : ''}`}></i>
                </div>
                <div className="left-tools_box" onClick={this.goPinLun}>
                    <i className="iconfont icon-pinglun left-tool_pinlun"></i>
                </div>
              </div>
            </div>
            
            <div className="article-pinglun_box">
              <ul className="article-pinglun_ul">
                <p className="pinglun-ul_title">评论</p>
                <div className="pinglun-Text">
                  <TextArea
                    ref="pinglunRef"
                    value={pinglun}
                    onChange={this.onChange}
                    placeholder="Controlled autosize"
                    autosize={{ minRows: 3, maxRows: 5 }}
                  />
                  <Button type="primary" style={{marginTop: '10px'}} onClick={this.submitPingLun}>发表</Button>
                </div>
                {
                  pinglunList.map(v => {
                    return (
                      <li className="pinglun-ul_item" key={v.createDate}>
                        <div className="pinglun-ul_item_top">
                          <div className="pinglun-ul_touxiang"><img src={v.userImage}></img></div>
                          <span className="pinglun-span pinglun-userName">{v.userName}</span>
                          <span className="pinglun-span pinglun-created">{getArticleDate(v.createDate)}</span>
                        </div>
                        <div className="pinglun-text_box">
                          <p>{v.text}</p>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            {
              goTop && <div className="article-gotop" onClick={this.goPageTop}>
                <i className="iconfont icon-fanhuidingbu"></i>
              </div>
            }
          </div>
        )
    }
}

export default ArticleDetails