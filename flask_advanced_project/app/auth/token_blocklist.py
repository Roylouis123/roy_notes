# app/auth/token_blocklist.py

"""Token blocklist for JWT tokens.

This module manages a blocklist (or blacklist) of JWT tokens that have been
invalidated, usually due to user logout or security issues.
"""

# In a real application, this would be stored in Redis or a similar fast storage
# For this example, we'll use a simple in-memory set
_token_blocklist = set()


def add_token_to_blocklist(jti, exp=None):
    """Add a token to the blocklist.
    
    Args:
        jti (str): The unique JWT token identifier.
        exp (int, optional): Token expiration timestamp. Defaults to None.
            In a real application, this would be used for automatic cleanup.
    
    Returns:
        bool: True if the token was added, False if it was already blocked.
    """
    if jti in _token_blocklist:
        return False
    
    _token_blocklist.add(jti)
    return True


def is_token_blocked(jti):
    """Check if a token is in the blocklist.
    
    Args:
        jti (str): The unique JWT token identifier.
    
    Returns:
        bool: True if the token is blocked, False otherwise.
    """
    return jti in _token_blocklist


def remove_token_from_blocklist(jti):
    """Remove a token from the blocklist.
    
    Args:
        jti (str): The unique JWT token identifier.
    
    Returns:
        bool: True if the token was removed, False if it wasn't in the blocklist.
    """
    if jti in _token_blocklist:
        _token_blocklist.remove(jti)
        return True
    return False


def clear_blocklist():
    """Clear all tokens from the blocklist.
    
    This is mainly for testing purposes.
    """
    _token_blocklist.clear()
