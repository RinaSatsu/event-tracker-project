'use client'
import BackButton from "@/app/components/backButton";
import React from "react";

export default function EventPage({ params }) {
  const { eventName } = React.use(params);
  return (
    <div>
      <h1>This is {decodeURIComponent(eventName)} event</h1>
      <BackButton />
    </div>
  );
}