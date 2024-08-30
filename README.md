

# BugBook

This project is a social networking platform built with modern technologies such as Next.js 15 (test version), Tailwind CSS, Shadcn/UI, TypeScript, Prisma, and PostgreSQL. The application offers features like profile management, direct messaging, post creation, and user interaction, all fully localized in Portuguese.

## Features

- **User Authentication**: Secure login and registration system powered by Lucia Auth and Google OAuth.
- **Profile Management**: Users can update their profiles, including changing avatars using UploadThing for file handling.
- **Image Cropping**: Integrated with `react-cropper` for profile image editing.
- **Direct Messaging**: Real-time direct messaging feature powered by Stream Chat.
- **Post Creation**: Users can create and share posts with their followers.
- **Likes and Comments**: Users can like and comment on posts to interact with others.
- **User Following**: Follow other users to see their posts and activities.
- **Real-time Updates**: Instant updates across the platform.
- **Localization**: Fully translated to Portuguese.
- **Responsive Design**: Optimized for various screen sizes.
- **Database Integration**: Data is managed using Prisma and stored in a PostgreSQL database.

## Technologies Used

- **Next.js 15**: A powerful React framework that provides server-side rendering and other advanced features.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Shadcn/UI**: A collection of accessible UI components.
- **TypeScript**: A typed superset of JavaScript that helps in building large-scale applications.
- **Prisma**: An ORM for working with databases in TypeScript and JavaScript.
- **PostgreSQL**: A powerful, open-source relational database.
- **Lucia Auth**: Lightweight and flexible authentication library.
- **Google OAuth**: Enables users to sign in with their Google accounts.
- **UploadThing**: Simple file upload handling.
- **Stream Chat**: A powerful chat API for direct messaging.
- **react-cropper**: A React component wrapper for Cropper.js for image cropping.

## Getting Started

### Prerequisites

- **Node.js** (version 20 or higher)
- **npm** 
- **PostgreSQL** installed and running

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/diegovilhalva/bugbook.git
   cd bugbook
   ```

2. **Install dependencies**:
   ```bash
   npm i --legacy-peer-deps
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root of your project and add the following:
   ```bash
   POSTGRES_URL="postgresql://user:password@localhost:5432/mydatabase"
   POSTGRES_PRISMA_URL="your_prima url"
   POSTGRES_URL_NO_SSL="your_prisma_url"
   POSTGRES_URL_NON_POOLING="your_prisma_url"
   POSTGRES_USER="your_postgres_user"
   POSTGRES_HOST="your_postgres_host"
   POSTGRES_PASSWORD="your_postgres_password"
   POSTGRES_DATABASE="your_postgres_database"
   UPLOADTHING_SECRET="your_uploadthing_secret"
   NEXT_PUBLIC_UPLOADTHING_APP_ID="your_uploadthing_id"
   CRON_SECRET="generate_a_cronsecret"
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   NEXT_PUBLIC_STREAM_KEY="your_stream_api_key"
   STREAM_SECRET="your_stream_api_secret"
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```
   Replace the placeholders with your actual database connection string, Google OAuth credentials, and Stream Chat API keys.



4. **Start the development server**:
   ```bash
   npm run dev
   ```

8. **Visit your application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Usage

- **User Registration/Login**: Create an account using traditional sign-up or Google OAuth.
- **Update Profile**: Go to your profile page to update personal information and change your avatar.
- **Crop Image**: When updating the avatar, use the integrated cropping tool to adjust your profile picture.
- **Post Creation**: Share your thoughts and media by creating posts.
- **Like and Comment**: Engage with other users by liking and commenting on their posts.
- **Follow Users**: Stay updated with your favorite users by following them.
- **Direct Messaging**: Start a conversation with other users using the Stream Chat-powered messaging system.



## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

