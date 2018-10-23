import React, { Component } from 'react';
import '../../App.css';
import Gallery from 'react-grid-gallery';
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import { connect } from 'react-redux'

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
            HETGHT: window.innerHeight - 88
        };
    }
    componentDidMount() {
        this.refs.iScroll.addEventListener("scroll", () => {
            if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight) {
                this.props.loadMoreItems();
            }
        });
        window.addEventListener('resize', () => {
            this.setState({ HETGHT: window.innerHeight - 88 })
        })
    }
    render() {
        var IMAGES = [];
        this.props.listItem.map((item, i) => {
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
                        this.props.history.push('/photo/'+this.props.listItem[index].id+'?');
                    }}
                    enableLightbox={false} enableImageSelection={false} ></Gallery>

                {this.props.loadingState ? <p className="loading"> Loading More..</p> : ""}
            </div>);
    }
}

const mapStateToProps = (state) => ({
    listItem: state.listPhotoReducer
})

export default connect(mapStateToProps, null)(withRouter(Explore));