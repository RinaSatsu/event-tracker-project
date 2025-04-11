'use client'
import BackButton from "@/app/components/backButton";
import HeroSection from "@/app/components/heroSection/heroSection";
import React from "react";

export default function EventPage({ params }) {
  const { eventName } = React.use(params);
  return (
    <div>
      <HeroSection
        title={`This is ${decodeURIComponent(eventName)} event`}>
        <BackButton />
      </HeroSection>
    </div>
  );
}