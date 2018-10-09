import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Magnifier from 'react-magnifier';
import 'w3-css/w3.css';
import { Link } from 'react-router-dom'


const month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo_id: props.match.params.id,
            imgInfo: {
                source: 'https://loading.io/spinners/balls/lg.circle-slack-loading-icon.gif',
                title: 'loading',
                ownername: '...',
                views: 'views',
                description: 'description',
                tags: [],
                date: '...'
            }
        };
    }
    componentDidMount() {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=cb4b417e6ef9a67022b8af0e75c658a9&photo_id=${this.state.photo_id}&format=json&nojsoncallback=1`)
            .then(res => {
                const photos = res.data.photo;
                const taken = new Date(photos.dates.taken);
                const imgInfo = {
                    id: photos.id,
                    title: photos.title._content,
                    ownername: photos.owner.username,
                    views: photos.views,
                    description: photos.description._content,
                    tags: photos.tags.tag,
                    date: 'Taken on ' + month[taken.getMonth()] + ' ' + taken.getDay() + ', ' + taken.getFullYear(),
                    source: 'https://farm' + photos.farm + '.staticflickr.com/' + photos.server + '/' + photos.id + '_' + photos.secret + '.jpg'
                }
                this.setState({
                    imgInfo: imgInfo
                });
            })
            .catch(err => {
                console.log(err)
            })
    }
    listTag = () => {
        const tagList = [];
        this.state.imgInfo.tags.map((item, i) => {
            const link = "/tag/" + item.raw;
            tagList.push(<Link to={link} key={i}>
                <span className="w3-tag w3-blue-gray w3-large">{item.raw}</span>
            </Link>)
            return 0;
        })
        return tagList;
    }
    render() {
        return (
            <div className="container-fluid row">

                <div className="col-xs-5 col-sm-5 col-md-4 col-lg-5">
                    <div className="img-rounded">
                        <td> <Magnifier src={this.state.imgInfo.source}
                            alt={this.state.imgInfo.title}></Magnifier></td>
                    </div>
                </div>
                {/* <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                </div> */}
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 border-left">
                    <h2>{this.state.imgInfo.title}</h2>
                    <div className="w3-small">by {this.state.imgInfo.ownername} - {this.state.imgInfo.views} views</div>
                    <hr></hr>
                    <h5 className="rowC">{this.state.imgInfo.description}</h5>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div>
                        <h5><span className="glyphicon glyphicon-picture"></span> {this.state.imgInfo.date}</h5></div>
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
export default Photo;