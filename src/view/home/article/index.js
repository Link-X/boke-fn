import React, { Component } from 'react'
import '@/common/less/article.less'
import { getTags } from '@/js/api.js'
class Article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navData: []
        }
        this.getNav = () => {
            getTags().then(res => {
                console.log(res)
                this.setState({
                    navData: res.data || []
                })
            })
        }
    }
    componentWillMount() {
        this.getNav()
    }
    render() {
        return (
            <div className="home-article-box">
                <div className="home-article">
                    <ul className="article-nav">
                    </ul>
                </div>
                <div className="home-article-angle"></div>
                <div className="home-article-bottom">
                </div>
            </div>
        )
    }
}

export default Article