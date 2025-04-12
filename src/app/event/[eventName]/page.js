'use client'
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BackButton from "@/app/components/backButton";
import axios from "axios";

export default function EventPage({ params }) {
  const eventName = params.eventName;
  const [eventData, setEventData] = useState(null);
  const [statusMessage, setStatusMessage] = useState("Loading event...")

  useEffect(() => {
    if (!eventName) {
      setStatusMessage("No event name provided.")
      return;
    }
    async function fetchEventByName() {
      try {
       const API_KEY = "GTFQBVOZQRC57FFB4ZTZ"; //Hardcoded API Key(not ideal but fine for now)

       const searchURL = `https://www.eventbriteapi.com/v3/events/search?token=${API_KEY}`;
       const searchResponse = await axios.get(searchURL, {
        params: {
          q: eventName,
          expand: "venue, organizer, ticket_availability"
        },
       });
      if(!searchResponse.data.events || searchResponse.data.events.length === 0) {
        setStatusMessage("No matching events found.");
        return
      }

      const matchedEvent = searchResponse.data.events[0];
      
      const eventURL = `https://www.eventbriteapi.com/v3/events${matchedEvent.id}/?token=${API_KEY}`;
      const eventResponse = await axios.get(eventURL, {
        params: {
          expand: "venue,organizer,ticket_availablity",
        },
      });
      
      setEventData(eventResponse.data);
      setStatusMessage("");
    } catch (err) {
      console.error("fetch error:", err);
      setStatusMessage("An error occured: " + err.message);
    }
  }

fetchEventByName();
}, [eventName]);

let content;

if (statusMessage) {
  content = <div>{statusMessage}</div>;
} else if (eventData){
const {
  name,
  start,
  end,
  logo,
  venue,
  description,
  organizer,
  ticket_availability,
} = eventData;

  content = (
    <div>
      <h1>{name?.text}</h1>
      {logo?.url && (
        <div>
          <img src={logo.url} alt="Event banner" style={{maxWidth: "100%", borderRadius:"8px"}}/>
        </div>
      )}
      {start && end && (
        <div>
          <strong>Date:</strong>{new Date(start.local).toLocaleString()} - {new Date(end.local).toLocaleString()}
        </div>
      )}
      {venue && (
        <div>
          <strong>Location:</strong> {venue.name}, {venue.address.localized_address_display}
        </div>
      )}
      <div>
        <strong>Description:</strong>
        <div dangerouslySetInnerHTML={{__html: description.html}}/>
      </div>
      {organizer && (
        <div>
          <strong>Organizer:</strong> {organizer.name}
        </div>
      )}
        {ticket_availability && (
          <div>
            <strong>Tickets</strong> {ticket_availability.is_sold_out ? "Sold Out" : "Available"}
          </div>
      )}
    </div>
  );
}

return (
  <div>
    {content}
    <BackButton/>
  </div>
);
}