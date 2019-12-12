// 三个页面合并成一个页面
import React, { Component } from 'react';
import HeaderDom from './head/header.js'
import Publicity from './publicity/index.js'
import Article from './article/index.js'
import PhotoAlbum from './phot-album/photoAlbum.js'
import { message  } from 'antd'
class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {
          boxIndex: 0,
          history: '/'
        }
        const that = this
        const routerFunc = {
          url: '',
          routerPush() {
            that.props.history.push({
              pathname: this.url
            })
          },
          setState() {
            that.setState({
              history: this.url,
              boxIndex: 0,
            })
          },
          '/login'() {
            if (localStorage.getItem('token')) {
              message.info('ni已经登陆拉')
              return
            }
            this.routerPush()
          },
          '/datum'() {
            this.routerPush()
          },
          goRouter(url) {
            this.url = url
            const routerPage = ['/datum', '/login']
            if (routerPage.indexOf(url) !== -1) {
              this[url]()
              return
            }
            this.setState()
          }
        }
        this.clickTab = (url) => {
          if (this.state.history === url) {
            return
          }
          this.setRouterLocat(url)
          routerFunc.goRouter(url)
        }
    }
    componentDidMount() {
      const isAritcle = this.getLocalStorage('article', 20)
      if (isAritcle) {
        this.setState({
          history: '/article'
        })
      }
    }
    setLocalStorage(key, data) {
        const curTime = new Date().getTime()
        localStorage.setItem(key, JSON.stringify({data: data, time: curTime}))
    }
    getLocalStorage(key, exp) {
        const data = JSON.parse(localStorage.getItem(key) || '{}')
        if (Object.keys(data).length < 1) {
          return false
        }
        if ((new Date().getTime() - data.time) / 1000 / 60 > exp) {
            // 超时删掉
            localStorage.removeItem(key)
		        return false
        } else {
            return data.data
        }
    }
    setRouterLocat(url) {
      if (url === '/article') {
        this.setLocalStorage('article', true)
      } else {
        localStorage.removeItem('article')
      }
    }
    boxIndexChange(boxIndex) {
      this.setState({
        boxIndex
      })
    }
    render () {
        return (
          <div className="xdb-home-center">
            <HeaderDom boxIndex={(this.state.boxIndex)}  clickTab={this.clickTab}></HeaderDom>
            { 
              this.state.history === '/' 
              &&  <Publicity boxIndexChange={
                             (boxIndex) => {
                                  this.boxIndexChange(boxIndex)
                              }
                            }
                            ref="publicity">
                  </Publicity> 
            }
            { this.state.history === '/article' && <Article history={this.props.history}></Article> }
            { this.state.history === '/photo-album' && <PhotoAlbum></PhotoAlbum>  }
          </div>
        )
    }
}

export default Home