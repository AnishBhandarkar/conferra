
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen container mx-auto px-4">
          {children}
        </main>
        <Footer />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}