import React from 'react';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.owner = React.createRef();
    this.repo = React.createRef();
    this.eventType = React.createRef();
  }

  render() {
    const {eventTypes, handleFormSubmit, handleSelectChange} = this.props;
    // Conditionally disable the event type select bar depending on if event types are present or not
    let disabled = (!eventTypes.length ? true : null);
    
    return (
      <div className="filterBar"> 
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="owner">Owner*</label>
            <input name="owner" id="owner" ref={this.owner}></input>
          </div>

          <div>
            <label htmlFor="repo">Repository*</label>
            <input name="repo" id="repo" ref={this.repo}></input>
          </div>

          <div>
            <label htmlFor="eventType">Event Type</label>
            <select name="eventType" id="eventType" placeholder="eventType" ref={this.eventType} onChange={handleSelectChange} disabled={disabled ? true : null}>
              <option value="">Select an Event Type</option>
              {/* Loop through all event types present in the repo */}
              {eventTypes.map((eventType, key) => {
                return <option key={key} defaultValue={eventType}>{eventType}</option>
              })}
            </select>
          </div>

          <button className="submitButton">Submit</button>
        </form>
      </div>
    )
  }
}

export default FilterBar;
