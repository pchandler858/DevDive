# DevDive

## Description

Writing about tech is just as important as creating it. This project focuses on building a CMS-style blog site where developers can publish their blog posts and interact with other developers through comments. The site follows the MVC paradigm, utilizing Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication. The application allows users to sign up, log in, create blog posts, comment on posts, and perform various other actions.

## User Story

As a developer who writes about tech, I want a CMS-style blog site so that I can publish articles, blog posts, and my thoughts and opinions.

## Acceptance Criteria

- When visiting the site for the first time, the user is presented with the homepage, which includes existing blog posts (if any have been posted), navigation links for the homepage and the dashboard, and the option to log in.
- Clicking on the homepage option takes the user to the homepage.
- Clicking on any other links in the navigation prompts the user to sign up or sign in.
- Choosing to sign up prompts the user to create a username and password.
- Clicking on the sign-up button saves the user credentials and logs the user into the site.
- Revisiting the site and choosing to sign in prompts the user to enter their username and password.
- When signed in to the site, the user sees navigation links for the homepage, the dashboard, and the option to log out.
- Clicking on the homepage option in the navigation takes the user to the homepage, where existing blog posts (including post title and date created) are displayed.
- Clicking on an existing blog post displays the post title, contents, post creator’s username, and date created, and provides the option to leave a comment.
- Entering a comment and clicking on the submit button (while signed in) saves the comment and updates the post to display the comment, comment creator’s username, and date created.
- Clicking on the dashboard option in the navigation takes the user to the dashboard, where any blog posts they have already created are displayed, and provides the option to add a new blog post.
- Clicking on the button to add a new blog post prompts the user to enter a title and contents for the blog post.
- Clicking on the button to create a new blog post saves the title and contents of the post, and takes the user back to an updated dashboard with the new blog post.
- Clicking on one of the user's existing posts in the dashboard allows them to delete or update the post, and takes them back to an updated dashboard.
- Clicking on the logout option in the navigation signs the user out of the site.
- If the user is idle on the site for more than a set time, they can still view posts and comments, but are prompted to log in again before they can add, update, or delete posts.

## Installation

To install and run the project locally, follow these steps:

1. Clone the GitHub repository: [repository URL]
2. Install the necessary dependencies by running the command: `npm install`
3. Set up the database configuration by creating a `.env` file and adding the required environment variables.
4. Run the application using the command: `npm start`

## Technologies Used

The project utilizes the following technologies:

- Express.js
- Handlebars.js
- Sequelize ORM
- MySQL2
- dotenv
- bcrypt
- express-session
- connect-session-sequelize

## Deployment

The application is deployed on Heroku and can be accessed at [
