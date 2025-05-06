import "@/app/styles/globals.css";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: "EventHorizon",
  description: "Event tracker app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <div id="top"></div>
          <div className="page-wrapper">
            <div className="page-content">
              <Navbar />
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
