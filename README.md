# The Blog / Blogify

Blogify is a full-featured, responsive blog platform designed to facilitate meaningful content sharing and interaction among users. With a focus on community, Blogify enables users to connect by following each other, liking posts, commenting, and exploring content across various categories and tags. Built with Next.js, the platform provides a seamless, fast-loading frontend experience, while leveraging robust authentication and an efficient REST API to connect with the Django backend.

# Features

## Existing Features

### Navigation bar

#### Bottom Navigation (BtmNav.js)

The Bottom Navigation is a mobile-responsive component that gives users quick access to essential features. It appears as a fixed bar at the bottom of the screen when users are logged in.

- Home Button: Directs users to the main posts page.
- Add Post Button: Opens the CreatePost modal for users to create a new post.
- Profile and Settings: Accessible through the user avatar, with options to visit the profile, go to settings, and log out.

#### Sidebar Navigation (Drawer.js)

For larger screens, the Sidebar Navigation appears as a fixed, vertical menu on the left side of the page, enhancing the desktop experience.

- Icons: Displays navigation icons for home, adding a post, and settings.
- Profile and Options Dropdown: The user avatar opens a dropdown with links to the profile page, settings, and a logout option.
- Modal Support: Clicking the add button (IoIosAddCircle) opens the CreatePost modal for easy post creation.

These navigation components ensure a consistent, responsive user experience across both mobile and desktop views.

### User Authentication

- Sign up, log in, and password reset functionality is available with case-insensitive username handling, ensuring an accessible, user-friendly experience.
- AuthContext ensures token management and automatic refresh for seamless session handling.

### Image Upload, Editor, and Blog Post Uploader

Blogify provides an intuitive process for creating new posts, including image upload, editing, and a rich text editor for content creation. These steps ensure users can easily share visually appealing and well-crafted blog posts.

1. Image Upload and Editor
   The image upload feature allows users to attach an image to their post, enhancing visual storytelling. After selecting an image, users are taken to an integrated image editor where they can fine-tune the uploaded image before adding it to their post.

- Upload Interface: A file input area allows users to upload their image.
- Preview: After editing, users see a preview of the image before proceeding with the post.

2. Post Content Editor
   Once the image is uploaded and edited, users can begin crafting their post. The post editor supports rich text formatting, making it easy to create visually appealing content.

- Title Input: Users can add a title for the post.
- Text Editor: A rich text editor (Jodit Editor) allows for text formatting.
- Category Selection: Users can select a category for their post from a predefined list of options such as Health, Beauty, Travel, Fashion, etc.
- Tags: Users can add tags to categorize their post further and improve discoverability.

3. Saving and Publishing
   Once the post is complete, users can publish it immediately. The post, along with the uploaded image and content, is sent to the backend via a multipart/form-data request. The backend handles storing the image and post content.

- User Feedback: Users are informed with clear success or error messages during the post upload process.

- Sanitization: The content entered by the user is sanitized to prevent security risks, ensuring that malicious scripts do not get executed when the post is viewed.

### Warnings and Discarding Edits

If the user tries to navigate away from the post editor or backtrack without saving, a warning modal appears, confirming whether the user wants to discard their unsaved changes. This ensures that users don't lose any progress accidentally.

### Profile Management

- Users can customize their profiles with an avatar, cover image, bio, and website URL.
- This feature fosters personalization, allowing users to represent themselves in the community.

### User Interaction Features

- Following System: Users can follow/unfollow others, enhancing content discovery and social engagement.
- Like Functionality: Users can like posts, with a dynamic like count that updates in real-time.
- Comments: Users can comment on posts, contributing to interactive discussions.
  Search: An integrated search bar enables users to find other users easily.

### Content Categorization

- Posts can be categorized by predefined categories like Health, Beauty, Travel, Fashion and Others.

## Future Features

- Notifications: Real-time notifications for likes, follows, and comments to keep users updated.
- Analytics Dashboard: Insightful analytics for users to track their post engagement and follower growth.
