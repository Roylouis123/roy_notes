/**
 * Email Service Utility
 * 
 * This file provides functionality to send emails using Nodemailer.
 * It's primarily used for sending password reset emails.
 */

const nodemailer = require('nodemailer');
const logger = require('./logger');

/**
 * Sends an email using configured transport
 * 
 * @param {Object} options - Email sending options
 * @param {String} options.to - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.text - Plain text email body
 * @param {String} options.html - HTML email body (optional)
 * @returns {Promise<Object>} Information about the sent email
 */
const sendEmail = async (options) => {
  try {
    // Create transport configuration
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text
    };

    // Add HTML if provided
    if (options.html) {
      mailOptions.html = options.html;
    }

    // Send email
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    
    return info;
  } catch (error) {
    logger.error(`Email sending failed: ${error.message}`);
    throw new Error('Email could not be sent');
  }
};

/**
 * Sends a password reset email
 * 
 * @param {String} email - Recipient email
 * @param {String} resetToken - Password reset token
 * @param {String} resetUrl - URL where user can reset password
 * @returns {Promise<Object>} Information about the sent email
 */
const sendPasswordResetEmail = async (email, resetToken, resetUrl) => {
  const subject = 'Password Reset Request';
  const text = `You are receiving this email because you (or someone else) has requested a password reset. Please go to: ${resetUrl} to reset your password. This link will expire in 10 minutes. If you did not request this, please ignore this email and your password will remain unchanged.`;
  
  // HTML version of the email for better user experience
  const html = `
    <h1>Password Reset</h1>
    <p>You are receiving this email because you (or someone else) has requested a password reset.</p>
    <p>Please click the link below to reset your password:</p>
    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>This link will expire in 10 minutes.</p>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
  `;
  
  return sendEmail({
    to: email,
    subject,
    text,
    html
  });
};

module.exports = {
  sendEmail,
  sendPasswordResetEmail
};