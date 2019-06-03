import React, { Component } from 'react';
import { Button } from 'antd';

const locale = {
  prevText: 'Prev',
  nextText: 'Next',
};


class Test extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
          <div>
            <Button>123</Button>
          </div>
        )
    }
}

export default Test