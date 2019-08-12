import React from 'react'
import { message, Popover, Button } from 'antd'
import ReactMarkdown from 'react-markdown'
import CodeMirrorEditor from './codeMirrorEditor.js'
import CodeStyle from './codeStyle.js'
import { getTags, addArticle } from '@/js/api.js'
import './editcss.less'
import 'github-markdown-css'


class editArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        markdown: '',
        tagId: '',
        title: '',
        articleImg: ''
      },
      tagData: []
    }
    this.uploadImg = this.uploadImg.bind(this)
    this.onChange = this.onChange.bind(this)
    this.submit = this.submit.bind(this)
    this.setInp = this.setInp.bind(this)
    this.selectTag = this.selectTag.bind(this)
  }
  videtd() {
    const { form } = this.state
    let msg = {
      ok: true,
      msg: ''
    }
    console.log(form)
    Object.keys(form).forEach(v => {
      if (!form[v] && v !== 'articleImg' && !(v === 'tagId' && form[v] === 0)) {
        msg = {
          ok: false,
          msg: '参数缺少'
        }
        return
      }
    })
    return msg
  }
  submit(e) {
    e.stopPropagation()
    const msg = this.videtd()
    if (msg.ok) {
      addArticle(this.state.form).then(res => {
        if (res && res.data && res.data.code === 0) {
          message.success('保存成功')
          this.props.history.go(-1)
          return
        }
      })
    } else {
      message.error(msg.msg)
    }
  }
  getNav() {
    getTags().then(res => {
        if (res) {
            this.setState({
              tagData: res.data.map(v => {
                v.checkouted  = false
                return v
              })
            })
        }
    })
  }
  onChange(val) {
    const { form } = this.state
    form.markdown = val.target.value
    this.setState({
      form
    })
  }
  selectTag(item) {
    const { form, tagData } = this.state
    tagData.forEach(v => {
      v.checkouted = false
      if (v.id === item.id) {
        v.checkouted = true
      }
    })
    form.tagId = item.id
    this.setState({form, tagData})
  }
  setInp(e) {
    const { form } = this.state
    form.title = e.target.value
    this.setState({
      form
    })
  }
  uploadImg() {
    console.log(1234123)
  }
  componentDidMount() {
    this.getNav()
  }
  render() {
    const { form, tagData } = this.state
    return (
      <div className="edit-article_box">
        <div className="edit-article_title">
          <div className="edit-article_inp">
            <input 
              value={form.title}
              onChange={this.setInp}
              placeholder="请输入标题..."></input>
          </div>
          <div className="edit-article-btn">
            <div style={{marginRight: '10px',display: 'flex', 'alignItems': 'center'}}>
              <Popover placement="bottom" title="上传封面" content={
                <div className="content">
                  <p onClick={this.uploadImg}>点击添加封面</p>
                </div>
              } trigger="click">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="35px" height="35px" viewBox="0 0 28 28" version="1.1">
                  <title>699ED11E-7F16-40A5-89DD-C9ADE30CCB4C</title>
                  <desc>Created with sketchtool.</desc>
                  <defs/>
                  <g id="0.1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g id="Markdown－编辑3" transform="translate(-1247.000000, -18.000000)" fill="#BFC6CE">
                          <g id="heder_img" transform="translate(1247.000000, 18.000000)">
                              <path d="M5,7 L24,7 L24,21 L5,21 L5,7 Z M6,8 L23,8 L23,15 L6,15 L6,8 Z M9,11 C9.55228475,11 10,10.5522847 10,10 C10,9.44771525 9.55228475,9 9,9 C8.44771525,9 8,9.44771525 8,10 C8,10.5522847 8.44771525,11 9,11 Z M22,14 L10,14 L14.2570991,10.8078101 L15.778026,11.8338712 L19.2346782,8.98370162 L22,11.0150952 L22,14 Z"/>
                          </g>
                      </g>
                  </g>
                </svg>
              </Popover>
            </div>
            <div className="article-btn_subimt">
              <Popover className="article-box" placement="bottom" title="发布文章" content={
                <div className="article-submit_box">
                  <ul className="submit-box_tag">
                      <span>分类</span>
                      {
                        tagData.map(v => {
                          return (
                            <li 
                              key={v.id} 
                              onClick={() => { this.selectTag(v) }}
                              className={ v.checkouted ? 'article' : '' }>
                              {v.tag}
                            </li>
                          )
                        })
                      }
                  </ul>
                  <div className="submit-submit">
                    <Button type="primary" onClick={this.submit}>确定发布</Button>
                  </div>
                </div>
                } trigger="click">
                发布
              </Popover>
            </div>
            <div className="article-btn_user">
              <img src="https://mirror-gold-cdn.xitu.io/168e08e1a5a2e53f643?imageView2/1/w/64/h/64/q/85/interlace/1"></img>
            </div>
          </div>
        </div>
        <div className="edit-article-edit">
          <div className="edit-article-textare editor-pane">
              <CodeMirrorEditor
                value={form.markdown} 
                onChange={this.onChange}>
              </CodeMirrorEditor>
          </div>
          <div className="edit-article-markdown result-pane">
              <ReactMarkdown 
                className="markdown-body"
                skipHtml={true}
                renderers={{code: CodeStyle}}
                source={form.markdown}></ReactMarkdown>
          </div>
        </div>
      </div>
    )
  }
}

export default editArticle