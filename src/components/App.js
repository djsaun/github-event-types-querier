import React, { Component } from 'react';
import FilterBar from './FilterBar';
import Repos from './Repos';
import '../css/App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      owner: 'djsaun',
      repo: 'weather-mapper',
      eventTypes: [],
      selectedEventType: '',
      events: [],
      displayedEvents: [],
      eventsLoading: true,
      error: false,
      error_message: ''
    }

    this.retrieveEvents = this.retrieveEvents.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.setState({
      owner: e.target.owner.value,
      repo: e.target.repo.value,
      selectedEventType: e.target.eventType.value
    })
  }

  async retrieveEvents(owner, repo) {
    // Set up initial array and API URL variables
    const eventsArr = [];
    const eventTypesArr = [];
    const githubURL = `https://api.github.com/repos/${owner}/${repo}/events`;

    // If the promise is successfully returned
    await axios.get(githubURL)
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

  // Check if state has been updated
  componentDidUpdate(prevProps, prevState) {
    // If there are new owner or repo values, run the retrieve events function
    if (this.state.owner !== prevState.owner || this.state.repo !== prevState.repo) {
      this.retrieveEvents(this.state.owner, this.state.repo);
    }
  }

  render() {
    return (
      <div className="App container">
        <FilterBar handleFormSubmit={this.handleFormSubmit} owner={this.state.owner} repo={this.state.repo} eventTypes={this.state.eventTypes} />
        <Repos events={this.state.events} />
      </div>
    );
  }
}

export default App;
