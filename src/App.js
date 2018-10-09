import React, { Component } from 'react';
import './App.css';
import Explore from './components/Explore'
import { BrowserRouter as Router, Route } from "react-router-dom";
import TagSearch from './components/TagSearch';
import Photo from './components/Photo';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: ''
		};
	}
	updateInputValue(evt) {
		this.setState({
			inputValue: evt.target.value
		});
	}
	changeInputValue = (v) => {
		this.setState({
			inputValue: v
		});
	}
	render() {
		return (
			<Router>
				<div className="container-fluid">
					{/* <header className="App-header">
					<h1 className="App-title">Photo</h1>
					<button>dddd</button>
				</header> */}
					<header>
						<nav className="navbar navbar-expand navbar-dark bg-dark">
							<a href="/" className="navbar-brand">Home</a>
							<button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav mr-auto">
									<a href="explore" className="nav-item active nav-link">Explore</a>
								</ul>
								<form className="form-inline my-2 mylg-0" action={"/tag/" + this.state.inputValue} onSubmit={null}>
									<input type="search"
										className="form-control mr-sm-2"
										placeholder="tag"
										value={this.state.inputValue}
										onChange={evt => this.updateInputValue(evt)}
									/>
									<button className="btn btn-outline-success" type="submit">Search</button>
								</form>
							</div>
						</nav>
					</header>
					<Route exact path="/" component={Explore} />
					<Route path="/explore" component={Explore} />
					<Route path="/photo/:id" component={Photo} />
					<Route path="/tag/:tagName" component={TagSearch} />
				</div>
			</Router>
		);
	}
}

export default (App);
