const express = require('express');
const router = express.Router();
const mockData = require('../data/event_data')


router.get('/events/:label/:score/:videostream', function(req, res) {
	let label = req.params.label;
	let minScore = parseInt(req.params.score);
	let videoStream = req.params.videostream;

	// Will store all the events with the given label, minScore and videoStream.
	let filteredEvents = [];

	for(ev of mockData.mockResponse.events) {
		if(videoStream === "All" || videoStream === ev.videoStream) {

			// If current event has label with score >= minScore, add it to filteredEvents
			if(isSearchedEvent(ev, label, minScore)) {
				filteredEvents.push(ev);
			}
		}
	}
	res.status(200).json(filteredEvents);
});


/**
 * Checks if the event has the given label with a score above or equal to minScore.
 * @param {Object} ev 	 	- timeline event object
 * @param {string} label 	- label we are looking for
 * @param {number} minScore - minimum score the label needs to have
 *
 * @return {boolean}		- true if ev contains label with a score >= minScore; false otherwise
 */
var isSearchedEvent = function(ev, label, minScore) {
	if(label === "All" && minScore === 0) {
		return true;
	} else {
		for(p of ev.predictions) {
			for(let i=0; i<p.scores.length; i++) {

				let s = p.scores[i];	
				if(label === "All" || label === s.label) {
					if(s.score >= minScore) {
						return true;
					}

					//if the label's score doesn't meet requirement, break loop and search out next object in predictions array
					i = Number.MAX_VALUE;
				}		
			}
		}
		return false;
	}
}



module.exports = router;