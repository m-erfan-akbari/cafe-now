import "./globals.css";
import Navbar from "@/components/header/Navbar";
import { ReduxProvider } from "@/lib/redux/Provider";
import Header from "@/components/header/Header";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Cafe Now",
  description: "Created by Cafe Now Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang='fa'>
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <Header />
          <Navbar />
          <Toaster />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
