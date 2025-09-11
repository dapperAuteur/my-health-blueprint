// lib/email.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  // Configure your email service here
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export async function sendMagicLinkEmail(email: string, magicLink: string) {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Access Your Health Blueprint',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Your Health Blueprint Awaits!</h1>
        <p>Click the button below to access your personalized Health Blueprint:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${magicLink}" 
             style="background-color: #2563eb; color: white; padding: 15px 30px; 
                    text-decoration: none; border-radius: 8px; display: inline-block;">
            Access My Health Blueprint
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.
        </p>
        <p style="color: #666; font-size: 14px;">
          Or copy and paste this link: ${magicLink}
        </p>
      </div>
    `
  }

  await transporter.sendMail(mailOptions)
}