import React, { Component } from 'react';
import './App.css';
class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: props.data.ket,
            title: props.data.title,
            ownername: props.data.ownername,
            views: props.data.views,
            source: props.data.source
        };
    }

    render() {
        return (
        
                <div className="img" >
                    <img src={this.state.source} alt={this.state.title}></img>
                </div>
       
        );
    }
}
export default Photo;