import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Gallery from 'react-grid-gallery'

const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    maxHeight: "240px",
    overflow: "hidden",
    position: "absolute",
    bottom: "0",
    width: "100%",
    color: "white",
    padding: "2px",
    fontSize: "90%",
};
class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loadingState: false,
            page: 1,
            HETGHT: window.innerHeight - 88
        };
    }
    componentDidMount() {
        this.refs.iScroll.addEventListener("scroll", () => {
            if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight) {
                this.loadMoreItems();
            }
        });
        window.addEventListener('resize', () => {
            this.setState({ HETGHT: window.innerHeight - 88 })
        })

        axios.get(`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=cb4b417e6ef9a67022b8af0e75c658a9&extras=owner_name%2C+views&per_page=20&format=json&nojsoncallback=1`)
            .then(res => {
                const photos = res.data.photos.photo;
                var items = this.state.items;
                photos.forEach(photo => {
                    items.push({
                        id: photo.id,
                        title: photo.title,
                        ownername: photo.ownername,
                        views: photo.views,
                        source: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
                    })
                });
                this.setState({
                    items: items,
                });
            })
    }
    loadMoreItems() {
        this.setState({
            loadingState: true,
            page: this.state.page + 1
        });
        const Req = `https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=cb4b417e6ef9a67022b8af0e75c658a9&extras=owner_name%2C+views&per_page=20&page=${this.state.page}&format=json&nojsoncallback=1`
        axios.get(Req)
            .then(res => {
                const photos = res.data.photos.photo;
                var items = this.state.items;
                photos.forEach(photo => {
                    items.push({
                        id: photo.id,
                        title: photo.title,
                        ownername: photo.ownername,
                        views: photo.views,
                        source: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
                    })
                });
                this.setState({
                    items: items,
                    loadingState: false,
                });
            })
    }

    render() {
        var IMAGES = [];
        this.state.items.map((item, i) => {
            const info = "by " + item.ownername + " - " + item.views + " views";
            const Overlay = (
                <div style={captionStyle}>
                    <div>{info}</div>
                </div>);
            IMAGES.push({
                src: item.source,
                thumbnail: item.source,
                thumbnailWidth: "120%",
                thumbnailHeight: "120%",
                caption: `${item.title}`,
                alt: item.title,
                customOverlay: Overlay,
                key: item.id
            })
            return 0;
        })

        return (
            <div ref="iScroll" style={{ height: this.state.HETGHT, overflow: "auto", marginTop: "2" }}>
                {/* <ul>
            {this.displayItems()}
        </ul> */}
                <Gallery className={"container-fluid"} images={IMAGES} margin={3}
                    onClickThumbnail={(index, event) => {
                        this.props.history.push('/photo/'+this.state.items[index].id+'?');
                        console.log(this.state.items[index])
                    }}
                    enableLightbox={false} enableImageSelection={false} ></Gallery>

                {this.state.loadingState ? <p className="loading"> Loading More..</p> : ""}
            </div>);
    }
}
export default Explore;