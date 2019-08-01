import React, { Component } from 'react';
import HeaderDom from './head/header.js'
import Publicity from './publicity/index.js'
import Article from './article/index.js'
class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {
          boxIndex: 0,
          history: '/'
        }
        this.clickTab = (url) => {
          if (this.state.history === url) {
            return
          }
          this.setState({
            history: url
          })
        }
    }
    render () {
        return (
          <div className="xdb-home-center">
            <HeaderDom boxIndex={this.state.boxIndex}  clickTab={this.clickTab}></HeaderDom>
            { this.state.history === '/' &&  <Publicity></Publicity> }
            { this.state.history === '/article' && <Article history={this.props.history}></Article> }
            <div>

            </div>
          </div>
        )
    }
}

export default Home