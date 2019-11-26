
import '@/common/less/photo-album.less'
import React, { Component } from 'react';
import { getPhoto } from '@/js/api.js'
import { Spin, Modal } from 'antd';
class PhotoAlbum extends Component {
    constructor (props) {
        super(props)
        this.state = {
            imgData: [],
            spinning: true,
            visible: false
        }
        this.getImage = this.getImage.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    componentDidMount() {
        getPhoto().then(res => {
            this.setState({
                spinning: false,
                imgData: res
            })
        })
    }
    getImage(e) {
        const target = e.target
        if (target.nodeName === "A") {
            const src = target.getAttribute('data-src')
            const title = target.getAttribute('data-title')
            this.setState({
                src,
                imgTitle: title,
                visible: true
            })
        }
    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    render () {
        const { imgData, spinning, src, imgTitle } = this.state
        return (
            <div className="photo-album_box">
                <div id="container">
                    <Spin tip="加载中..." spinning={spinning}>
                        <ul id="grid" className="group" onClick={this.getImage}>
                            {
                                imgData.map(v => {
                                    return (
                                        <li key={v.id}>
                                            <div className="details">
                                                <h3>{v.title}</h3>
                                                <a className="more" data-title={v.title} data-src={v.src}>查看大图</a>
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
                <Modal
                    wrapClassName="photo_modal"
                    title={imgTitle}
                    width="800"
                    footer={false}
                    centered
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    >
                    <img className="photo-img_max" src={src}></img>
                </Modal>
            </div>
        )
    }
}

export default PhotoAlbum