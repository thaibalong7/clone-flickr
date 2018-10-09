import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ""
        }
    }
    onChange = (e) => {
		let target = e.target;
		let name = target.name;
		let value = target.value;
		this.setState({
			[name]: value
		});
	}

	onSubmit = (e) => {
		e.preventDefault();
        let { history } = this.props;
        let keyword = this.state.keyword;
        if (keyword !== '') {
            this.setState({
                keyword: ''
            })
            history.push(`/tag/${keyword}`);
        }

	}
    render() {
        let {keyword} = this.state;
        return (
            <header>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand">Home</Link>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <Link to="explore" className="nav-item active nav-link">Explore</Link>
                        </ul>
                        <form className="form-inline my-2 mylg-0" onSubmit={this.onSubmit}>
                            <input type="search"
                                className="form-control mr-sm-2"
                                placeholder="tag"
                                name="keyword"
                                value={keyword}
                                onChange={this.onChange}
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </header>
        );
    }
}

export default withRouter(Menu);