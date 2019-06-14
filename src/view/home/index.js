import React, { Component } from 'react';
import HeaderDom from './header.js'
import Banner from './banner.js'

class Home extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
          <div className="xdb-home_box">
            <HeaderDom></HeaderDom>
            <Banner></Banner>
          </div>
        )
    }
}

export default Home