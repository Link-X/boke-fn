import React from 'react'
import { message, Popover, Button, Tooltip } from 'antd'
import ReactMarkdown from 'react-markdown'
import CodeMirrorEditor from './code-mirror-editor.js'
import CodeStyle from './code-style.js'
import verify from '@/common/utils/verify.js'
import { getTags, addArticle, uploadImage, getArticleDetails, editArticleDetials } from '@/js/api.js'
import '@/common/less/edit.less'
import 'github-markdown-css'

const verifyFunc = new verify({}, {})
const markdownText =  `
#  H1
##  H2
###  H3
####  H4
#####  H5
######  H6

*斜体* or _强调_  
**加粗** or __加粗__  
***粗斜体*** or ___粗斜体__  

Unordered 无序列表：
* 无序列表
* 子项
* 子项
 
+ 无序列表
+ 子项
+ 子项
 
- 无序列表
- 子项
- 子项

Ordered 有序列表：
* 产品介绍（子项无项目符号）
    此时子项，要以一个制表符或者4个空格缩进
 
* 产品特点
    1. 特点1
    - 特点2
    - 特点3
* 产品功能
    1. 功能1
    - 功能2
    - 功能3
    
[链接](http://www.w3cschool.cn/ "W3Cschool")
![图片代替文字](http://39.108.184.64/image/111837354148716541576488564080.jpg "标题文字")

段落
> Email-style angle brackets
> are used for blockquotes.
> > And, they can be nested.
> #### Headers in blockquotes
> * You can quote a list.
> * Etc.

表格  

|姓名|性别|年龄|
|:---:|:---:|:---:|:---:|
| 许道斌 | 男 | 18岁 |
`
class EditArticle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        markdown: markdownText,
        tagId: '',
        title: '',
        articleImg: ''
      },
      preview: true,
      tagData: []
    }
    this.uploadImg = this.uploadImg.bind(this)
    this.onChange = this.onChange.bind(this)
    this.submit = this.submit.bind(this)
    this.setInp = this.setInp.bind(this)
    this.selectTag = this.selectTag.bind(this)
    this.removeImg = this.removeImg.bind(this)
    this.activedPreview = this.activedPreview.bind(this)
    this.editOnScroll = this.editOnScroll.bind(this)
  }
  editOnScroll(e) {
    const scrollTop = e.doc.scrollTop
    const valHeight = e.doc.height
    const boxHeight = this.refs.editArticle.getBoundingClientRect().height
    const previewHeight = document.querySelector('.markdown-body').getBoundingClientRect().height 
    const scale = (valHeight -  boxHeight) / (previewHeight - boxHeight)
    this.refs.previewBox.scrollTo(0, scrollTop / scale)
  }
  activedPreview() {
    this.setState({
      preview: !this.state.preview
    })
  }
  submit(e) {
    const { form } = this.state
    e.stopPropagation()
    verifyFunc.$init(form, {
      markdown: [{
        required: true,
        message: '内容请最少输入60字',
        type: 'string',
        min: 60,
        max: 99999999
      }],
      tagId: [{
        message: '请选择标签',
        validator: (val, cb) => {
          if (!val && val !== 0) {
            cb({message: '请选择标签'})
          } else {
            cb()
          }
        }
      }],
      title: [{
        required: true,
        message: '请输入3-50字文章标题',
        type: 'string',
        min: 3,
        max: 50
      }]
    })
    verifyFunc.validate(status => {
      if (status.result) {
        message.error(status.message)
        return
      }
      if (form.id) {
        editArticleDetials(form).then(res => {
            if(res && res.data && res.data.code === 0) {
              message.success('编辑成功')
              this.props.history.go(-1)
            } else {
              message.error('编辑失败')
            }
        })
      } else {
          addArticle(form).then(res => {
              if (res && res.data && res.data.code === 0) {
                  message.success('保存成功')
                  this.props.history.go(-1)
              } else {
                message.error('保存失败')
              }
          })
      }
    })
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
        if (this.props.history.location.query && this.props.history.location.query.id) {
            this.getArticleDetails(this.props.history.location.query.id)
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
  clickFile = (editImage) => {
    this.setState({
      editImage: editImage
    }, () => {
      this.refs.uploadInput.click()
    })
  }
  getImgSize(base64url = '') {
    // 获取图片base64大小
      const str = base64url.replace('data:image/jpeg;base64,', '')
      const strLength = str.length
      const fileLength = parseInt(strLength - (strLength / 8) * 2)
      let size = ''
      size = (fileLength / 1024).toFixed(2)
      return parseInt(size)
  }
  compressImage (base64, cb) {
    const image = new Image()
    let compressBase64 = ''
    image.src = base64
    image.onload = function () { 
      const width = image.width
      const height = image.height
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = width
      canvas.height = height
      ctx.drawImage(image, 0, 0, width, height)
      compressBase64 = canvas.toDataURL('image/jpeg', 0.6)
      cb(compressBase64)
    }
  }
  uploadImg(e, edit) {
    const file = e.target.files[0]
    const fileType = file.type || 'image/png'
    if (fileType.indexOf('image') === -1) {
      message.info('文件类型错误o')
      return
    }
    const reader = new FileReader()
    const _self = this
    reader.readAsDataURL(file)
    reader.onloadend = function (e) {
      const fileMaxSize = 5120
      _self.compressImage(e.target.result, function (base64) {
          const size = _self.getImgSize(base64) || 0
          if (size > fileMaxSize) {
            message.info('上传图片过大')
            return
          }
          uploadImage({
            file: base64
          }).then(res => {
            if (res && res.data && res.data.code === 0) {
              const path = res.data.data.path
              _self.state.editImage ? _self.enditImage.apply(_self, [path]) :_self.setCover.apply(_self, [path])
            }
          })
      })
      
   }
  }
  enditImage(path) {
    const { form } = this.state
    form.markdown += `  ![](${path})`
    this.setState({
      form,
      editImage: false
    }, () => {
      this.refs.codeMirror.setCursor()
      this.refs.uploadInput.value = ''
    })
  }s
  setCover(path) {
    const { form } = this.state
    form.articleImg = path
    this.setState({
      form
    }, () => {
      this.refs.uploadInput.value = ''
    })
  }
  removeImg() {
    const { form } = this.state
    form.articleImg = ''
    this.refs.uploadInput.value = ''
    this.setState({
      form
    })
  }
  getArticleDetails(id) {
      // 编辑
    getArticleDetails({
        id
    }).then(res => {
        if (res && res.data && res.data.code === 0) {
            const data = res.data.data
            const { form } = this.state
            const resetForm = {
                markdown: data.markdown,
                tagId: data.tagId,
                title: data.title,
                articleImg: data.articleImg,
                id: this.props.history.location.query.id
            }
            this.selectTag({
                id: data.tagId
            })
            this.setState({
                form: {
                    ...form,
                    ...resetForm
                }
            })
          }
    })
  }
  componentDidMount() {
    this.getNav()
  }
  render() {
    const { form, tagData, preview } = this.state
    return (
      <div className="edit-article_box">
        <input 
          type="file"
          onChange={this.uploadImg}
          accept="image/*"
          className="uploadInput" 
          ref="uploadInput"></input>
        <div className="edit-article_title">
          <div className="edit-article_inp">
            <input 
              value={form.title}
              onChange={this.setInp}
              placeholder="请输入文章标题...">
            </input>
          </div>
          <div className="edit-article-btn">
            <div style={{marginRight: '10px',display: 'flex', 'alignItems': 'center'}}>
              <Popover placement="bottom" title="上传封面" content={
                <div className="content">
                  { 
                    !this.state.form.articleImg ? <p onClick={() => { this.clickFile() }}>点击添加封面</p> :
                    <div className="edit-article_img_box">
                      <span onClick={this.removeImg}>x</span>
                      <img src={this.state.form.articleImg} style={{width: '100%', height: '100%'}}></img>
                    </div>
                  }
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
          <div 
                ref="editArticle"
                className="edit-article-textare editor-pane" 
                style={{display: `${preview ? 'block' : 'none'}`}}>
              <CodeMirrorEditor
                ref="codeMirror"
                editOnScroll={this.editOnScroll}
                value={form.markdown} 
                onChange={this.onChange}>
              </CodeMirrorEditor>
          </div>
          <div 
              ref="previewBox"
              className={`edit-article-markdown result-pane ${!preview ? 'preview-edit' : 'engter-edit'}`}>
              <ReactMarkdown 
                className="markdown-body"
                id="markdownBody"
                skipHtml={true}
                renderers={{code: CodeStyle}}
                source={form.markdown}>
              </ReactMarkdown>
              <ul className="textare-tools">
                <li onClick={(e) => {this.clickFile(true)}}>
                  <Tooltip title="上传图片">
                    <i className="iconfont icon-shangchuan"></i>
                  </Tooltip>
                </li>
                <li onClick={this.activedPreview}>
                  <Tooltip title={`${preview ? '预览(不要刷新）' : '收起(刷新会丢失)'}`}>
                    <i className={`iconfont ${!preview ? 'icon-BMSzhuanqu_suofang' : 'icon-suofang'}`}></i>
                  </Tooltip>
                </li>
              </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default EditArticle