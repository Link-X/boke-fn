import React, { Component } from 'react';
import '@/common/less/home.less'

class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: []
        }
        this.showMessage = () => {
            let intverId2 = null
            const intverId = setInterval(() => {
                intverId2 && clearInterval(intverId2)
                let msg = '想在的地方，地狱就是天堂。'
                let { message } = this.state
                const len = message.length
                if (len >= msg.length) {
                    clearInterval(intverId)
                    clearInterval(intverId2)
                    return
                }
                message = message && message.map((v = {}) => {
                    v.class = ''
                    return v
                })
                message.push({
                    val: msg.substring(len, len + 1),
                    class: ''
                })
                this.setState({
                    message
                })
                if (len < msg.length - 1) {
                    intverId2 = this.flashing()
                }
            }, 2600)
        }
        this.flashing = () => {
            const intverId2 = setInterval(() => {
                let { message } = this.state
                const len = message.length - 1
                const className = message[len].class
                message[len].class = className ? '' : 'opDom'
                this.setState({
                    message
                })
            }, 550)
            return intverId2
        }
    }
    componentDidMount () {
        this.showMessage()
    }
    render() {
        const { message } = this.state
        return (
            <div className="xdb-home_banner">
                <div>美好的生命应该充满期待、惊喜和感激。</div>
                <div>有理{
                    message.map((v, i) => {
                        return (
                            <span key={i} className={`banner_tip ${v && v.class}`}>{v && v.val}</span>
                        )
                    })
                }</div>
            </div>
        )
    }
}

export default Banner