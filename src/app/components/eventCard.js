import Image from "next/image";
import Link from "next/link";

export default function EventCard({ event }) {
  return (
    <div className="card">
      <div className="image">
        <button>
          <Image
            src="/star.svg"
            alt=""
            width={36}
            height={36}
          />
        </button>
      </div>
      <div className="contentContainer">
        <div className="infoContainer">
          <div className="date">
            <span>{event.date.month}</span>
            <span>{event.date.day}</span>
            <span>{event.date.time}</span>
          </div>
          <div className="info">
            <span className="title">{event.name}</span>
            <span className="address">{event.address}</span>
            <p className="description"></p>
          </div>
          <div className="event"></div>
        </div>
        <Link href={`/event/${encodeURIComponent(event.link)}`}>See More</Link>
      </div>
    </div>
  );
}