import React from 'react';
import { format } from 'date-fns'

class Repos extends React.Component {

  render() {
    const { events } = this.props;
    
    return(
      <div className="events">
        {events.map((event, key) => {
          console.log(event);
          return <div className="event" key={key}>
            <p>Event performed by: <a href={`https://github.com/${event.actor.display_login}`} target="_blank">{event.actor.login}</a></p>
            <p>Event type: {event.type}</p>
            <p>Updated on {format(new Date(event.created_at), 'MMM DD, YYYY')} at {format(new Date(event.created_at), 'h:mma')}</p>
          </div>
        })}
      </div>
    )
  }
}

export default Repos;
