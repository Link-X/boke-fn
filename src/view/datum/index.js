import React, { Component } from 'react';
import { getUserDate }  from '@/js/api.js'
import { formatDateTime } from '@/common/utils/utils.js'
import '@/common/less/datum.less'

class Datum extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data: {}
        }
    }
    componentDidMount() {
        getUserDate().then(res => {
            console.log(res)
            this.setState({
                data: res.data.data[0]
            })
        })
    }
    render () {
        const { data } = this.state
        return (
          <div className="datum-box">
            <div className="datum-box_top">
            </div>
            <div className="datum-box_zil clearfix">
                <div className="datum-box_touxiang">
                    <img src={data.userImage || 'https://mirror-gold-cdn.xitu.io/168e08e1a5a2e53f643?imageView2/1/w/64/h/64/q/85/interlace/1'}></img>
                </div>
                <div className="datum-box_xingxi">
                    <div className="datum-xingxi_name">{data.userName}</div>                    
                    <div className="datum-xingxi_adds">{data.remark}</div>
                    <div className="datum-text_box">
                        <span>
                            <i className="iconfont icon-dizhi"></i>
                            {data.province} {data.city} {data.district}
                        </span>
                        <span>
                            <i className="iconfont icon-shijian"></i>
                            {formatDateTime(data.createDate)}
                        </span>
                        <span>
                            <i className="iconfont icon-dianhua"></i>
                            {data.iphone || '************'}
                        </span>
                        <span>
                            <i className="iconfont icon-youxiang"></i>
                            {data.email || '**************'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="datum-center">
                <div className="datum-center_right">
                    <h3><i className="iconfont icon-shaixuantubiaogaozhuanqu13"></i>最新发布</h3>
                    <ul>
                        <li style={{paddingLeft: '22px'}}>
                            暂无
                        </li>
                    </ul>
                </div>
            </div>
          </div>
        )
    }
}

export default Datum