import React from 'react';
import { format } from 'date-fns';

class Repos extends React.Component {

  render() {
    const { displayedEvents } = this.props;
    
    return(
      <div className="events">
        {displayedEvents.map((event, key) => {
          return <div className="event" key={key}>
            <p>Event performed by: <a href={`https://github.com/${event.actor.display_login}`} target="_blank" rel="noopener noreferrer">{event.actor.login}</a></p>
            <p>Event type: {event.type}</p>
            <p>Action performed on {format(new Date(event.created_at), 'MMM DD, YYYY')} at {format(new Date(event.created_at), 'h:mma')}</p>
          </div>
        })}
      </div>
    )
  }
}

export default Repos;
