import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import "@/app/styles/globals.css";

export const metadata = {
  title: "EventHorizon",
  description: "Event tracker app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <div id="top"></div>
        <div className="page-wrapper">
          <div className="page-content">
            <Navbar />
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
