import React, { Component } from 'react';
import EventDetails from './event_details/EventDetails.js';
import './Timeline.css';

/*
 * Timeline: Component that renders the timeline of events.
 */
class Timeline extends Component {

	constructor(props) {
		super(props);
		this.state = {

			// Array of all the timeline event objects
			data: [],

			// Object that will contain data of timeline event clicked by user
			selectedEvent: null
		};
	}

	componentDidMount() {
		this.getData()
			.then(res => {
				this.setState({data: res});
			})
			.catch(err => console.log(err));
	}

	/*
	 * If user changed filters: update the timeline.
	 */
	componentDidUpdate(prevProps) {
		if(prevProps.filters.label !== this.props.filters.label || prevProps.filters.minScore !== this.props.filters.minScore || prevProps.filters.videoStream !== this.props.filters.videoStream) {
			this.getData()
				.then(res => {
					this.setState({data: res});
				})
				.catch(err => console.log(err));
		}
	}

	/**
	 * API request to get the data of events based on the filters chosen by user.
	 * @return {Array<Object>} - Array containing the corresponding event objects
	 */
	getData = async () => {
		let label = this.props.filters.label; let minScore = this.props.filters.minScore; let videoStream = this.props.filters.videoStream;
		let url = '/api/events/' + label + '/' + minScore + '/' + videoStream;

		try {
			const response = await fetch(url);
			const body = await response.json();
			if(response.status !== 200) throw Error(body.message);
			return body;
		} catch(error) {
			console.log(error);
		}
		return null;
	}

	/**
	 * Display EventDetails component for the selected event.
	 *
	 * The component takes as props the selected event object and a callback function to update 
	 * the state variable selectedEvent to null when the user closes the component display.
	 */
	showEventDetails = () => {
		if(this.state.selectedEvent !== null) {
			return (<EventDetails data={this.state.selectedEvent} setSelectedEvent={this.setSelectedEvent}/>);
		}
	}

	setSelectedEvent = (ev) => {
		this.setState({
			selectedEvent: ev
		});
	}

	convertTime(timestamp) {
		var ts = new Date(timestamp * 1000);
		return ts.toLocaleString();
	}

	render() {
		// Unique key attribute; will be used to render DOM elements in map()
		let i = 0;

		// Map every event object in our data array to a DOM element that we render 
		return (
			<div className="container">
				<ul className="timeline">
					{this.state.data.map(ev => {

						let invertTimeline = (i%2) ? "" : "timeline-inverted";
						i++;

						return (<li key={i} className={invertTimeline}>
					      <div className="timeline-panel" onClick={() => this.setSelectedEvent(ev)}>
					        <div className="timeline-heading">
					          <h4 className="timeline-title"> {ev.videoStream} </h4>
					          <p><small className="text-muted"><i className="glyphicon glyphicon-time"></i> {this.convertTime(ev.timestamp)} </small></p>
					        </div>
					      </div>
					    </li>);
							
						})
					}		    
				</ul>
				{this.showEventDetails()}
			</div>			
		);
	}
}

export default Timeline;