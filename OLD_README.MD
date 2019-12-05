#VOLUNTEER API

##Technologies: Node, Express, JWT, Firebase

##Overview:
A basic sample set of API's to perform CRUD on a generic "Volunteer" collection in a Firebase, Firestore database. These API's are protected using a JWT returned to the client upon successful login. All subsequent API requests require a valid, non-expired JWT to be included in the header.

This is essentially the beginnings of a small mockup of a larger project I am considering building that will most likely be fronted by React native or be an exclusive to iOS built with Swift.

##API List
1. POST: /api/v1/login
2. GET: /api/v1/volunteers
3. GET: /api/v1/volunteer
4. PUT: /api/v1/volunteer
5. POST: /api/v1/volunteer
6. DELETE /api/v1/volunteer


##TODO ITEMS
1. Create payload validation middleware
2. Create proper username/pw hash login
3. Create tests
4. Create common API message response object
5. Comments, comments, comments
6. Create roleRoutes.js for admin side
7. FIREBASE: Indexing, Security Rules, etc
8. Review possibly using Passport.js
9. Eventually, move to standard node project (github and CI/CD) and deploy with container tech (docker possible)
10. ...