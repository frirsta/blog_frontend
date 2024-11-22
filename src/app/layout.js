import "./globals.css";
import { MessageProvider } from "@/context/MessageContext";
import { AuthProvider } from "@/context/AuthContext";
import { PostsProvider } from "@/context/PostContext";
import Notification from "@/components/ui/Notification";
import BtmNav from "@/components/navigation/BtmNav";
import NavBar from "@/components/navigation/NavBar";
import Drawer from "@/components/navigation/Drawer";

export const metadata = {
  title: "My Blog",
  description: "A blog built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <PostsProvider>
            <MessageProvider>
              <Notification />
              <NavBar />
              <Drawer />
              <div className="content">{children}</div>
              <BtmNav />
            </MessageProvider>
          </PostsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
