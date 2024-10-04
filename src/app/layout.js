import "./globals.css";
import ClientLayout from "./client-layout";

export const metadata = {
  title: "My Blog",
  description: "A blog built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout />
        {children}
      </body>
    </html>
  );
}
