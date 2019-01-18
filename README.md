[![Build Status](https://travis-ci.com/Akinmyde/Questioner.svg?branch=server)](https://travis-ci.com/Akinmyde/Questioner)
[![Coverage Status](https://coveralls.io/repos/github/Akinmyde/Questioner/badge.svg?branch=server&kill_cache=1")](https://coveralls.io/github/Akinmyde/Questioner)
<a href="https://codeclimate.com/github/Akinmyde/Questioner/maintainability"><img src="https://api.codeclimate.com/v1/badges/1293144f78e1201ccc00/maintainability" /></a>
# Questioner
Crowd-source questions for a meetup. Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

## Getting Started

### Prerequisites

These are the required tools get started

* [Node](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)

To download dependencies 

```
npm install 
```

To start application

```
npm start
```

## User Interafce

Find below, the links to the various page for the UI

* [Home Page](https://akinmyde.github.io/Questioner/UI/)
* [User Dashboard](https://akinmyde.github.io/Questioner/UI/user.html)
* [Admin Dashboard](https://akinmyde.github.io/Questioner/UI/admin.html)

### Features
- Create meetup: `POST https://akinmyde-questioner.herokuapp.com/api/v1/meetups`
- Get all meetup: `GET https://akinmyde-questioner.herokuapp.com/api/v1/meetups`
- Get a single meetup: `GET https://akinmyde-questioner.herokuapp.com/api/v1/meetups/<meetupId>`
- Delete a single meetup: `DELETE https://akinmyde-questioner.herokuapp.com/api/v1/meetups/<meetupId>`
- Get all upcoming meetup: `GET https://akinmyde-questioner.herokuapp.com/api/v1/meetups/upcoming`
- Create question for a meetup: `POST https://akinmyde-questioner.herokuapp.com/api/v1/questions`
- Downvote a question: `PATCH https://akinmyde-questioner.herokuapp.com/api/v1/questions/<questionId>/downvote`
- Upvote a question: `PATCH https://akinmyde-questioner.herokuapp.com/api/v1/questions/<questionId>/upvote`
- Respond to meetup rsvp: `POST https://akinmyde-questioner.herokuapp.com/api/v1/meetups/<meetupId>/rsvps`
- Add a comment to a question: `POST https://akinmyde-questioner.herokuapp.com/api/v1/questions/<questionId>/comments`
- Get all comment related to a question: `GET https://akinmyde-questioner.herokuapp.com/api/v1/questions/<questionId>/comments`
- Get a single question: `GET https://akinmyde-questioner.herokuapp.com/api/v1/questions/<questionId>`
- Sign up: `POST https://akinmyde-questioner.herokuapp.com/api/v1/auth/signup`
- Sign in: `POST https://akinmyde-questioner.herokuapp.com/api/v1/auth/login`

#### Dependencies
- Express JS: Web application framework for Node.js.
- Body-Parser: Parse incoming request bodies in a middleware before your handlers, available under the req.body property
- Babel: The compiler for writing next generation JavaScript.

#### Dev Dependencies
- Coveralls: Helps to show which part code is not covered by test suite
- Eslint: Linting utility for JavaScript
- Airbnb: Javascript style guide
- Mocha & Supertest: Testing the Web Application
- Nodemon: Utility that will monitor for any changes in your source and automatically restart your server.

### How To Contribute
- Fork the project & clone locally.
- Branch for each separate piece of work `$ git checkout -b <branch-name>`
- Do the work, write good commit messages.
- Push to your origin repository.
- Create a new PR in GitHub.
- Wait for approval.

#### Author
Akinremi Olumide J.
