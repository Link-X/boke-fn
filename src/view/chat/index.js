import React, { Component } from 'react';
import { DatePicker } from 'antd';

class Chat extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
          <div>
            <DatePicker></DatePicker>
          </div>
        )
    }
}

export default Chat