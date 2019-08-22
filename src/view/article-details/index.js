import React, { Component } from 'react';
import { getArticleDetails } from '@/js/api.js'
import { formatDateTime } from '@/common/utils/utils.js'
import ReactMarkdown from 'react-markdown'
import CodeStyle from '@/view/home/article/code-style.js'
import '@/common/less/article-details.less'
import 'github-markdown-css'

class ArticleDetails extends Component {
    constructor (props) {
        super(props)
        this.state = {
          details: {}
        }
    }
    getData() {
      const { id } = this.props.match.params
      if (id) {
        getArticleDetails({
          id
        }).then(res => {
          if (res && res.data && res.data.code === 0) {
            const data = res.data.data[0]
            this.setState({
              details: data
            })
          }
        })
      }
    }
    componentDidMount() {
      this.getData()
    }
    render () {
        const { details } = this.state
        return (
          <div className="markdown-body_box">
            <div className="article-user_box">
              <div className="user-box_image">
                <img src={details.userImage} />
              </div>
              <div className="article-user_text">
                <span className="user-text_title">{details.userName}</span>
                <p className="user-text_date">
                  <span>{formatDateTime(details.createDate)}</span>
                  <span>阅读: {details.readNumber + 1 || 0}</span>
                </p>
              </div>
            </div>
            <h2 className="markdown-body_title">{details.title}</h2>
            <ReactMarkdown 
                className="markdown-body"
                skipHtml={true}
                renderers={{code: CodeStyle}}
                source={details.markdown}></ReactMarkdown>
                <div className="article-left-tools">
                  // <div className="left-tools_love"></div>
                  <div className="left-tool_pinlun"></div>
                </div>
          </div>
        )
    }
}

export default ArticleDetails