import React, { Component } from 'react';
import './EventDetails.css';

/*
 * EventDetails: Component that renders a modal with details about the timeline event passed as prop.
 */
class EventDetails extends Component {

	/**
	 * Return DOM element to display the event image, bouding boxes and prediction scores.
	 */
	displayImage = () => {
		let data = this.props.data;
		let imgUrl = data.imageSource;

		// Will contain all the prediction bounding boxes for the current event
		let boundingBoxes = [];

		// Will contain the label and score of the current bounding box
		let infoBox = [];

		// Unique key attribute; will be used to store DOM elements in boundingBoxes and infoBox arrays
		let i =0;

		for(let p of data.predictions) {
			
			// Find the label with the max score. We will only display this one.
			let maxLabel = p.scores.reduce((prev, current) => (prev.score > current.score) ? prev : current);
			infoBox = [
				<div key={i} className="label-box">
					<span>{maxLabel.label}</span>
					<span>{maxLabel.score}%</span>
				</div>
			];

			i++; ////////////////////////////

			let b = p.boundingBox;
			const boxStyle = {
				top: b.top*100 + '%',
				left: b.left*100 + '%',
				width: b.width*100 + '%',
				height: b.height*100 + '%'
			};

			boundingBoxes.push(
				<div key={i} className="bouding-box" style={boxStyle}>
					{infoBox}
				</div>
			);
		}

		return (
			<div className="image-box">
				<div className="image-box-inner">
					<img src={imgUrl} alt="{data.videoStream}" />
					{boundingBoxes}
				</div>
			</div>
		);
	}

	/**
	 * Set parent component state variable to null to remove display of this component
	 */
	closeEvent = () => {
		this.props.setSelectedEvent(null);
	}

	convertTime(timestamp) {
		var ts = new Date(timestamp * 1000);
		return ts.toLocaleString();
	}

	/**
	 * If data received by prop is not null, return DOM element for timeline event modal.
	 */
	displayEvent = () => {
		let data = this.props.data;
		if(data !== null) {
			return (<div className="container">
				<div className="modal-event v-center">
					<div className="modal-event-content animate">
						<div className="container d-flex modal-event-top">
							<div className="col-md-4 time-event">{this.convertTime(data.timestamp)}</div>
							<div className="col-md-4"><h5>{data.videoStream}</h5></div>
							<div className="col-md-4"><span onClick={this.closeEvent} className="closeBtn" title="Close Modal">&times;</span></div>
						</div>
						<div className="pb-5">
							{this.displayImage()}
						</div>
					</div>
				</div>
			</div>);
		}
	}

	render() {
		return (
			<div>
				{ this.displayEvent() }
			</div>
		);
	}
}

export default EventDetails;