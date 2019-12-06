# TRONIC PROJECTS API

## Technologies: 
Node, Express, JWT, Firebase

## Overview:
Tronic Projects API is a simple project to allow users to create simple project workflows and assign resources to these project and workflow items. Projects will be task focused with a Kanban

## API List

### User API
1. GET: /api/v1/volunteers
2. GET: /api/v1/volunteer
3. PATCH: /api/v1/volunteer
4. POST: /api/v1/volunteer
5. DELETE /api/v1/volunteer

### Projects API
1. GET: /api/v1/projectss
2. GET: /api/v1/project
3. PATCH: /api/v1/project
4. POST: /api/v1/project
5. DELETE /api/v1/project

### Auth API

## TODO ITEMS
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

## Acknowledgments
volunteer-api-node-express-jwt-firestore was inspired by..

## License
MIT
