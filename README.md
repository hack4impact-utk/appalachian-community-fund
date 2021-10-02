# Appalachian Community Fund

## Tech Stack

**Frontend:** Next.js/React

**Backend:** Wordpress

Next.js will be used for the searching and query functionality, Wordpress will be used for data storage and for content management.

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` to start the development server
4. Navigate to [http://localhost:3000](http://localhost:3000)

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

To access the data from Wordpress, you reach out to `https://acf.apph3.com/?rest_route=/`

## Code Workflow

Create a new branch, use your Github username for your branch name. You can create a new branch with `git checkout -b [branch name]`

Be sure to commit frequently, and reference the Jira ticket in your commit message.

Once your code has been reviewed by me (Harrison), you can create a pull request for your code to be sent to the master branch.

### File Structure

`components/`: All our custom components will go here
`pages/`: Contains the routing information for our page
`pages/api/`: Contains any api calls we need to define
`public/`: Stores static files like images
`styles/`: All of our Sass will go here
`utils/`: Put stuff like context definitions and interface definitions here

## Learn More

* Next.js Tutorial: https://www.youtube.com/watch?v=A63UxsQsEbU
* Material UI Documentation: https://mui.com/getting-started/installation/
* Sass Tutorial: https://www.w3schools.com/sass/sass_intro.php
* React Hook Reference: https://reactjs.org/docs/hooks-reference.html
* NPM Tutorial: https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/
* Integrating Wordpress and React: https://snipcart.com/blog/reactjs-wordpress-rest-api-example
* Wordpress API Documentation: https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/
