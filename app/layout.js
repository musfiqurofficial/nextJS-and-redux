// main layout
"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Header } from "./components/navbar/Header";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Provider } from "react-redux";
import store from "./store/store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <Header />
          <Provider store={store}>{children}</Provider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
