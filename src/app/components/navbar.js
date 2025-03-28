'use client'
import Link from 'next/link';
import Image from "next/image";

export default function Navbar() {
  return (
    <div style={{ display: "flex", background: "#FC6C81" }}>
      <div>EventHorizon</div>
      <nav>
        <ul>
          <li><Link href="/">Discover</Link></li>
          <li><Link href="/search">Find</Link></li>
          <li><Link href="/calendar">Plan</Link></li>
        </ul>
      </nav>
      <ul>
        <li>
          <Image
            src="/circle-user.svg"
            alt=""
            width={36}
            height={36}
          />
        </li>
        <li>
          <Image
            src="/night-day.svg"
            alt=""
            width={36}
            height={36}
          />
          </li>
      </ul>
    </div>
  );
}