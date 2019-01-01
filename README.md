# Dynamic Timeline of Prediction Events <br><br>

**Stack used:** React, Node.js, Express <br>

The root folder contains the server code. You can find the client code in the client/ folder.

## How it works

I am using the Matroid API to get the data. It gives me different events in time, and for each event, we have a picture and probabilities of detection of certain objects/people. <br><br>

You can filter the events based on video steam, label or prediction score. <br>

<img src="https://github.com/ztsorojev/React-Dynamic_Timeline/blob/master/screenshot1.PNG" width="600" />   

When you click on an event, you see more details.

<img src="https://github.com/ztsorojev/React-Dynamic_Timeline/blob/master/screenshot2.PNG" width="600" />   

## Run the project

If you don't have nodemon installed, first run <br>

`npm i nodemon -g` <br>

Then you will have to install the dependencies. In the project root folder, run<br>

`npm install`
`cd client`
`npm install`

Then, you can go back to the root folder and run the app.<br>

`cd ..`
`npm run dev`

This will run the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The server is accessible at [http://localhost:5000](http://localhost:5000). A proxy forwards the API requests from port 3000 (client) to port 5000 (server).


