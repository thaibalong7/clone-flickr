import React, { Component } from 'react';
import './App.css';
import Explore from './components/Explore'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import TagSearch from './components/TagSearch';
import Photo from './components/Photo';
import Menu from './components/Menu';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: ''
		};
	}
	// updateInputValue(evt) {
	// 	this.setState({
	// 		inputValue: evt.target.value
	// 	});
	// }
	// changeInputValue = (v) => {
	// 	this.setState({
	// 		inputValue: v
	// 	});
	// }


	render() {
		let { keyword } = this.state;
		return (
			<Router>
				<div className="container-fluid">
					{/* <header className="App-header">
					<h1 className="App-title">Photo</h1>
					<button>dddd</button>
				</header> */}
					<Menu />
					<Switch>
						<Route exact path="/" component={Explore} />
						<Route path="/explore" component={Explore} />
						<Route path="/photo/:id" component={Photo} />
						<Route path="/tag/:tagName" component={TagSearch} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default (App);
