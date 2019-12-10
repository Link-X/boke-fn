import React, { Component } from 'react';
import '@/common/less/home.less'
import { Supermoon, Stormy, Cloudy, Sunny, Snowy } from '@/common/weather/index.js'
import { getSimpleWeather, getCity } from '@/js/api'
import { weatherData } from '@/common/data/data.json'
import '@/common/less/home-index.less'

class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            tipOption: '',
            dayType: 'Sunny'
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
        this.getDayType = () => {
            getCity().then(data => {
                const dataCity = data.content.address_detail.city
                const index = dataCity.indexOf('市')
                const city = dataCity.substring(0, index)
                getSimpleWeather({
                    city
                }).then(res => {
                    if (res && res.data && res.data.code === 0) {
                        const data = res.data && JSON.parse(res.data.data)
                        if (data && data.error_code === 0) {
                            const weather = data.result.future[1].weather
                            Object.keys(weatherData).forEach(v => {
                                const isDay = weatherData[v].some(j => j === weather)
                                if (isDay) {
                                    this.setState({
                                        dayType: v
                                    })
                                    console.log(v);
                                }
                            })
                        }
                    }
                })
            })
        }
    }
    componentDidMount () {
        this.showMessage()
        this.getDayType()
    }
    render() {
        const { message, tipOption, dayType } = this.state
        return (
            <div className="xdb-home_banner page1">
                <div className="xdb-home_tip">

                    <div className="warther_box">
                        { dayType === 'Supermoon' && <Supermoon></Supermoon> }
                        { dayType === 'Stormy' && <Stormy></Stormy> }
                        { dayType === 'Cloudy' && <Cloudy></Cloudy> }
                        { dayType === 'Sunny' && <Sunny></Sunny> }
                        { dayType === 'Snowy' && <Snowy></Snowy> }
                    </div>
                    <div className="warther_box_text">
                        <div className="home-tip_top">美好的生命应该充满期待、惊喜和感激。</div>
                        <div className="home-tip_bottom">
                            有理{message}
                        <span 
                            className={`tip-cursor ${tipOption}`}></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Banner