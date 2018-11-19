import React, { Component } from 'react';
import Repos from './Repos';
import '../css/App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: 'djsaun',
      repo: 'weather-mapper',
      eventTypes: [],
      events: [],
      eventsLoading: true,
      error: false,
      error_message: ''
    }

    this.retrieveEvents = this.retrieveEvents.bind(this);
  }

  async retrieveEvents(user, repo, event) {
    // Set up initial array and API URL variables
    const eventsArr = [];
    const eventTypesArr = [];
    const githubURL = `https://api.github.com/repos/${user}/${repo}/events`;

    // If the promise is successfully returned
    return await axios.get(githubURL)
    .then(res => {
      // Add the returned events to the eventsArr array
      eventsArr.push(res.data);

      // Loop over all of the events and get all event types
      res.data.forEach(event => {
        // Add the event types to the eventTypesArr array
        eventTypesArr.push(event.type);
      })

      // Remove all duplicate event type values from the array
      const uniqueEventTypes = Array.from(new Set(eventTypesArr));

      // Update our state to include the returned events and event types
      this.setState({
        events: eventsArr[0],
        eventTypes: uniqueEventTypes,
        eventsLoading: false
      });
    })
    // Handle the error if the promise doesn't successfully return a result 
    .catch(err => {
      this.setState({
        error: true,
        error_message: err.message
      })
    })
  }

  componentDidMount() { 
    this.retrieveEvents(this.state.user, this.state.repo);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Repos repoName={this.state.repo} />
      </div>
    );
  }
}

export default App;
