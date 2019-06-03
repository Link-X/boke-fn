import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button } from 'antd';

class Chat extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div>
                <Button type="primary">chat</Button>
            </div>
        )
    }
}
export default Chat