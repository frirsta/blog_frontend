import "./globals.css";
import { MessageProvider } from "@/context/MessageContext";
import { AuthProvider } from "@/context/AuthContext";
import Notification from "@/components/ui/Notification";
import BtmNav from "@/components/BtmNav";
import NavBar from "@/components/NavBar";

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
            <Notification />
            <NavBar />
            {children}
            <BtmNav />
          </MessageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
