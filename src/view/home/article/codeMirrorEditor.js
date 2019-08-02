const React = require('react')
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

import CodeMirror from 'codemirror'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/addon/hint/sql-hint.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/addon/hint/css-hint.js'
import 'codemirror/mode/htmlembedded/htmlembedded.js'
import 'codemirror/addon/hint/html-hint.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/addon/hint/xml-hint.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/edit/continuelist.js'
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/keymap/sublime.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/wrap/hardwrap.js'


const IS_MOBILE = typeof navigator === 'undefined' || (
  navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
)

class CodeMirrorEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isControlled: Boolean(this.props.value)}
    this.handleChange = this.handleChange.bind(this)
    this.editorRef = React.createRef()
  }

  componentDidMount() {
    const isTextArea = this.props.forceTextArea || IS_MOBILE;
    if (!isTextArea) {
        console.log(this.props);
      this.editor = CodeMirror.fromTextArea(this.editorRef.current, {
        keyMap: 'sublime',
        mode: 'markdown',
        theme: 'material',
        gitHubSpice: true,
        taskLists: true,
        strikethrough: true,
        emoji: true,
        value: this.props.value,
        autoRefresh: true,
        json: true,
        indentUnit: 4,
        tabSize: 4,
        coder: null,
        extraKeys: {"Ctrl": "autocomplete"},
        onChange: this.props.onChange
      });
      this.editor.on('change', this.handleChange);
    }
  }

  componentDidUpdate() {
    if (!this.editor) {
      return
    }

    if (this.props.value) {
      if (this.editor.getValue() !== this.props.value) {
        this.editor.setValue(this.props.value);
      }
    }
  }

  handleChange() {
    if (!this.editor) {
      return
    }

    const value = this.editor.getValue()
    if (value === this.props.value) {
      return
    }

    if (this.props.onChange) {
      this.props.onChange({target: {value: value}})
    }

    if (this.editor.getValue() !== this.props.value) {
      if (this.state.isControlled) {
        this.editor.setValue(this.props.value)
      } else {
        this.props.value = value
      }
    }
  }

  render() {
    const editor = React.createElement('textarea', {
      ref: this.editorRef,
      value: this.props.value,
      readOnly: this.props.readOnly,
      defaultValue: this.props.defaultValue,
      onChange: this.props.onChange,
      className: this.props.textAreaClassName
    })

    return React.createElement('div', null, editor);
  }
}


module.exports = CodeMirrorEditor