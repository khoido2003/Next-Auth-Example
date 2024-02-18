import nodemailer from "nodemailer";

const transpoter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  secure: false, // In production, turn secure back to true
  auth: {
    user: process.env.ELASTIC_EMAIL_USER,
    pass: process.env.ELASTIC_EMAIL_PASS,
  },
});

export const sendVerificationEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  // Create confirmation link to redirect user back to website
  const confirmLink = `http://localhost:3001/auth/new-verification?token=${token}`;

  console.log(email, confirmLink, token);

  const info = await transpoter.sendMail({
    from: "N-Auth Service <khoizpro7@proton.me>",
    to: email,
    subject: "Welcome to N-Auth Authentication Service",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Confirmation</title>
    </head>
    <body>
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Welcome to N-Auth Service!</h2>
        <p style="color: #666;">Thank you for registering with us. To complete your registration, please click the link below:</p>
        
        <a href="${confirmLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 15px;">Verify Email</a>
        
        <p style="color: #666; margin-top: 15px;">If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
        
        <p style="color: #007bff; word-wrap: break-word; overflow-wrap: break-word; margin-top: 10px;">${confirmLink}</p>
        
        <p style="color: #666; margin-top: 15px;">Thank you for choosing N-Auth Service! If you have any questions, feel free to contact our support team.</p>
        
        <p style="color: #999; margin-top: 15px;">Best regards,<br>N-Auth Team</p>
      </div>
    </body>
    </html>
    `,
  });
};
