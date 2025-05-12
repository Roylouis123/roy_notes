# app/middlewares/security_headers.py

"""Security headers middleware.

This module provides middleware to add important security headers to all responses,
enhancing the application's security posture against common web vulnerabilities.
"""

from flask import current_app


def add_security_headers(response):
    """Add security headers to the HTTP response.
    
    This function adds various security-related HTTP headers to responses
    to protect against common web vulnerabilities like XSS, clickjacking,
    content type sniffing, etc.
    
    Args:
        response (Response): The Flask response object to modify.
    
    Returns:
        Response: The modified response with added security headers.
    """
    # Content Security Policy - restricts sources of content
    if not response.headers.get('Content-Security-Policy'):
        csp = (
            "default-src 'self'; "
            "script-src 'self'; "
            "style-src 'self'; "
            "img-src 'self' data:; "
            "font-src 'self'; "
            "connect-src 'self';"
        )
        response.headers['Content-Security-Policy'] = csp
    
    # X-Content-Type-Options - prevents MIME type sniffing
    response.headers['X-Content-Type-Options'] = 'nosniff'
    
    # X-Frame-Options - prevents clickjacking
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    
    # X-XSS-Protection - provides XSS protection in older browsers
    response.headers['X-XSS-Protection'] = '1; mode=block'
    
    # Strict-Transport-Security - enforces HTTPS usage
    if current_app.config.get('ENV') == 'production':
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    
    # Cache control - for sensitive pages
    if request.path.startswith('/api/auth') or request.path.startswith('/api/users'):
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
        response.headers['Pragma'] = 'no-cache'
    
    return response
