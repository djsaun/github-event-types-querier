import React from 'react';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.user = React.createRef();
    this.repo = React.createRef();
    this.eventType = React.createRef();
  }

  render() {
    const {user, repo, eventTypes, handleFormSubmit} = this.props;
    // Conditionally disable the event type select bar depending on if event types are present or not
    let disabled = (!eventTypes.length ? true : null);
    
    return (
      <div>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="user">User</label>
          <input name="user" placeholder="User" defaultValue={user} ref={this.user}></input>

          <label htmlFor="repo">Repository</label>
          <input name="repo" placeholder="Repository" defaultValue={repo} ref={this.repo}></input>
          
          <label htmlFor="eventType">Event Type</label>
          <select name="eventType" placeholder="eventType" ref={this.eventType} disabled={disabled ? true : null}>
            <option value="">Select an Event Type</option>
            {/* Loop through all event types present in the repo */}
            {eventTypes.map((eventType, key) => {
              return <option key={key} defaultValue={eventType}>{eventType}</option>
            })}
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default FilterBar;
