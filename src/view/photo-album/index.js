
import { m3D } from '@/common/utils/photo-album.js'
import '@/common/less/photo-album.less'
import React, { Component } from 'react';

class PhotoAlbum extends Component {
    constructor (props) {
        super(props)
    }
    componentDidMount() {
        const imgData = [
            { 
                src: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg',
                url: 'https://www.baidu.com', 
                title: '随便放一张图片', 
                color: '#fff' 
            },{ 
                src: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg',
                url: 'https://www.baidu.com', 
                title: '随便放一张图片',
                color: '#fff' 
            },{ 
                src: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg',
                url: 'https://www.baidu.com', 
                title: '随便放一张图片', 
                color: '#fff' 
            },{ 
                src: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg',
                url: 'https://www.baidu.com', 
                title: '随便放一张图片', 
                color: '#fff' 
            },{ 
                src: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg',
                url: 'https://www.baidu.com', 
                title: '随便放一张图片', 
                color: '#fff' 
            },{ 
                src: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg',
                url: 'https://www.baidu.com', 
                title: '随便放一张图片', 
                color: '#fff' 
            },{ 
                src: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg',
                url: 'https://www.baidu.com', 
                title: '随便放一张图片', 
                color: '#fff' 
            },{ 
                src: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg',
                url: 'https://www.baidu.com', 
                title: '随便放一张图片', 
                color: '#fff' 
            },
        ]
        const refsData = {
            screen: this.refs.screen,
            bar: this.refs.bar,
            urlInfo: this.refs.urlInfo
        }
        console.log(m3D())
        setTimeout(() => {
            m3D().init(imgData, refsData, function (diapo) { 
                const src = diapo.srcImg.src
                console.log(diapo)
             })
        }, 20)
    }
    render () {
        return (
          <div>
          <div id="screen" ref="screen">
            <div id="command">
                <h1>3D特效图片展示相册</h1>
                <div id="bar" ref="bar"></div>
                </div>
            </div>
            <div id="urlInfo" ref="urlInfo"></div>
          </div>
        )
    }
}

export default PhotoAlbum