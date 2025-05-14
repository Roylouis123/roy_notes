/**
 * Email Service Tests
 * 
 * This file tests the email service utility to ensure
 * emails can be sent correctly.
 */

const nodemailer = require('nodemailer');
const logger = require('../../utils/logger');

// Mock nodemailer and logger before importing the module
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockImplementation((mailOptions) => {
      return Promise.resolve({
        messageId: 'mock-message-id',
        response: 'mock-response'
      });
    })
  })
}));

jest.mock('../../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

// Import email service after mocking dependencies
const { sendEmail, sendPasswordResetEmail } = require('../../utils/emailService');

describe('Email Service', () => {
  // Set up test environment variables
  beforeAll(() => {
    process.env.EMAIL_SERVICE = 'test-service';
    process.env.EMAIL_USERNAME = 'test@example.com';
    process.env.EMAIL_PASSWORD = 'test-password';
    process.env.EMAIL_FROM = 'no-reply@test.com';
  });

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Clean up environment variables
    delete process.env.EMAIL_SERVICE;
    delete process.env.EMAIL_USERNAME;
    delete process.env.EMAIL_PASSWORD;
    delete process.env.EMAIL_FROM;
  });

  describe('sendEmail', () => {
    it('should create a transport with correct config', async () => {
      await sendEmail({
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test email content'
      });

      expect(nodemailer.createTransport).toHaveBeenCalledWith({
        service: 'test-service',
        auth: {
          user: 'test@example.com',
          pass: 'test-password'
        }
      });
    });

    it('should send an email with correct options', async () => {
      const emailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test email content'
      };

      await sendEmail(emailOptions);

      const mockTransport = nodemailer.createTransport();
      expect(mockTransport.sendMail).toHaveBeenCalledWith({
        from: 'no-reply@test.com',
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test email content'
      });
    });

    it('should include HTML content when provided', async () => {
      const emailOptions = {
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test email content',
        html: '<p>Test HTML content</p>'
      };

      await sendEmail(emailOptions);

      const mockTransport = nodemailer.createTransport();
      expect(mockTransport.sendMail).toHaveBeenCalledWith({
        from: 'no-reply@test.com',
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test email content',
        html: '<p>Test HTML content</p>'
      });
    });

    it('should log success when email is sent', async () => {
      await sendEmail({
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test email content'
      });

      expect(logger.info).toHaveBeenCalledWith('Email sent: mock-message-id');
    });

    it('should throw an error when sending fails', async () => {
      // Mock a failure
      const mockError = new Error('Failed to send email');
      
      nodemailer.createTransport.mockReturnValueOnce({
        sendMail: jest.fn().mockRejectedValueOnce(mockError)
      });

      await expect(sendEmail({
        to: 'recipient@example.com',
        subject: 'Test Subject',
        text: 'Test email content'
      })).rejects.toThrow('Email could not be sent');

      expect(logger.error).toHaveBeenCalledWith('Email sending failed: Failed to send email');
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('should send a password reset email with correct subject and content', async () => {
      const email = 'user@example.com';
      const resetToken = 'test-reset-token';
      const resetUrl = 'https://example.com/reset/test-reset-token';

      await sendPasswordResetEmail(email, resetToken, resetUrl);

      const mockTransport = nodemailer.createTransport();
      const mailCall = mockTransport.sendMail.mock.calls[0][0];
      
      expect(mailCall.to).toBe(email);
      expect(mailCall.subject).toBe('Password Reset Request');
      expect(mailCall.text).toContain(resetUrl);
      expect(mailCall.html).toContain(resetUrl);
      expect(mailCall.html).toContain('Reset Password');
    });
  });
});