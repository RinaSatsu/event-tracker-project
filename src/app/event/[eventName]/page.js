'use client'
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BackButton from "@/app/components/backButton";
import axios from "axios";

export default function EventPage({ params }) {
  const routeParams = useParams();
  const eventName = params.eventName;

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventName) return;

    async function fetchEventByName() {
      try {
       const API_KEY = "GTFQBVOZQRC57FFB4ZTZ"; //Hardcoded API Key(not ideal but fine for now)

       //Searching for event by name
       const searchResponse = await axios.get(
        `https://www.eventbriteapi.com/v3/events/search`,{
          params:{
            q: eventName,
            expand: "venue,organizer,ticket_availability", //Getting more info for a single API call
          },
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      //Error handling for no results 
      if(!searchResponse.data.events || searchResponse.data.events.length === 0) {
        throw new Error("No matching events found");
      }

      const matchedEvent = searchResponse.data.events[0];

      const eventResponse = await axios.get(
        `https://www.eventbriteapi.com/v3/events/${matchedEvent.id}/`,
        {
          params: {
            expand: "venue,organizer,ticket_availability",
          },
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      setEventData(eventResponse.data);
    } catch (err)
    {
  setError(err.message);
  console.error("Fetch error:", err);
 } finally {
  setLoading(false);
 }   
}

fetchEventByName();
}, [eventName]);

if (loading) return <div>Loading event...</div>;
if (error) return <div>Error: {error}</div>;
if (!eventData) return <div>No event found.</div>;

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

  return (
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
  
      <BackButton />
    </div>
  );
}