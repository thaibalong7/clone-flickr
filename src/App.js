import React, { Component } from 'react';
import './App.css';
import ExploreContainer from './components/containers/ExploreContainer'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TagSearchContainer from './components/containers/TagSearchContainer';
import PhotoContainer from './components/containers/PhotoContainer';
import Menu from './components/Presentationals/Menu';


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
		return (
			<Router>
				<div className="container-fluid">
					{/* <header className="App-header">
					<h1 className="App-title">Photo</h1>
					<button>dddd</button>
				</header> */}
					<Menu />
					<Switch>
						<Route exact path="/" component={ExploreContainer} />
						<Route path="/explore" component={ExploreContainer} />
						<Route path="/photo/:id" component={PhotoContainer} />
						<Route path="/tag/:tagName" component={TagSearchContainer} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default (App);
