# Chook

A React website for recipes and general dinner planning. "Chook" (tʃʊk) is a combination of "chef" and "cook", and also happens to be a slang term for chicken.
Considering the double O's, the name has a chance of becoming a famous internet company, according to Gwyneth Paltrow; "successful internet companies have double O's in their name".

## Usage (Windows)
1. $ `npm run build`
2. $ `npm run start`

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
4. $ `npm install`
5. Follow [Usage (Windows)](#Usage-(Windows))
6. The page should now be running on your [localhost:8080](http://localhost:8080)

## TODO

- [Done TODOs](./DONE.md)
- 
- [ ] "Launch"
- 
- [ ] Dinner planning features (save as cookies, date + id, summarize prices, nutrients, allow view of recipes in minimalist printable page, allow minimalist print(+ copy) of ingredients list) (API not needed?)
- [ ] Cookie storage information (settings, meal plans, link to more info)
- [ ] Improve user feedback
- [ ] Recipe/Ingredient source
- [ ] Setup buffer table, uploads not from mods/devs/admins go to buffer, must be approved to go into real DB. Uploads are limited to x char length, every 1 minutes?
- [ ] Test table
- [ ] Basic API
- [ ] Transfer data to API DB
- [ ] Editing DB data
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
- [ ] Internet crawler or fentch from API for recipes
- [ ] Upload: error when getting type (should say what variable not just type), temprature and temp unit should be optional, when uploading ingredient from kolonial fix names stuck at index
- [ ] Flavicon (For timer, toasts, notifications etc.)
- [ ] Expanding all panels in upload white line over footer
- [ ] Improved style for mobile (width, footer escpecially)
- [ ] Unauthorized upload recipe/ingredient error handleing, failure to upload etc

## Known issues
- Things are not looking good. Not figuratively but literally, style is not my strong suit.
- Links to subrecipes/a-tags not propperly styled, may be hard to spot

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