import React from 'react'
import { Input } from 'antd'
import ReactMarkdown from 'react-markdown'
import CodeMirrorEditor from './codeMirrorEditor.js'
import CodeStyle from './code-style.js'
import './editcss.less'
import 'github-markdown-css'


class Test extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markdownVal: ''
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(val) {
    this.setState({
      markdownVal: val.target.value
    })
  }
  render() {
    const { markdownVal } = this.state
    return (
      <div className="edit-article_box">
        <div className="edit-article_title">
          <Input 
            placeholder="请输入标题"></Input>
        </div>
        <div className="edit-article-edit">
          <div className="edit-article-textare editor-pane">
              <CodeMirrorEditor
                value={markdownVal} 
                onChange={this.onChange}>
              </CodeMirrorEditor>
          </div>
          <div className="edit-article-markdown result-pane">
              <ReactMarkdown 
                className="markdown-body"
                renderers={{code: CodeStyle}}
                source={markdownVal}></ReactMarkdown>
          </div>
        </div>
      </div>
    )
  }
}

export default Test