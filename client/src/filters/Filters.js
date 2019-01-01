import React, { Component } from 'react';
import logo from '../lib/img/logo.png';
import './Filters.css';

/*
 * Filters: Component that renders the top navbar with filters.
 */
class Filters extends Component {

	constructor(props) {
		super(props);

		// States are the values of the filters
		this.state = {
			label: "",
			minScore: 0,
			videoStream: ""
		};
	}

	/**
	 * If the filters state changes, send updated data back to parent component through callback function. 
	 */
	componentDidUpdate(prevProps, prevState) {
		let label = this.state.label;
		let minScore = this.state.minScore;
		let videoStream = this.state.videoStream;
		if(prevState.label !== label || prevState.minScore !== minScore || prevState.videoStream !== videoStream) {
			this.props.setFilters(label, minScore, videoStream);
		}
	}

	/**
	 * Filter string inputs: lowercase string and capitalize first letter of each word
	 * @param {string} val - the input string
	 * @return {string}    - the filtered string
	 */
	filterInput(val) {
		let valLowCase = val.toLowerCase();
		return valLowCase.split(" ")
					//if there were multiple following whitespaces, remove them
					.filter(el => el !== "")
					.map(word => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" ");
	}

	/**
	 * Update all the states when the filter form is submitted
	 *
	 * @param {Event} event - onSubmit of filters form
	 */
	updateFilters = (event) => {
		event.preventDefault();
		this.setState({
			label: this.filterInput(event.target.label.value),
			minScore: event.target.minScore.value,
			videoStream: this.filterInput(event.target.videoStream.value)
		});
	}

	render() {

		return (
			<div className="filter-header">
				<div className="logo">
					<img src={logo} alt="Logo" width="100px"/>
				</div>

				<form onSubmit={this.updateFilters} className="filters-form">
					<label htmlFor="videoStream">Video Stream</label>
					<input type="text" name="videoStream" pattern="[A-Za-z\s]*$" defaultValue="All" required/>

					<label htmlFor="label">Label</label>
					<input type="text" name="label" pattern="[A-Za-z\s]*$" defaultValue="All" required/>

					<label htmlFor="minScore">Min Score</label>
					<input type="number" name="minScore" defaultValue="0" min="0" max="100" required/>

					<input className="btn-main" type="submit" value="Apply" />
				</form>
			</div>
		);
	}
}

export default Filters;