import io from 'socket.io-client'
import '@/common/less/photo-album.less'
import React, { Component } from 'react';
class PhotoAlbum extends Component {
    constructor (props) {
        super(props)
        this.state = {
            socketIo: null
        }
        this.send = this.send.bind(this)
    }
    componentDidMount() {
        this.setState({
            socketIo: io('http://127.0.0.1:9008')
        }, () => {
            this.socketIo.on('aabb', (data) => {
                console.log(data);
            })
        })
    }
    send() {
        this.socketIo.emit('newUser', {
            userId: 1234
        })
    }
    render () {
        return (
          <div className="web-chat">
            <div onClick={this.send}>aa</div>
          </div>
        )
    }
}

export default PhotoAlbum