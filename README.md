# Interview Scheduler

React SPA application that allows users to book and cancel interviews. Data is persisted by the API server using a PostgreSQL database which can be found at https://github.com/Zhabskyi/scheduler-api. The client application communicates with an API server over HTTP, using the JSON format. Jest tests are used through the development of the project. As well as storybook and Cypress. We combine a concise API with a WebSocket server to build a realtime experience.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```
### Running coverage Jest test data

```sh
npm test -- --coverage --watchAll=false
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress testing tool

```sh
npm run cypress
```

## Key Features

* Interviews can be booked between Monday and Friday.

* A user can switch between weekdays.
* A user can book an interview in an empty appointment slot.
* Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
* A user can cancel an existing interview.
* A user can edit the details of an existing interview.
* The list of days informs the user how many slots are available for each day.
* The expected day updates the number of spots available when an interview is booked or canceled.
* A user is presented with a confirmation when they attempt to cancel an interview.
* A user is shown an error if an interview cannot be saved or deleted.
* A user is shown a status indicator while asynchronous operations are in progress.
* When the user presses the close button of the error they are returned to the Add or Show view (skipping Status and Confirm).
* The application makes API requests to load and persist data. We do not lose data after a browser refresh.
* The client application communicates with a WebSocket server.
* When a user books or cancels an interview, all connected users see the update in their browser.


## Technical Specifications
* React
* Webpack, Babel
* Axios, WebSockets
* Storybook, Webpack Dev Server, Jest, Testing Library, Cypress

