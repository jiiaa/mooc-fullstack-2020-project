# Project Work - MOOC Full Stack Open 2020

This is the awesome application which was made as a project work (final project) on the Full Stack Open course in the Open University of Helsinki.

The business idea of the project is related to the real estate business and therefore the names of the folders, components, states etc. includes words like apartment/house or similar.

The application was deployed to Heroku and a demo is available upon request.

## Technology Stack and Libraries

### Backend
- NodeJS, Express, dotenv
- JSON Web Token, bcrypt
- MongoDB ja mongoose
- AWS S3 Bucket, aws-sdk, multer

### Frontend
- React, Redux, React Router
- Material-UI

## Developing The Application

1. Start the [backend](houcher-backend) in the local mode using the local MongoDB `$npm run dev`
2. Start the [frontend](houcher-frontend) in the local mode `$npm start`

### Testing the backend endpoints

First make sure you have the [REST Client plug-in](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) installed in your VS Code and. Next open the file [login_user.rest](houcher-backend/requests/login_user.rest). There are requests for testing the sign-in and login endpoints.
