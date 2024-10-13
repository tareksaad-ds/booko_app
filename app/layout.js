import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Booko App",
  description: "Book a meeting or a conference room for your team.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="mx-auto max-w-7xl px-2 py-3 sm:px-4 lg:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
