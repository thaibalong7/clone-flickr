import React, { Component } from 'react';
import axios from 'axios';
import Explore from '../Presentationals/Explore'
import config from '../../config'
import { connect } from 'react-redux'
import { ini_listphoto, loadmore_listphoto } from '../../actions'


class ExploreContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingState: false,
            page: 1,
        };
    }
    componentDidMount() {
        const api = `${config.APIhost}?method=flickr.interestingness.getList&api_key=${config.APIkey}&extras=owner_name%2C+views&per_page=20&format=json&nojsoncallback=1`
        console.log('Call API: ', api);
        axios.get(api)
            .then(async res => {
                const photos = res.data.photos.photo;
                var listPhoto = [];
                await photos.forEach(photo => {
                    listPhoto.push({
                        id: photo.id,
                        title: photo.title,
                        ownername: photo.ownername,
                        views: photo.views,
                        source: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
                    })

                });
                this.props.ini_listphoto(listPhoto);
            })
    }
    loadMoreItems = () => {
        this.setState({
            loadingState: true,
            page: this.state.page + 1
        });
        const api = `${config.APIhost}?method=flickr.interestingness.getList&api_key=${config.APIkey}&extras=owner_name%2C+views&per_page=20&page=${this.state.page}&format=json&nojsoncallback=1`
        console.log('Call API: ', api);
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
        return (
            <Explore loadingState={this.state.loadingState} loadMoreItems={this.loadMoreItems}></Explore>
        )
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
export default connect(null, mapDispatchToProps)(ExploreContainer);