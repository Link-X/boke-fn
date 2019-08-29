
import { m3D } from '@/common/utils/photo-album.js'
import { Modal } from 'antd';
import '@/common/less/photo-album.less'
import React, { Component } from 'react';
import { getPhoto } from '@/js/api.js'
class PhotoAlbum extends Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            articledSrc: ''
        }
    }
    componentDidMount() {
        getPhoto().then(res => {
            if (res && res.data && res.data.code === 0) {
                const imgData = res.data.data || []
                const refsData = {
                    screen: this.refs.screen,
                    bar: this.refs.bar,
                    urlInfo: this.refs.urlInfo
                }
                m3D().init(imgData, refsData, (diapo) => { 
                    const src = diapo.srcImg.src
                    this.setState({
                        visible: true,
                        articledSrc: src
                    })
                })
            }
        })
    }
    render () {
        return (
          <div>
            <div id="screen" ref="screen">
                <div id="command">
                    <h1 style={{color: '#fff'}}>一个相册</h1>
                    <div id="bar" ref="bar"></div>
                </div>
            </div>
            <div id="urlInfo" ref="urlInfo"></div>
            <Modal 
                wrapClassName="photo-model"
                closable={true}
                footer={null}
                zIndex={24501}
                onCancel={() => {
                    this.setState({
                        visible: false
                    })
                }}
                visible={this.state.visible}>
                <img src={this.state.articledSrc}></img>
            </Modal>
          </div>
        )
    }
}

export default PhotoAlbum