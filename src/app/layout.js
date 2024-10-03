import "./globals.css";
import PostsPage from "./posts/page";

export const metadata = {
  title: "My Blog",
  description: "A blog built with Next.js",
};

export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>My Blog</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/posts">Posts</a>
          </nav>
        </header>
        <main>
          <PostsPage />
        </main>
      </body>
    </html>
  );
}
