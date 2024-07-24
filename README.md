## How Was This App Made?
This is a movie database built mainly on the MERN tech stack. This repository contains code for the backend; Mongoose and MongoDB were used to create and connect the individual movie objects to a database. Render was then used to host the backend API, and Netlify was used to host the full project with the back and front ends.

My role in this app's development was a fullstack developer as I developed both the front and backend of the app with no team. The app can be viewed via this link: https://myflix-hn05.netlify.app. To view more of the project, including its frontend, visit the [frontend repository](https://github.com/myFlix-client).

## What Does This App Do?
Upon opening the app, the user will be prompted to login. If the user hasn't already created an account, they may signup. Once logged in, the user will be taken to the homepage, which is a catalog of movies.

![Myflix Homepage](./img/myflix-app-screenshot.png)

The user can filter their list of movies via the genre filter and the search bar. Upon clicking the *more* button for a movie, the user will be presented with extra information regarding the movie selected.

![Myflix Movie Card](./img/myflix-card-screenshot.png)

Upon this view, the user can also choose to add the film to their favorites list or return back to the homepage. They can view their favorites list via the profile tab where they can also change their user info.

## How Do I Run This On My Local Machine
Before you begin, ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

Clone the repository:
`git clone https://github.com/henryn05/myFlix-client.git`

Navigate to the project directory:
`cd myflix-client`

Then, install the dependencies:
`npm install`

Finally, start the app:
`npm start`

To run tests:
`npm test`

Once the app is running, open your web browser and navigate to [http://localhost:1234](http://localhost:1234) to access the app.
