import "./globals.css";
import Navbar from "@/components/NavBar";
import AuthGate from "@/components/AuthGate";
import Notification from "@/components/ui/Notification";
import { AuthProvider } from "@/context/AuthContext";
import { MessageProvider } from "@/context/MessageContext";

export const metadata = {
  title: "My Blog",
  description: "A blog built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MessageProvider>
            <Navbar />
            <Notification />
            <AuthGate>{children}</AuthGate>
          </MessageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
