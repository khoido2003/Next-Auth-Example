<!-- Add your project logo here -->
<p align="center">
  <img src="./public/logo-dark.svg" alt="Auth logo" width="100" height="100">
</p>

# Next.js Authentication Application Example

This project showcases user authentication using NextAuth, Typescript, Prisma(PostgreSql), Shadcn/UI, and Tailwind CSS.

## Screenshots

![Screenshot 1](screenshots/s-1.png)
_Sign in Page._

![Screenshot 2](screenshots/s-2.png)
_Sign up Page._

## Features

- User authentication with NextAuth
- Database integration with Prisma
- Two-factor authentication
- Email verification
- Password reset functionality
- Role-based access (User and Admin)
- UI components from Shadcn/UI
- Darkmode integration
- Styling with Tailwind CSS

## Database Diagram

![Database Diagram](diagram/e-r-diagram.png)
_Database example._

## Prerequisites

Make sure you have the following installed before running the project:

- Node.js and npm (Node Package Manager)
- PostgreSQL database (or another supported database for Prisma)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/khoido2003/Next-Auth-Example.git
   cd Next-Auth-Example
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your environment variables:**

   Create a `.env.local` file in the root directory and add the following:

   ```env
   DATABASE_URL=""
   DIRECT_URL=""
   AUTH_SECRET=''
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   # Add other necessary environment variables for Prisma and NextAuth
   ```

4. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Project Structure

- `pages/`: Next.js pages
- `public/`: Static assets
- `styles/`: Global styles and Tailwind CSS configurations
- `components/`: Reusable React components
- `prisma/`: Prisma database schema and configurations

## Technologies Used

- [Next.js](https://nextjs.org/)
- [NextAuth](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [Shadcn/UI](https://github.com/shadcn/ui)
- [Tailwind CSS](https://tailwindcss.com/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
