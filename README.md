# NOTES WHILE BUILDING THIS APPLICATION

### 1. Breaking Down the Instagram-Clone UI

#### Routes
- / (feed page)
- Components:
  - FeedPost
  - FeedPostSkeleton
  - FeedSideSuggestions

- /explore (explore page)
- Components:
  - ExploreSuggestions
  - ExploreGrid

- /p/:postId (post page)
- Components:
  - Post
  - PostSkeleton
  - PostModal
  - MorePostsFromUser

- notification
- Components:
  - NotificationList
  - NotificationToolTip

- /:username (profile page)
- Components:
  - ProfileTabs

- /accounts/edit (edit profile page)

- /accounts/login (login page)

- /accounts/emailsignup (signup page)

- `*` (not found page)

#### Shared components
- Navbar
- FollowSuggestions
- FollowButton
- UserCard
- LoadingScreen
- OptionsDialog
- ProfilePicture
- Layout
- SEO


## BUILDING ACCOUNTS PAGES

### 2. Creating routes for our pages:
- In src/App.js file
  - Import: `import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';`
  - We begin by creating the individual routes that we've laid out. We're using the package react-router-dom to create the individual routes
  - There are a total of 8 routes

### 3. Building the shared Layout and Navbar components:
- We start by building out the Layout component. The Layout is going to provide the basic structure to a great deal of pages in our application
- For example, it's going to allow us to easily inject the Navbar component to many pages
- In src/components/shared/Layout.js file:
  - This component accepts the children props and we can destructure that
  - The styles written in this component is going to apply to all of its children components
  - This Layout component renders the SEO and Navbar components
- In src/components/shared/Seo.js file:
  - Import Helmet: `import Helmet from 'react-helmet';`
  - Use Helmet just like a regular react component. And we can add any meta data we want between the Helmet tags
  - We want to display the name of the page as meta information inside the browser tab
- In src/components/shared/Navbar.js file:
  - Import: `import { Link } from 'react-router-dom';`
  - Use the Link component from react-router-dom to add a link to another page
  - The Navbar component renders the Instagram logo
  - When clicking on the IG logo, it'll take you to the homepage, which is the FeedPage

### 4. Building the NotFoundPage component:
- This is the default page when a route a user is try to visit doesn't match one of the routes we defined 
- In src/pages/not-found.js file:
  - Import and render the Layout component to create the page layout and add styling
  - It has a simple Navbar header with the Instagram logo and a page-not-found message to the user with a link that takes them back to homepage

### 5. Building the LoginPage component:
- The route to LoginPage is: `/accounts/login`
- The login page doesn't have the Navbar
- The login form comprises of 
  - the text fields for Username and Password the user needs to provide in order to login
  - or login with Facebook
  - or if a user doesn't have an account, a Link that takes them to the SignUpPage. The Link path is `/accounts/emailsignup`
- In src/pages/login.js file:
  - Import and render the SEO component so we can see the page title in the browser tab
  - Create and name export a LoginWithFacebook component that renders a Log In With Facebook button
    - Import the blue and white facebook icons
    - Display the faceBookIcon color could either in white or blue
  - Render the LoginWithFacebook component inside the form element

### 6. Building the SignUpPage component:
- The route to LoginPage is: `/accounts/emailsignup`
- The signup page doesn't have the Navbar
- In src/pages/signup.js file:
  - The signup form is very similar to the login form. We can copy and paste as a starter code and make changes accordingly
  - The signup form comprises of
    - user can signup with their Facebook account
    - or filling out the provided text fields
    - if they already have an IG account, add a Link that takes user to the LoginPage. The Link path is `/accounts/login`




## NPM PACKAGES USED
- react-router-dom
  - Allows us to create routes for our pages
  - Use the Link component to link to another page
- react-helmet
  - Enables us to change meta information