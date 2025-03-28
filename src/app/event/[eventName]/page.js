export default function EventPage({ params }) {
  return <h1>This is {decodeURIComponent(params.eventName)} event</h1>;
}