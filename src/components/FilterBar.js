import React from 'react';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.owner = React.createRef();
    this.repo = React.createRef();
    this.eventType = React.createRef();
  }

  render() {
    const {owner, repo, eventTypes, handleFormSubmit} = this.props;
    // Conditionally disable the event type select bar depending on if event types are present or not
    let disabled = (!eventTypes.length ? true : null);
    
    return (
      <div className="filterBar"> 
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="owner">Owner</label>
            <input name="owner" placeholder="owner" defaultValue={owner} ref={this.owner}></input>
          </div>

          <div>
            <label htmlFor="repo">Repository</label>
            <input name="repo" placeholder="Repository" defaultValue={repo} ref={this.repo}></input>
          </div>

          <div>
            <label htmlFor="eventType">Event Type</label>
            <select name="eventType" placeholder="eventType" ref={this.eventType} disabled={disabled ? true : null}>
              <option value="">Select an Event Type</option>
              {/* Loop through all event types present in the repo */}
              {eventTypes.map((eventType, key) => {
                return <option key={key} defaultValue={eventType}>{eventType}</option>
              })}
            </select>
          </div>
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default FilterBar;
