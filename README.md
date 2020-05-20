# Chook

A React website for recipes and general dinner planning. "Chook" (tʃʊk) is a combination of "chef" and "cook", and also happens to be a slang term for chicken.
Considering the double O's, the name has a chance of becoming a famous internet company, according to Gwyneth Paltrow; "successful internet companies have double O's in their name".

## Usage (Windows)
1. $ `npm install`
2. $ `npm start`

## Setup for Heroku
1. Login to [heroku Dashboard](https://dashboard.heroku.com/apps)
2. Create new app
3. New -> Connect app to Github project
4. Deploy -> Manual deploy -> Deploy Branch (Master)
5. Deploy -> Automatic deploys -> Enable Automatic Deploys
6. The app (if test pass and build is successful) should be available on "<app-name>.herokuapp.com"
    - It can also be opened using the "Open app" button.

## Installation (Windows)
1. Download and install:
    - NPM
    - Node.js
    - Git CLI/Github Desktop
    - Code Editor (Optinal)
2. Clone or fork Github project
3. Using a command line tool or terminal, navigate to the root folder of the project
4. Follow [Usage (Windows)](#Usage-(Windows))
5. The page should now be running on your [localhost:8080](http://localhost:8080)

## TODO
- [x] Functioning webpage
- [x] Frontpage
- [x] Header
- [x] Redux
- [x] Contrastmode
- [x] Minimal styling
- [x] Dev page
- [x] Linking to pages
- [x] Database connection
- [x] List of recipes
- [x] Page for recipe details
- [x] Search
- [x] Alert toast
- [x] Heroku
- [ ] Uploading to temp DB
- [ ] DB security
- [ ] Footer

- [ ] "Launch"

- [ ] Basic API
- [ ] Transfer data to API DB
- [ ] Editing DB data
- [ ] API Dinner planning features
- [ ] Settings
- [ ] Built in moderation tools
- [ ] Users
- [ ] Better sorting (ex alphabetical order)
- [ ] General optimization
- [ ] Timer
- [ ] Roadmap update

## Ongoing TODOs
- [ ] Find, try, and upload recipes
- [ ] Testing
- [ ] Use EM
- [ ] Style

## MISC TODOs
- [ ] Internet crawler or fentch from API for ingredients
- [ ] Internet crawler or fentch from API for recipes
- [ ] Adaptive style for mobile
- [ ] Flavicon (For timer, toasts)

## Known issues
- Things are not looking good. Not figuratively but literally, style is not my strong suit.
- White line (padding due to some elements, varies per page) visible on the bottom of the screen.

## My Thoughts
Having an interest for cooking and programming, a project like this was inevitable. The problem, however, was figuring out what to make, how to make it, when to make it, and where to do it. The conclusion was first an app, then a webpage, then an API, then a helper webpage to upload data, then back to webpage. 

I think I've come to a final conclusion that a webpage is the superior option, and that I will first make a simple one with React, then add API functions as necessary.

Special thanks to [Pexels](https://www.pexels.com) for the pictures.

![Chook logo](./src/resources/icons/chook-icon-1-bg.png)
![Frontpage without contrast mode](./docs/frontpage.png)
![Frontpage with contrast mode](./docs/frontpage-contrast.png)

-------------------------------------------------------------------------------------------------------------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).