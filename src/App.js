import React, { Component } from 'react';
 
class App extends Component {
    render() {
        return <div className="chat-center-box">
        {this.props.children}
        </div>;
    }
}
export default App;