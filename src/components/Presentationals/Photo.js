import React, { Component } from 'react';
import '../../App.css';
import Magnifier from 'react-magnifier';
import 'w3-css/w3.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class Photo extends Component {
    listTag = () => {
        const tagList = [];
        this.props.imgInfo.tags.map((item, i) => {
            const link = "/tag/" + item.raw;
            tagList.push(<Link to={link} key={i}>
                <span className="w3-tag w3-blue-gray w3-large">{item.raw}</span>
            </Link>)
            return 0;
        })
        return tagList;
    }
    render() {
        console.log((this.props))
        return (
            <div className="container-fluid row">

                <div className="col-xs-5 col-sm-5 col-md-4 col-lg-5">
                    <div className="img-rounded">
                        <td> <Magnifier src={this.props.imgInfo.source}
                            alt={this.props.imgInfo.title}></Magnifier></td>
                    </div>
                </div>
                {/* <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                </div> */}
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 border-left">
                    <h2>{this.props.imgInfo.title}</h2>
                    <div className="w3-small">by {this.props.imgInfo.ownername} - {this.props.imgInfo.views} views</div>
                    <hr></hr>
                    <h5 className="rowC">{this.props.imgInfo.description}</h5>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div>
                        <h5><span className="glyphicon glyphicon-picture"></span> {this.props.imgInfo.date}</h5></div>
                    <hr></hr>
                    <div>
                        <h4>Tag: </h4>
                        <p>
                            {this.listTag()}
                        </p>
                    </div>
                </div>
            </div>)
    };
}

const mapStateToProps = (state) => ({
    imgInfo: state.photoReducer
})

export default connect(mapStateToProps, null)(Photo);