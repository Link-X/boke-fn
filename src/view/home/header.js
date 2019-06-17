import React, { Component } from 'react';
import '@/common/less/home.less'
import { headerNav } from '@/common/data/data.json'
import { setBtnAnt } from '@/common/utils/ui.js'

class HeaderDom extends Component {
    constructor (props) {
        super(props)
        this.state = {
            activeIndex: 1,
            navList: headerNav,
            navIcon: '',
            navBoxCalss: ''
        }
        this.tabNav = function (e) { 
            if (e.target.nodeName !== 'LI') {
                return
            }
            const index = e.target.getAttribute('data-value')
            console.log(index)
            this.setState({
                activeIndex: Number(index)
            })
         }
         this.init = function () { 
            setBtnAnt(this.refs.uli, {
                type: 'agent',
                typeNodeName: 'LI'
            })
        }
        this.showNav = function () {
            const { navIcon, navBoxCalss } = this.state
            this.setState({
                navIcon: navIcon ? '' : 'active',
                navBoxCalss: navBoxCalss ? '' : 'header-nav-collapse-active'
            })
        }
    }
    componentDidMount () {
        this.init()
    }
    componentWillUnmount () {
        window.onscroll = null
        this.refs.uli.onClick = null
    }
    render () {
        return (
            <nav className={`xdb-home_header ${this.props.boxIndex === 0 ? '' : 'xdb_home_header_and'}`}>
                <div className="home-header_concent" data-ind={this.props.boxIndex}>
                    <h2 className="home-header_login">xdb</h2>    
                    <div className={`header-nav-collapse ${this.state.navBoxCalss}`}>
                        <ul ref="uli" className="nav-collapse_ul" onClick={(e) => { this.tabNav(e) }}>
                            {
                                this.state.navList.map(v => {
                                    return (
                                        <li
                                            ref={'li' + v.value}
                                            key={v.value}
                                            data-value={v.value}
                                            className={v.value === this.state.activeIndex ? 'active' : ''}>
                                            {v.label}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="navBtn" onClick={(e) => { this.showNav() }}>
                        <button className={`toggle-btn ${this.state.navIcon}`}>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                </div>
            </nav>
        )
    }
}

export default HeaderDom