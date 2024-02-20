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

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http:localhost:3001/auth/new-password?token=${token}`;

  const info = await transpoter.sendMail({
    from: "N-Auth Service <khoizpro7@proton.me>",
    to: email,
    subject: "Reset password request to N-Auth Authentication Service",
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 30px 0;">

                <table role="presentation" cellspacing="0" cellpadding="0" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

                    <!-- Header -->
                    <tr>
                        <td bgcolor="#007BFF" style="padding: 20px; text-align: center; color: #ffffff;">
                            <h1>Password Reset</h1>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 20px;">
                            <p>Hello,</p>
                            <p>You have requested to reset your password. Click the button below to proceed:</p>
                            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                            <p>If you didn't request a password reset, you can ignore this email.</p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="text-align: center; padding: 10px; background-color: #f4f4f4;">
                            <p>© 2024 N-Auth Service. All rights reserved.</p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>

    `,
  });
};
