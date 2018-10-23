import React, { Component } from 'react';
import axios from 'axios';
import 'w3-css/w3.css';
import Photo from '../Presentationals/Photo'
import config from '../../config'
import { connect } from 'react-redux'
import { change_info_photo } from '../../actions'
const month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


class PhotoContainer extends Component {
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
    componentDidMount = () => {
        const api = `${config.APIhost}?method=flickr.photos.getInfo&api_key=${config.APIkey}&photo_id=${this.state.photo_id}&format=json&nojsoncallback=1`
        axios.get(api)
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
                this.props.change_info_photo(imgInfo)
                this.setState({
                    imgInfo: imgInfo
                });
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <Photo></Photo>)
    };
}
const mapDispatchToProps = (dispatch) => (
    {
        change_info_photo: (info) => {
            dispatch(change_info_photo(info));
        },
    }
)

export default connect(null, mapDispatchToProps)(PhotoContainer);