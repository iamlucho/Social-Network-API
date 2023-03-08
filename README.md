# NoSQL Challenge: Social Network API
API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

## Introduction
MongoDB is a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data. The challenge is to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. It uses Express.js for routing, a MongoDB database, and the Mongoose ODM. In addition to using the Express.js and Mongoose packages, nodemon package was used to format timestamps

## User Story
```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria
```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Mock-Up
The following animations show examples of the application's API routes being tested in Insomnia.

The following animation shows GET routes to return all users and all thoughts being tested in Insomnia:
![Animation of API](./src/img/screen1.gif)

The following animation shows GET routes to return a single user and a single thought being tested in Insomnia:
![Animation of API](./src/img/screen2.gif)

The following animation shows the POST, PUT, and DELETE routes for users being tested in Insomnia:
![Animation of API](./src/img/screen3.gif)

The following animation shows the POST and DELETE routes for a user’s friend list being tested in Insomnia:
![Animation of API](./src/img/screen4.gif)

## Installation

Clone repository.

Install all dependencies:
```
npm install
```
Start the application
```
npm start
```


## Walkthrough Video

Watch video to see functionality of the social network API:

[URL](https://drive.google.com/file/d/1wM7RNiqhlGIdhQX2uV21cy3RWsSrULno/view)