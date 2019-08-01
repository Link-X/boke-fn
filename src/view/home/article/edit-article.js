import React from 'react';
const ReactMarkdown = require('react-markdown')


const input = '# This is a header\n\nAnd this is a paragraph'

class Test extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <ReactMarkdown source={input}></ReactMarkdown>
      </div>
    )
  }
}

export default Test