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


## MAKING FEED PAGE
- The FeedPage is made visible when a user is logged in and it lives at the root path of our application. The route to FeedPage is: `/`
- The FeedPage comprises of 
  - the Navbar at the top
  - on the left of the page is a list of feed posts for this user and within it is a list of suggested users to follow
  - fixed to the right hand side is the sidebar which has some information about the authenticated user and below that is a list of suggested users to follow

### 7. Building the FeedPage component:
- In src/pages/feed.js file:
  - Import and render the Layout component. This will provide the page structure and render the Navbar and SEO components
  - Now we will create more structure to the FeedPage
  - On the left side of the page contains a list of FeedPost. For now, we'll generate an array of dummy feed posts as a placeholder
  - On the right side is the sidebar which contains the UserCard component and beneath that is the FeedSideSuggestions component
  - Import and render the FeedPost, UserCard, and FeedSideSuggestions components
  - At large-size screen we see the list FeedPost on the left and the sidebar on the right. At a small-size screen we want to hide the sidebar. To do this, Material UI has a Hidden component we can use

### 8. Building the FeedPost component:
- The FeedPost component is rendered by the FeedPage parent component
- The FeedPost component comprises of 3 parts:
  - The post header which has the UserCard and MoreIcon components
  - The post media/image
  - The post footer, which contains
    - the like, comment, share, and save icon buttons
    - the number of likes
    - a list of collapsed-version of comment captions. When clicking on the MoreButton the comment caption will expand
    - the View all x comments link
    - the date when this post was created
    - the comment section
- In src/components/feed/FeedPost.js file:
  - The FeedPost component receives the post object as props from FeedPage parent component. Destructure the properties of post props
  - Write the LikeButton, SaveButton, and Comment components and render static texts for each for now

### 9. Building the UserCard component:
- The UserCard component receives the user object as props from the FeedPost parent component
- Render the user's profile_image, username, and name
- This component will be used in many places in our application. So the `username` is a link that redirects to that particular user's profile page

### 10. Implement the LikeButton, SaveButton, and Comment functionalities:
- Let's enable a user to like a post, save a post, and be able to comment on a post
- The LikeButton, SaveButton, and Comment components are rendered in the FeedPost component
- In src/components/feed/FeedPost.js file:
  - The LikeButton component:
    - We want to be able to toggle the like button of a post
    - Create a piece of liked state that keeps track of like and not like. Initialize it to false, not like
    - The onClick event handler executes handleLike or handleUnlike, depending on the liked state
    - Show the red like icon when a user likes the post and show the white like icon when a user unlikes the post
  - The SaveButton component:
    - The save button behaves very similar to the like button
    - We want to show the fill-black save icon if the post has been saved and show the fill-white save icon if the post hasn't been saved
  - The Comment component:
    - The comment text input field allows a user to post a comment on a post
    - The Post button is disabled if there's no content provided
    - Create a content state that keeps track of the content the user enters in the text input field


## COMMON DESIGN PATTERNS AND JS TRICKS
#### 1. Generate an array of dummy data, map over it and display each item
  ```js
  function getDefaultPost() {
    return {
      id: uuid(),
      likes: 10,
      caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React?</span>`,
      user: defaultUser,
      media:
        "https://scontent-ort2-2.cdninstagram.com/v/t51.2885-15/",
      comments: [],
      created_at: "2020-02-28T03:08:14.522421+00:00"
    };
  }

  <div>
    {Array.from({ length: 5 }, () => getDefaultPost()).map(post => (
      <FeedPost key={post.id} post={post} />
    ))}
  </div>
  ```

## NPM PACKAGES USED
- react-router-dom
  - Allows us to create routes for our pages
  - Use the Link component to link to another page
- react-helmet
  - Enables us to change meta information
- react-lines-ellipsis
  - Import: `import HTMLEllipsis from 'react-lines-ellipsis/lib/html';`
  - Allows us to collapse long lines of text, such as the comment captions