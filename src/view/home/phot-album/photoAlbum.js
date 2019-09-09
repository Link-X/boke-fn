
import '@/common/less/photo-album.less'
import React, { Component } from 'react';
import { getPhoto } from '@/js/api.js'
import { Spin } from 'antd';
class PhotoAlbum extends Component {
    constructor (props) {
        super(props)
        this.state = {
            imgData: [],
            spinning: true
        }
    }
    componentDidMount() {
        getPhoto().then(res => {
            if (res && res.data && res.data.code === 0) {
                const imgData = res.data.data || []
                this.setState({
                    spinning: false,
                    imgData
                })
            }
        })
    }
    render () {
        const { imgData, spinning } = this.state
        return (
            <div className="photo-album_box">
                <div id="container">
                    <Spin tip="加载中..." spinning={spinning}>
                        <ul id="grid" className="group">
                            {
                                imgData.map(v => {
                                    return (
                                        <li key={v.id}>
                                            <div className="details">
                                                <h3>{v.title}</h3>
                                                <a className="more">查看大图</a>
                                            </div>
                                            <span className="more">
                                                <img src={v.src}></img>
                                            </span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </Spin>
                </div>
            </div>
        )
    }
}

export default PhotoAlbum