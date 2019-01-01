import React, { Component } from 'react';
import Timeline from './timeline/Timeline.js';
import Filters from './filters/Filters.js'
import './App.css';

/*
 * App: Component that renders the whole timeline application.
 * It is the parent of the Timeline and Filters components, and it passes data between them.
 */
class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			label: "All",
			minScore: 0,
			videoStream: "All"
		};
	}

	/*
     * Callback function passed to Filters component to get the updated filter values if user changed them
     */
	setFilters = (label, minScore, videoStream) => {
		this.setState({
			label: label,
			minScore: minScore,
			videoStream: videoStream
		});
	}

	render() {
		let filters = {
			label: this.state.label,
			minScore: this.state.minScore,
			videoStream: this.state.videoStream
		};
		return (
			<div className="bg-color">
		      <Filters setFilters={this.setFilters}/>
		      <Timeline filters={filters}/>
		    </div>
		);
	}
}

export default App;
