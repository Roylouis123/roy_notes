/**
 * Authorization
 * =============
 *
 * There are two types of authorization:
 * - Stateful Authorization
 * - Stateless Authorization
 *
 * Stateful Authorization  // data is stored in server
 * ---------------------
 * 
 * Definition: In stateful authorization, the server maintains the state of each user session.
 * This usually involves storing session information on the server side.
 *
 * Mechanism:
 * - When a user logs in, the server creates a session and stores session data 
 *   (such as user ID and permissions) on the server.
 * - The server sends a session identifier (often in the form of a cookie) to the client.
 * - For subsequent requests, the client sends this session identifier back to the server.
 * - The server uses this identifier to retrieve the session data and verify the user's permissions.
 *
 * Pros:
 * - Centralized control over user sessions.
 * - Easy to revoke or invalidate sessions.
 *
 * Cons:
 * - Requires server-side storage (memory or database) to keep track of sessions.
 * - Scalability can be an issue since session data must be consistent across distributed systems.
 *
 * Example: When car comes for parking and needs to be parked.Then they will give a token.
 * while going out of the mall the car owner should return back the token.
 *
 *
 * Stateless Authorization   // data is stored in client side ex.jwt
 * ---------------------
 *
 * Definition: In stateless authorization, the server does not maintain any session data. Instead, all necessary information is stored in the token and sent with each request.
 *
 * Mechanism:
 * - When a user logs in, the server generates a token (usually a JSON Web Token, or JWT) that contains all necessary user information and permissions.
 * - This token is sent to the client and stored (typically in localStorage or a cookie).
 * - For subsequent requests, the client includes this token in the request headers.
 * - The server verifies the token and extracts the user information to authorize the request.
 *
 * Pros:
 * - No need for server-side storage of session data.
 * - Easier to scale horizontally as no session synchronization is required.
 *
 * Cons:
 * - Revoking tokens can be challenging unless using token expiration or blacklisting mechanisms.
 * - Token size can be larger than a simple session ID.
 *
 * Example: Using jsonwebtoken library to create and verify JWTs.
 *
 * Types of Authorization
 */
