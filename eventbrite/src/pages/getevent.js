import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import "../static/addevent.css"
const Getevents = (props) => {
  const [cookies, setCookie] = useCookies(['name']);
  const liked = "https://img.icons8.com/color/48/like--v3.png" // display if the image is liked or not
  const notliked = "https://img.icons8.com/windows/32/like--v1.png" // display if the image is liked or not
  const [eventsArray, setEventsArray] = useState([]);
  var events ={};

  useEffect(() => {
 /// Getting events and storing it n evntsarray
    getevents()
      .then(events => {
        setEventsArray(events);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const getevents = async () => {
    try {
      const iduser = cookies.id;  //could be used to sent csrf token 
      const data = { id: iduser };
      const response = await fetch("http://localhost:8000/api/getevent", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('No dtsa recieved');
      }
      const events = await response.json();
      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  };

  const likethis = (e) => {
    const iddata={id:e.target.name}
    fetch('http://localhost:8000/api/like',{
      method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(iddata)
    }).then(e.target.src=liked)
  }


if(props.value==="m"){
    ////props.value===m when i need only my events 
    events = eventsArray.filter(event=>event.user_id==cookies.id)
    // console.log(events)
}else{
   events = eventsArray;
}



  return (
    <>
    <div className='container' />
      <div className="main">
        {(props.value==="m")?<h1>||  My Events ||</h1>:" "}
        {events.map((event, index) => (
          <div key={index} className="cardinfo border-bottom shadow-sm" >
            <div className="thumnail " style={{ backgroundImage: `url(${event.image})`,}} ></div>
            <div className="info">
              <h3 className='name'>{event.event_name}</h3>
              <h1 className='t'>Venue: {event.location}</h1>
              <h2 className='d'>{(new Date(event.date)).toDateString()}</h2>
              <h1 className='t'>Starts at {event.time}</h1>
              <label htmlFor="likes" id='nol'>{event.nol}</label>
              <img width="20" height="20"  src={(event.is_liked) ? liked : notliked} alt="like--v1" onClick={likethis} name={event.id} id="likes"/>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Getevents;
