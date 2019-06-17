import React, { Component } from 'react';
import HeaderDom from './header.js'
import Banner from './banner.js'
import Center from './center.js'
class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {
          boxStyle: {
            transform: 'translate3d(0px, 0%, 0px)'
          },
          boxIndex: 0,
          startAnmit: true,
          maxDom: 2
        }
        this.scrollPageDom = () => {

        }
        this.scrollPage = () => {
          const taht = this
          const transitions = {
            // 兼容IE
            'transition': 'transitionend',
            // 兼容Opera
            'OTransition': 'oTransitionEnd',
            // 兼容Firefox
            'MozTransition': 'transitionend',
            // 兼容Google
            'WebkitTransition': 'webkitTransitionEnd'
          }
          function getTransitions() {
            let t = undefined
            for (t in transitions) {
              if (taht.refs.homeBox.style[t] !== undefined) {
                return transitions[t]
              }
            }
          }
          window.onmousewheel = document.onmousewheel = (e) => {
            let { startAnmit, boxIndex, maxDom } = this.state
            if (!startAnmit) {
              return
            }
            if (e.wheelDelta > 0 && boxIndex > 0) {
              boxIndex -= 1
            } else if (e.wheelDelta < 0 && boxIndex < (maxDom - 1)) {
              boxIndex += 1
            }
            this.setState({
              boxIndex,
              boxStyle: {
                transform: `translate3d(0px, -${boxIndex * 100}%, 0px)`
              },
              startAnmit: false
            }, () => {
              const { boxIndex, maxDom } = this.state
              if (boxIndex === (maxDom - 1) || boxIndex === 0) {
                setTimeout(() => {
                  this.setState({
                    startAnmit: true
                  })
                }, 500)
              }
            })
          }
          const eventName = getTransitions()
          this.refs.homeBox.addEventListener(eventName, function() {
            taht.setState({
              startAnmit: true
            })
          })
        }
    }
    componentDidMount () {
      this.scrollPage()
    }
    render () {
        return (
          <div style={{overflow: 'hidden'}}>
            <HeaderDom boxIndex={this.state.boxIndex}></HeaderDom>
            <div className="xdb-home_box" style={this.state.boxStyle} ref="homeBox">
              <Banner></Banner>
              <Center></Center>
            </div>
          </div>
        )
    }
}

export default Home