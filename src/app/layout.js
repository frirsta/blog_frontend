import "./globals.css";
import Navbar from "@/components/NavBar";
import AuthGate from "@/components/AuthGate";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "My Blog",
  description: "A blog built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-base-200">
        <AuthProvider>
          <Navbar />
          <AuthGate>{children}</AuthGate>
        </AuthProvider>
      </body>
    </html>
  );
}
