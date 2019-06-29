import React, { Component } from 'react';
import '@/common/less/home.less'

class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: [],
            tipOption: ''
        }
        this.showMessage = () => {
            let intverId2 = null
            let intverId = null
            let tim = 1
            let time = 400
            const that = this
            const msg = '想在的地方，地狱就是天堂。'
            function timeDom () { 
                intverId = setTimeout(() => {
                    let { message } = that.state
                    const len = message.length
                    if (len >= msg.length) {
                        clearTimeout(intverId)
                        that.setState({
                            tipOption: 'tip-opacity'
                        })
                        return
                    }
                    message += msg.substring(len, len + 1)
                    that.setState({
                        message,
                        tipOption: ''
                    })
                    time -= tim += 4
                    timeDom()
                }, time)
            }
            setTimeout(() => {
                clearInterval(intverId2)
                timeDom()
            }, 3000)
            intverId2 = this.flashing()
        }
        this.flashing = () => {
            const intverId2 = setInterval(() => {
                const { tipOption } = this.state
                this.setState({
                    tipOption: tipOption ? '' : 'tip-opacity'
                })
            }, 500)
            return intverId2
        }
    }
    componentDidMount () {
        this.showMessage()
    }
    render() {
        const { message, tipOption } = this.state
        return (
            <div className="xdb-home_banner page1">
                <div className="xdb-home_tip">
                    <div className="home-tip_top">美好的生命应该充满期待、惊喜和感激。</div>
                    <div className="home-tip_bottom">
                    有理{message}
                    <span 
                        className={`tip-cursor ${tipOption}`}></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Banner