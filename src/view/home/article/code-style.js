
const React = require('react')

import hljs from 'highlight.js/lib/highlight';
import sql from 'highlight.js/lib/languages/sql'
import htmlbars from 'highlight.js/lib/languages/htmlbars'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import stylus from 'highlight.js/lib/languages/stylus'
import json from 'highlight.js/lib/languages/json'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css'

const languageData = {
  sql: sql,
  htmlbars: htmlbars,
  css: css,
  javascript: javascript,
  xml: xml,
  stylus: stylus,
  json: json 
}
Object.keys(languageData).forEach(v => {
  hljs.registerLanguage(v, languageData[v])
})


class CodeStyle extends React.PureComponent {
  constructor(props) {
    super(props)
    this.setRef = this.setRef.bind(this)
  }

  setRef(el) {
    this.codeEl = el
  }

  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl)
  }

  render() {
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    )
  }
}

CodeStyle.defaultProps = {
  language: ''
}

module.exports = CodeStyle