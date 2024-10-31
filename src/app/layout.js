import "./globals.css";
import AuthGate from "@/components/AuthGate";
import BtmNav from "@/components/BtmNav";
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
            <Notification />
            <AuthGate>{children}</AuthGate>
            <BtmNav />
          </MessageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
