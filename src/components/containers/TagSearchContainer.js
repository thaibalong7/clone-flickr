import React, { Component } from 'react';
import axios from 'axios';
import Explore from '../Presentationals/Explore'
import config from '../../config'
import { connect } from 'react-redux'
import { ini_listphoto, loadmore_listphoto } from '../../actions'

class TagSearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingState: false,
            page: 1,
        };
    }
    componentDidMount() {
        console.log('componentDidMount', this.props.match.params.tagName);
        const api = `${config.APIhost}?method=flickr.photos.search&api_key=${config.APIkey}&tags=${this.props.match.params.tagName}&extras=owner_name%2C+views&per_page=20&page=1&format=json&nojsoncallback=1`
        console.log('Call API: ' + api)
        axios.get(api)
            .then(res => {
                const photos = res.data.photos.photo;
                var items = [];
                photos.forEach(photo => {
                    items.push({
                        id: photo.id,
                        title: photo.title,
                        ownername: photo.ownername,
                        views: photo.views,
                        source: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
                    })
                });
                this.props.ini_listphoto(items);
            })
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.match.params.tagName !== prevProps.match.params.tagName) {
            console.log('componentDidUpdate', this.props.match.params.tagName);
            const api = `${config.APIhost}?method=flickr.photos.search&api_key=${config.APIkey}&tags=${this.props.match.params.tagName}&extras=owner_name%2C+views&per_page=20&page=1&format=json&nojsoncallback=1`
            console.log('Call API: ' + api)
            axios.get(api)
                .then(res => {
                    const photos = res.data.photos.photo;
                    var items = [];
                    photos.forEach(photo => {
                        items.push({
                            id: photo.id,
                            title: photo.title,
                            ownername: photo.ownername,
                            views: photo.views,
                            source: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
                        })
                    });
                    this.props.ini_listphoto(items);
                })
        }
      }
    loadMoreItems = () => {
        console.log('loadMoreItems',this.props.match.params.tagName);
        this.setState({
            loadingState: true,
            page: this.state.page + 1
        });
        const api = `${config.APIhost}?method=flickr.photos.search&api_key=${config.APIkey}&tags=${this.props.match.params.tagName}&extras=owner_name%2C+views&per_page=20&page=${this.state.page}&format=json&nojsoncallback=1`
        console.log('Call API: ' + api)
        axios.get(api)
            .then(res => {
                const photos = res.data.photos.photo;
                var items = [];
                photos.forEach(photo => {
                    items.push({
                        id: photo.id,
                        title: photo.title,
                        ownername: photo.ownername,
                        views: photo.views,
                        source: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
                    })
                });
                this.props.loadmore_listphoto(items);
                this.setState({
                    loadingState: false,
                });
            })
    }

    render() {
        console.log('render', this.props.match.params.tagName);
        return (
            <Explore loadingState={this.state.loadingState} loadMoreItems={this.loadMoreItems}></Explore>);
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        ini_listphoto: (listPhoto) => {
            dispatch(ini_listphoto(listPhoto));
        },
        loadmore_listphoto: (listPhoto) => {
            dispatch(loadmore_listphoto(listPhoto))
        }
    }
)

export default connect(null, mapDispatchToProps)(TagSearchContainer);