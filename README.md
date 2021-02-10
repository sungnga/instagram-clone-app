# NOTES WHILE BUILDING THIS WEB APP

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

### 10. Implementing the LikeButton, SaveButton, and Comment functionalities:
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

### 11. Building the FeedSideSuggestions component:
- The FeedSideSuggestions component is at the sidebar on the FeedPage component
- It consists of:
  - a list of user suggestions with their profile image, username, and name
  - a Follow or Following button that an authenticated user can toggle between on a list of suggested users
- In src/components/feed/FeedSideSuggestions.js file:
  - Import and render the UserCard and FollowButton components
  - We're going to use an array of getDefaultUser as dummy data. Map over the array and display each user with the UserCard and FollowButton components
  - For the UserCard component, pass down as user props the user element
  - For the FollowButton component, pass down a side props
    - The FollowButton can either displayed as Follow in blue text or Follow in blue background
    - For the sidebar user suggestions, we want to display the Follow button in blue text, hence we pass down the side props set to true
- In src/components/shared/FollowButton.js file:
  - This component enables an authenticated user to toggle between the Follow and Following button of a suggested user
  - This component receives side props from FeedSideSuggestions parent component
  - Create an isFollowing state to keep track of whether the authenticated user is following a suggested user or not. Initialize it to false
  - The FollowButton component displays either a Follow or Following button depending on the isFollowing state
    - If isFollowing state is true, the followingButton is displayed
    - If isFollowing state is false, the followButton is displayed

### 12. Creating Instagram-logo loading screen and loading icons:
- When we're fetching and loading posts data for the FeedPage, we see a brief loading screen with the Instagram logo on it
- We also want to show the loading icon (loading spinner) when we're fetching suggested users on the sidebar of the FeedPage
- The feed posts is an infinite scroll and when we reach the bottom of the posts, we want to show the loading icon indicating that more posts are being fetched
- In src/components/shared/LoadingScreen.js file:
  - Import and render the LogoLoadingIcon. The loading icon is a component
- In src/pages/feed.js file:
  - Import the LoadingScreen component
  - Write an if statement that if loading is true, return and render the LoadingScreen component
- In src/components/feed/FeedSideSuggestions.js file:
  - Import the LoadingIcon component
  - Write a ternary that if loading is true, render the LoadingIcon component. Else, render the list of suggested users
- In src/pages/feed.js file:
  - Import the LoadingLargeIcon component
  - Create an isEndOfFeed state and initialize it to false
  - Write a conditional that if NOT isEndOfFeed, then render the LoadingLargeIcon component

## IMPROVING NAVBAR
- Next step is we want to build out the Navbar component. Right now we just have an Instagram logo on it
- We want to build out the search bar feature and 4 icons on the right that enable us to go to different routes and links
- When screen size is xs or below, we want to hide the Search bar and the AddIcon
- If a user is not authenticated, we want to show the minimalNavbar which hides the Search and the Links components
- We want to show a tooltip underneath the Search bar showing results based on what a user is querying
- We also want to show a tooltip underneath the LikeIcon notification of how many likes they have on a given post or how many new followers
- Lastly, we want to create a progress bar at the top of the Navbar that animates whenever our path/route changes

### 13. More building on the Navbar component:
- In src/components/shared/Navbar.js file:
  - The Navbar component renders the Logo, Search, and Links components
  - These 3 components are created in the Navbar.js file as they are used only in the Navbar component
  - The Search component:
    - The Search bar will be hidden on xs-screen size
    - Write a query state that keeps track of the user input from Search bar. Initialize it to an empty string
    - After the input is submitted, clear the content in query state
    - Also, when loading is true, render the LoadingIcon component
  - The Links component:
    - The Links come in two form: in active and regular icons
    - We want to show the active icon when the current route path the user is on matches the Link path set for that icon. For example, if a user is on the explore route we want to display the ExploreActiveIcon
    - We can use the `useHistory` hook from react-router-dom to help us get the current path
      ```js
      import { Link, useHistory } from 'react-router-dom';

      const history = useHistory();
      const path = history.location.pathname;
      ```

### 14. Showing tooltips for Search bar:
- We want to show a tooltip underneath the Search bar when a user starts typing something in the Search bar and we can show suggested search results
- The search results are a list of users of their profile image, username and name
- When clicking on one of the results, it'll redirect to that user's profile page and clear out the search input field
- In src/components/shared/Navbar.js file and in Search component:
  - Create a results state that keeps track of search results. Initialize it to an empty array
  - Eventually, if there is results, we want to list the results items in the search tooltip underneath the Search bar and a user can click on the item and will take them to that user's page
  - Use useEffect() hook to run the effect function whenever the query state changes. In the effect function,
    - write an if statement that if there's no content in query state, return early
    - then call setResults() method to set the results array with defaultUsers from our data.js file for now. The defaultUser object contains the usual properties of id, username, name, and profile_image
  - Create a hasResults variable that hold a true or false value if the query state is true (meaning, there's content in query state) AND the results array is greater than 0 (meaning, there exists at least one item in result)
  - In the return section, import and render the WhiteTooltip component by wrapping it around the InputBase component. Then in this component, if hasResults is true, map over the results array and render each result item in a Grid of their profile_image, username, and name
  - Also make each result item, when clicked, will redirect a user to that result user's profile page. The history object from useHistory hook has a `history.push()` method that we can use to redirect to a route
  - Once the redirect is successful we want to call the handleClearInput method to clear the input from Search bar

### 15. Showing tooltips for notifications:
- When there's a new notification available, a user can hover over the notification icon (the LikeIcon) and will see a dropdown RedTooltip showing a number of new likes and a number of new followers
- When clicking on the LikeIcon, a NotificationList is displayed. The NotificationList shows a list of various users who either liked a post or started following the account
- In src/components/shared/Navbar.js file and in Links component:
  - Import and render the RedTooltip by wrapping it around the LikeIcon component
  - Create a showTooltip state that keeps track whether the RedTooltip is shown or not. Initialize it to false
  - The RedTooltip component renders the NotificationTooltip component when the showTooltip state is true
  - Write a handleHideTooltip function that sets the tooltip state to false. This will hide the tooltip
  - Write a handleHideList function that sets the showList state to false. When a use clicks on the LikeIcon again or anywhere else on the place while the NotificationList is open, it will hide it
  - In the return section, if showList is true, then render the NotificationList component. Pass down the handleHideList function as props
- In src/components/notification/NotificationTooltip.js file:
  - This component renders a red tooltip of a number of new followers with a user icon and a number of new likes with a heart icon
- In src/components/notification/NotificationList.js file:
  - Receive the handleHideList props from the Navbar parent component
  - For now, we're going to import the defaultNotifications from data.js file to render a list of notifications in the NotificationList
  - This list displays either a user who liked a post with their user info, how long ago they liked the post, and the on the right side is an avatar size of the post image or a user who just followed the account and how long ago and next to the follower user info is the FollowButton that enables the account owner to follow them back
  - If clicking on the avatar post image, it'll redirect to the post page
  - If clicking on the notification user's username, it'll redirect to the user's profile page

### 16. Animating the progress bar when route changes:
- We'll be using the package @tanem/react-nprogress to build the progress bar
- We want to animate the progress bar when our application transitions to another route
- In src/components/shared/Navbar.js file and in Navbar component:
  - We already have the the `path` property from history object that tells the path we are on
  - Use useEffect hook to run the effect function whenever the `path` changes
  - Create a piece of state called isLoadingPage to keep track of when our page is started loading and when it finished loading. Initialize it to true
  - When a page is first loaded and the component life cycle first mounts, isLoadingPage state is set to true. And when the component has mounted and when the loading process is completed, the effect function runs and set the isLoadingPage state to false
  - It's while the isLoadingPage state is true is when the progress bar is animating
  - At the top of the return section of the Navbar component, render the `<Progress />` component and pass down the isLoadingPage value to a props called isAnimating
  - Then down at the bottom of the Navbar page, write a Progress functional component:
    - It receives isAnimating as props from the Navbar parent component
    - Use the useNavbarStyles() hook to style the component
    - The way we're going to show the progress bar is with the help of a package called react-nprogress
    - Import: `import { useNProgress } from '@tanem/react-nprogress';`
    - Call the useNProgress() hook and pass in the isAnimating property. And what we get back from it are 3 values: animationDuration, isFinished, progress
    - Use these 3 values to render the progress bar

## POST AND EXPLORE PAGES
- In the FeedPost list, we want to show a card carousel of a list of suggested users that the account user can follow
- For each post there's a More button at the top right corner. When clicking on it, the OptionsDialog opens showing options for the post. Implement this More button functionality

### 17. Displaying FollowSuggestions in FeedPost list:
- We want to display a card view within the FeedPost list of a list of suggested followers to our account owner to follow. There's a left and right arrow to scroll through the list of suggested followers
- This suggested card will be provided on the 3rd card on the FeedPost list
- In src/pages/feed.js file and in FeedPage component:
  - To figure the index of a FeedPost we want to get the index when we're mapping over the array of post
  - Then pass down the index as props to the FeedPost child component
- In src/components/feed/FeedPost.js file and in FeedPost component:
  - Receive the index props from the
  - Create a 2nd index and save it to a variable showFollowSuggestions
  - Then in the return section, write a conditional that only if showFollowSuggestions is true, then import and render the FollowSuggestions component. This will render the FollowSuggestions component after the 2nd index of post
- In src/components/shared/FollowSuggestions.js file:
  - In FollowSuggestions component:
    - Render the follow suggestions card
    - We're going to use the react-slick package to render the scroll carousel. The react-slick gives us the Slider component that we can use to render the carousel
    - Import:
      ```js
      import Slider from 'react-slick';
      import 'slick-carousel/slick/slick.css';
      import 'slick-carousel/slick/slick-theme.css';
      ```
    - Create a loading variable and initialize it to false
    - In the return section, if loading is true, import and render the `<LoadingLargeIcon />` component. Else, render the `<Slider />`
    - In the `<Slider />` component, map over the defaultUser array from data.js file for now. And for each user element, render it in the FollowSuggestionsItem component. Pass down the user object as props to the FollowSuggestionsItem child component
  - Write a FollowSuggestionsItem component that renders each individual suggested follower in a card:
    - Show their profile_image, username, and name
    - Lastly, import and render the `<FollowButton />` component. Set the side props to the value of false. This will render the Follow button with blue color background

### 18. Implementing the More button functionality:
- When clicking on the More button for a given post, we see an options dialog of what we can do with the post
- The OptionsDialog is a shared component
- In src/components/feed/FeedPost.js file and in FeedPost component:
  - Import the OptionsDialog component
  - Create a piece of state called showOptionsDialog to toggle between showing and hiding the options dialog box. Initialize to false
  - In the `<MoreIcon />` component, add an onClick event handler and execute a callback to set the showOptionsDialog state to true
  - At the bottom of return section, write a conditional that only if showOptionsDialog state is true, then render the `<OptionsDialog />` component
  - In the OptionsDialog component, pass down the onClose as props. And the value for this props is a callback function that calls the setOptionsDialog() method to set the showOptionsDialog state to false
- In src/components/shared/OptionsDialog.js file:
  - Accept the onClose props from the FeedPost parent component
  - Use the Material UI `<Dialog />` component to render the dialog box
  - The option buttons in the Dialog are: Unfollow, Go to post, Share to..., Copy Link, and Cancel
  - For Cancel, add an onClick event handler and set it to onClose

### 19. Building the explore page:
- The route for the explore page is `/explore`
- The explore page consists of 2 sections:
  - the Discover People section, which has a carousel with a list of suggested followers
  - the Explore section, which has a grid of suggested posts. When mouse-over a post it'll show the number of likes and comments
- **Building the ExplorePage component:**
  - In src/pages/explore.js file:
    - Import and render the Layout component
    - Then inside the Layout component, import and render both the ExploreSuggestions and ExploreGrid components
- **Building the ExploreSuggestions component:**
  - In src/components/explore/ExploreSuggestions.js file:
    - When the screen size is xs or smaller, the ExploreSuggestions will be hidden. Use the Material UI `<Hidden />` component and specify `xsDown` and wrap all the content inside this Hidden component
    - Since we've already built the FollowSuggestions component we can just import and render it here
- **Building the ExploreGrid component:**
  - In src/components/explore/ExploreGrid.js file:
    - If loading is true, import and render the LoadingLargeIcon component
    - Else, map over the defaultPost array from our data.js file for now. And for each post element, render it in the `<GridPost />` component. Pass down the post object as post props
- **Building the GridPost component:**
  - In src/components/shared/GridPost.js file:
    - Accept the post props from the ExploreGrid parent component
    - Render the post images in a grid
    - There's an overlay over each post image and it displays the number of likes and comments

### 20. Setting up Route for PostModal component:
- When we're on the explore page and click on one of the individual posts, a modal of the post pops up showing the details of the post
- A thing to note is, when the PostModal is open, the route changes from `/explore` to `/p/:postId`
  - And when closing the PostModal or clicking anywhere outside the modal will close the modal, it will take us back to the `/explore` explore page route
  - Furthermore, while the PostModal is open and if we refresh the page, it will take us to the Post page `/p/:postId`
- We will need to make use of the history object from useHistory hook from react-router-dom to keep track of our path we're on and setup the Route property
- We will need to modify our current Router setup a little bit
- In src/App.js file:
  - Remove and move the BrowserRouter import from App.js file to src/index.js file
    - `import { BrowserRouter as Router } from 'react-router-dom';`
  - Remove the `<Router />` component from App.js file
- In src/index.js file:
  - Import the BrowserRouter: `import { BrowserRouter as Router } from 'react-router-dom';`
  - Then wrap the `<Router />` component around the `<App />` component
- The final setup in App.js file:
  ```js
  import React, { Fragment, useEffect, useRef } from 'react';
  import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
  import FeedPage from './pages/feed';
  import ExplorePage from './pages/explore';
  import ProfilePage from './pages/profile';
  import PostPage from './pages/post';
  import EditProfilePage from './pages/edit-profile';
  import LoginPage from './pages/login';
  import SignUpPage from './pages/signup';
  import NotFoundPage from './pages/not-found';
  import PostModal from './components/post/PostModal';

  function App() {
  	const history = useHistory();
  	const location = useLocation();
  	// console.log(history, location)
  	// Keeps track of the previous location we've visited
  	const prevLocation = useRef(location);
  	// Get modal property from location.state, if it exists
  	const modal = location.state?.modal;

  	useEffect(() => {
  		if (history.action !== 'POP' && !modal) {
  			prevLocation.current = location;
  		}
  	}, [location, modal, history.action]);

  	// If modal is true and we move to a different route
  	const isModalOpen = modal && prevLocation.current !== location;

  	return (
  		<Fragment>
  			<Switch location={isModalOpen ? prevLocation.current : location}>
  				<Route path='/' exact component={FeedPage} />
  				<Route path='/explore' component={ExplorePage} />
  				<Route path='/:username' exact component={ProfilePage} />
  				<Route path='/p/:postId' exact component={PostPage} />
  				<Route path='/accounts/edit' component={EditProfilePage} />
  				<Route path='/accounts/login' component={LoginPage} />
  				<Route path='/accounts/emailsignup' component={SignUpPage} />
  				<Route path='*' component={NotFoundPage} />
  			</Switch>
  			{isModalOpen && <Route exact path='/p/:postId' component={PostModal} />}
  		</Fragment>
  	);
  }

  export default App;
  ```
- Setup in src/components/shared/GridPost.js file:
  - The GridPost component is rendered in ExploreGrid component
  - When clicking on a post from the explore page, the PostModal is open and the route changes to `/p/${post.id}` and we add the modal property to location.state
  ```js
  import { useHistory } from 'react-router-dom';

  function GridPost({ post }) {
  	const history = useHistory();

  	function handleOpenPostModal() {
  		history.push({
  			pathname: `/p/${post.id}`,
  			state: {
  				modal: true
  			}
  		});
  	}

  	return (
  		<div onClick={handleOpenPostModal} className={classes.gridPostContainer}>
  			// rest of the code...
  		</div>
  	);
  }
  ```

### 21. Building the PostModal component:
- We will be using the react-modal package to help us build the PostModal component
- In src/components/post/PostModal.js file:
  - Import the Modal component from react-modal
  - Import useHistory and useParams hooks from react-router-dom
  - Call the useHistory hook to get the history object
  - Call the useParams hook to get the params of a given route. It returns an object back
    - The route and the params that we declared for our PostModal component is `/p/:postId`
    - So the object returned from useParams contains the postId property and we can destructure that: `const { postId } = useParams();`
  - Render the Modal component:
    - Set the Modal to isOpen
    - Add an overlay and style the overlay
    - onRequestClose, execute a callback and run the `history.goBack()` method to go back. And in our case, it's the `/explore` route
    - Add style to the Modal
  - Inside the Modal component, import and render the Post component. Pass down the id props and set its value to postId: `<Post id={postId} />`
  - Outside of and below the Modal component, import and render the CloseIcon component inside a div tag. Add an onClick event handler that will execute the `history.goBack()` method when the CloseIcon is clicked on

### 22. Building the Post component:
- In src/components/post/Post.js file:
  - The Post component contains very similar content as the FeedPost component. So we can use that as a starter code
  - For now, we're going to display the defaultPost coming from our data.js file. Name import the defaultPost object

### 23. Building the post page:
- The route to the post page is: `/p/:postId`
- The post page consists of:
  - the Post component itself
  - and underneath that are 6 more posts from that user in a post grid format
  - the displayed username of that user is a link that redirect to their profile page
- **Building the PostPage component:**
  - In src/pages/post.js file
    - Import the Layout, Post, and MorePostsFromUser components
    - Import useParams hook from react-router-dom
    - Call the useParams() hook and destructure the postId property from the returned object: `const { postId } = useParams();`
    - First, render the Layout component
    - Then inside the Layout component, render the Post and MorePostsFromUser components
    - For the Post component, pass down the id props and set its value to postId
- **Building the MorePostsFromUser component:**
  - In src/components/post/MorePostsFromUser.js file:
    - The layout, structure, and content we're building in this component is very similar to the ExploreGrid component. So we can use that as a starter code
    - For now, we're going to use the defaultPost and defaultUser from our data.js file. Name import both objects
    - In the Typography component, render the text: More posts from @username
    - Make the @username as a link that redirect to their profile page. Use the Link component from react-router-dom
    - And we'll display 6 posts instead of 20 here


## LOADING SKELETONS AND PROFILE PAGE

### 24. Lazy loading on FeedPost component:
- React has a feature called lazy loading to lazily load our components only when we need them. For example, we load the feed components only when we're on the feed route
- Lazy loading is a 2-step process:
  - Use a different syntax pattern for importing the component that we want to lazily load
    - IMPORTANT!: This import needs to be at the very bottom of the import list. Else, we'll get an error
  - Since it takes sometime to lazily load a component, we can wrap the component inside a `<React.Suspense />` component and provide a fallback (such as skeleton component) while the component is loading
- In src/pages/feed.js file:
  ```js
  // import FeedPost from '../components/feed/FeedPost';
  const FeedPost = React.lazy(() => import('../components/feed/FeedPost'));

  // <FeedPost key={post.id} index={index} post={post} />
  <React.Suspense key={post.id} fallback={<>loading...</>}>
  	<FeedPost index={index} post={post} />
  </React.Suspense>;
  ```

### 25. Building the FeedPostSkeleton and PostSkeleton components:
- **Building the FeedPostSkeleton component:**
  - In src/components/feed/FeedPostSkeleton.js file:
    - Render the shimmer FeedPost skeleton and style using useFeedPostSkeletonStyle() hook
  - In src/pages/feed.js file:
    - Import the FeedPostSkeleton component
    - Where we provide a value for `fallback` props, render the FeedPostSkeleton component there: `<React.Suspense key={post.id} fallback={<FeedPostSkeleton />}>`
- **Building the PostSkeleton component:**
  - In src/components/post/PostSkeleton.js file:
    - Render the shimmer Post skeleton
    - If the screen size is larger than 900px, we want to split the container into 2 columns of 600px and 335px
  - In src/components/post/Post.js file:
    - Import the PostSkeleton component
    - Create a loading state and initialize it to true
    - Write an if statement that if loading state is true, return and render the PostSkeleton component
    - To simulate a loading state, use setTimeout() and set the loading state to false after 2 seconds

### 26. Building the profile page:
- The route to profile page is: `/:username`
- **Building the ProfilePage component:**
  - In src/pages/profile.js file:
    - Import the Layout and ProfilePicture components
    - Import the defaultCurrentUser object from data.js
    - For now, we're going to use the defaultCurrentUser object to display our user info
    - In the browser tab info, we want to display the user's name and their username handle
    - Render the Layout component and provide the title props of the defaultCurrentUser's name and @username
    - Inside the Layout component, render the ProfilePicture, ProfileNameSection, PostCountSection, and NameBioSection components inside a div container
    - At the bottom of the page, create the ProfileNameSection, PostCountSection, and the NameBioSection components. And render simple text as placeholder for now

### 27. Building the profile header:
- The profile header section consists of:
  - a ProfilePicture on left column. The profile image is smaller when screen-size is below small
  - a ProfileNameSection that has the user's username, an Edit Profile button and a Gear icon (if they're the owner of the profile)
    - When clicking on the Gear icon, an OptionsMenu dialog opens to display different options
  - a PostCountSection that has the count of number of posts, followers, and following for a given account
  - a NameBioSection that has the user's name, bio description, and link to their website
  - On small screen size and below, the PostCountSection shifts below the NameBioSection
- **Building the ProfilePicture component:**
  - In src/pages/profile.js file:
    - Create an isOwner variable and set it to true
    - Pass down the isOwner value as isOwner props to both of the `<ProfilePicture />` child components in xsDown and smUp cards
    - Also pass down a size props and set it to 77 pixels to the ProfilePicture child component in smUp card. When the screen-size is smaller than small, display a smaller profile picture
  - In src/components/shared/ProfilePicture.js file:
    - This component receives size, image, and isOwner as props
    - Then pass down the size and isOwner properties to the useProfilePictureStyles() hook
    - For now, we're going to set a default image to the image property
    - Then in the return section, write a conditional that checks to see if there's an image provided to the image property. If there is, render that image. If there isn't, render a generic Material UI person icon
- **Building the ProfileNameSection component:**
  - In src/pages/profile.js file:
  - In ProfilePage component:
    - Pass down the defaultCurrentUser object as user props and the isOwner value as isOwner props to the `<ProfileNameSection />` child component. Do this for both cardLarge and CardSmall cards
    - Create a piece of state called showOptionsMenu and initialize it to false. This state keeps track of whether we show the gear icon to view the options menu dialog
    - Write a handleOptionsMenuClick function that calls setOptionsMenu() to set the showOptionsMenu state to true 
    - Then pass down the handleOptionsMenuClick function as handleOptionsMenuClick props to the `<ProfileNameSection />` child component. Do this for both cardLarge and CardSmall cards
  - In ProfileNameSection component:
    - Receive and destructure the user, isOwner, and handleOptionsMenuClick props
    - The next thing is whether we should show
      - the Edit Profile button, if this profile belongs to the current user
      - or a Following button, if the owner of this profile is following the current user
      - or a Follow Back button, if the owner of this profile is following the current user and the current user wants to follow this profile back
      - or a Follow button, if the current user wants to follow this profile
    - In the return section, write a conditional to check if isOwner is true
      - If it is, render the Edit Profile button and the Gear icon. Make the Edit Profile button link to the `/accounts/edit` page
      - If not, render one of the three follow buttons mentioned above. And hide the Edit Profile button and Gear icon
- **Building the OptionsMenu dialog component:**
  - In src/pages/profile.js file:
  - In the ProfilePage component:
    - The showOptionsMenu state is initialized to false, which means that when the profile page first loaded, the OptionsMenu component isn't triggered and the options menu dialog won't be open
    - Write a handleCloseMenu function that calls the setOptionsMenu() to set the showOptionsMenu state back to false
    - Then at the bottom of the return section, write a conditional that only if showOptionsMenu state is true, then render the `<OptionsMenu />` component and pass down to it the handleCloseMenu function as handleCloseMenu props
    - At the bottom of the file write a OptionsMenu component
  - In the OptionsMenu component:
    - Accept the handleCloseMenu props from the ProfilePage parent component
    - Use the Material UI Dialog component to render the dialog box
    - There are 7 options items in the OptionsMenu
      - Write a separate OptionsItem component that renders each item as a button and a divider underneath it and with the specified text and any onClick event handler provided by the OptionsMenu parent component
      - Then render 7 OptionsItem components, each pass down a value for text props and for the last two components, pass down an onClick props
    - Second to last on the OptionsMenu is a Logout button. When this button is clicked we want to display a dialog box that says Logout and a message of "You need to log back in to continue using Instagram"
    - Write a piece of showLogOutMessage state that keeps track whether the Logout message is shown or not. Initialize it to false
    - Write a handleLogOutClick function that calls the setLogOutMessage() to set the showLogOutMessage state to true
    - Pass down this handleLogOutClick function as onClick props along with the text props of Logout to a `<OptionsItem />` child component
    - The last item in the OptionsMenu dialog is the Cancel button. When this button is clicked the dialog is closed
    - The OptionsMenu component receives the handleCloseMenu function as props from the ProfilePage parent component. This handleCloseMenu function sets the showOptionsMenu state to false and therefore closes the OptionsMenu dialog
    - We can pass down this handleCloseMenu function as onClick props to a `<OptionsItem />` child component with the text props of Cancel
- **Displaying the Unfollow dialog:**
  - When a user is following another profile user, it will show the Following button on that profile page. When a user decides to unfollow they can tap on the Following button again and a confirmation dialog box pops up asking to Unfollow or Cancel the request
  - In src/pages/profile.js file:
  - In the ProfileNameSection component:
    - Write a piece of state called showUnfollowDialog and initialize it to false
    - In the Following button element, add an onClick event handler that executes the setUnfollowDialog() to set the showUnfollowDialog state to true
    - Then at the bottom of the return section, write a conditional that only if showUnfollowDialog is true, then render the `<UnfollowDialog />` component and pass down the onClose and user props. The onClose is a callback function that simply executes the setUnfollowDialog() to set the showUnfollowDialog state to false
  - Write an UnfollowDialog component that displays an unfollow dialog box
  - In the UnfollowDialog component:
    - Accept the onClose and user props from the ProfileNameSection parent component
    - Use the Material UI Dialog component to render the dialog box
    - In the Dialog component, render the user's profile_image, a question to unfollow this particular user, an Unfollow button, and a Cancel button
    - For the Cancel button element, add an onClick event handler that pass in the onClose function
- **Building the PostCountSection component:**
  - In the post count section, we want to include the number of posts, number of followers, and number of following
  - In the ProfilePage component:
    - Pass down the defaultCurrentUser as user props to the PostCountSection and NameBioSection child components
  - In the PostCountSection component:
    - Receive the user props from the ProfilePage parent component
    - This user object contains the posts, followers, and following properties and each one is an array
    - Create an array containing the "posts", "followers", and "following" element and assign it to options variable
    - Then in the return section, map over the options array and for each option element, target that option property in the user object and chain on `.length` to get the total number in that option array
    - When screen size is small and below, these 3 items shift below the NameBioSection and dividers are added above and below them. And the texts are muted to grey tone
- **Building the NameBioSection component:**
  - In the NameBioSection component:
    - Receive the user props from the ProfilePage parent component
    - This section renders the user's name, bio, and website each on separate line
    - The website is optional but it's an anchor tag that takes you to their website

### 28. Building the profile tabs section:
- The profile tabs consists of these following tabs: Post, IGTV, Saved, and Tagged
- When the screen size is small and below:
  - the tab text goes away
  - only shows the tab large icons
  - the tab indicator goes away and instead, the current tab is highlighted in blue color
- Only display the Saved tab if isOwner is true, meaning, this profile belongs to the current login user
- In src/pages/profile.js file and in ProfilePage component:
  - Import the ProfileTabs component
  - At the bottom of the return section, render the ProfileTabs component and pass down the defaultCurrentUser object and isOwner value as user and isOwner props
- In src/components/profile/ProfileTabs.js file:
  - Receive the user and isOwner props from the ProfilePage parent component
  - Use the Tabs component from Material UI to build our tabs
  - The Tabs component comes with a value that we can use to control its state
  - Create a piece of state called value and initialize it to 0
  - When rendering the Tabs component:
    - set the value property to value state
    - add an onChange event handler that executes a callback. The callback receives a value as a 2nd parameter and it executes the setValue() to set the value state to this value param
  - The Tabs component renders individual Tab components
    - Use the Tab component from Material UI to render the individual tabs
    - for both small and large screen sizes, write a conditional that only if isOwner is true, then render the Saved tab

### 29. Displaying the related content in profile tabs:
- We want to display related content for each tab in profile page. For example, for the Posts tab, we want to display the posts the user posted in a grid layout. For the Saved tab, we want to display all the posts the user has saved
- The ProfilePosts component will display the user's posts in the Posts tab. The user's post is found in user.posts property. We can map over the user.posts array and render each post in GridPost component. If there aren't any posts, we'll display a no-content section element
- The SavedPosts component will display the posts that the user has saved in the Saved tab. If there aren't any saved posts, we'll display a no-content section element
- In src/components/profile/ProfileTabs.js file:
  - Import the GridPost component
  - In ProfileTabs component:
    - At the bottom of section tag, write a conditional that if value is equal to 0, then render the `<ProfilePosts />` component and pass down user and isOwner as props
    - Right after that, write a conditional that if value is equal to 1, then render the `<SavedPosts />` component and pass down user as props
  - At the bottom of the page, create two local functional components called ProfilePosts and SavedPosts
- **Building the ProfilePosts component:**
  - In ProfilePosts component:
    - Receive the user and isOwner props from the ProfileTabs parent component
    - Use useProfileTabsStyles() hook to style the component
    - Before mapping over the user.posts array, write an if statement to check if there is any posts in the user.posts array at all. If there's no content (user.posts.length === 0) and isOwner is true, then return and display a text that says "Upload a Photo". If isOwner is false, display a text that says "No Photos"
    - In the return section, map over the user.posts array and render each post in a `<PostGrid />` component. Pass down to it the key and post props
- **Building the SavedPosts component:**
  - In SavedPosts component:
    - Receive the user props from the ProfileTabs parent component
    - Use useProfileTabsStyles() hook to style the component
    - We don't have any saved posts right now, so we will display a no-content section


## EDIT PROFILE PAGE

### 30. Building the edit profile page:
- The edit account route is: `/accounts/edit`
- Once a user is logged in to their account and they visit their profile page, there's an Edit Profile button that takes them to the edit profile page
- The edit account page consists of two parts:
  - on the left side is the drawer section that has a list of options related to the user account
  - on the right hand side is the related content to the options
- When a user clicks on one of the options in the drawer, the related content to that option displays on the right hand in the main section. The route also changes to reflect where they are in relation to the options they select. For example, when a user clicks on the Edit Profile menu option, the edit user info form will display on the right in main section and the route will change to `/accounts/edit`
- **Building the options Drawer nav menu:**
- In src/pages/edit-profile.js file and in EditProfilePage component:
  - Import the Layout component (we want to show the Navbar)
  - Receive the history object as props. We have access to the history object because the route `/accounts/edit` that we declared in App.js file we assigned to it the component of EditProfilePage
  - Create a piece of state called showDrawer that's going to control the drawer visibility. Initialize it to false
  - Write a handleToggleDrawer function that toggles the showDrawer state to the opposite of its prev state
  - The first thing in the return section is to render the Layout component. Provide the value of "Edit Profile" for the title props. This title shows up in the browser tab
  - Inside the Layout component:
    - render a section element. This section element hold the options drawer nav menu on the left hand side of the edit profile page
    ```js
		<Layout title='Edit Profile'>
			<section className={classes.section}>
				<IconButton>
					<Menu />
				</IconButton>
				<nav>
					<Hidden smUp implementation='css'>
						<Drawer open={showDraw} onClose={handleToggleDrawer}>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown>
						<Drawer open onClose={handleToggleDrawer}>
							{drawer}
						</Drawer>
					</Hidden>
        </nav>
        <main></main>
			</section>
		</Layout>
    ```
  - Create a drawer variable that will return a `<List />` component. The List component renders the individual `<ListItem />` components. These individual ListItem(s) are the options in the drawer 
  - In order to loop through the options and display each one in the `<ListItem />` component, we first create an array of options called `options` and the elements in it are the names of the options. So in the `<List />` component, map over the `options` array and display each option element in the `<ListItem />` component. Make the ListItem as a button and render the options text in `<ListItemText />` component
  - Next when a user clicks on a ListItem option, we want to change the route to one that is associated to the option clicked on. We first want to figure the current path that we're on. We can get that path from `history.location.pathname` and assign to it a path variable
  - Write a handleSelected function that takes an index as an argument and returns the path that includes that index in it
  - Write a handleListClick function that takes an index as an argument and returns a a new route by calling the history.push() method
  - Then in ListItem component:
    - for the selected props, assign its value to the handleSelected function and pass in the index as an argument
    - for the onClick event handler, execute the handleListClick function and pass in the index as an argument
  - In the return section and inside the nav element, render a Drawer component from Material UI. And inside the Draw component:
    - render the drawer variable
    - set the open props to the showDrawer state
    - set the onClose props to the handleToggleDrawer function
  - Hide this Drawer component on small screen size
- **Building the EditUserInfo form in main section:**
- We're going to build the edit user form in EditUserInfo component
- In src/pages/edit-profile.js file:
  - Import defaultCurrentUser from data.js file
  - Import the ProfilePicture component
  - In EditProfilePage component:
    - In the return section, below the nav element but still inside the section element, render the main element
    - In the main element, write a conditional that if we're on the `/accounts/edit` route, then render the `<EditUserInfo />` component. Pass down the user props of the defaultCurrentUser data
- At the bottom of the page, write a functional EditUserInfo component:
  - Receive the user props from the EditProfilePage parent component
  - This component is going to render a section element and in the section, render:
    - the ProfilePicture component
    - the user.username
    - a text that says Change Profile Photo
    - a form element, which renders individual input text fields as `<SectionItem />` components. And for each component, provide the value for text props, the value for formItem props, and the value for type props if it's different than the default
- At the bottom of the page, write a functional SectionItem component:
  - This component receives the props of text, formItem, and type that by default set to text
  - Render the text input fields and its label
  - The value for the input label comes from the text props
  - The input fields are pre-populated with values coming from the formItem props
  - The input type comes from the type props


## PRODUCTION DEPLOYMENT

### 31. Deploying app to Heroku:
- https://github.com/mars/heroku-cra-node/blob/master/README.md?ts=2
- **Configure web server:**
  - At the root of the project directory, create a static.json file
  - In static.json file:
    ```js
    {
      "root": "build/",
      "clean_urls": false,
      "routes": {
        "/**": "index.html"
      }
    }
    ```
- **Create a project on Heroku:**
  - Initialize a git repo inside the project folder: `git init`
  - Add all files to git: `git add .`
  - To commit: `git commit -m "Initial commit"`
  - Login to Heroku with CLI: `heroku login`
  - Create a Heroku project: `heroku create ngala-instagram-clone`
  - Link to ngala-instagram-clone app: https://ngala-instagram-clone.herokuapp.com/
- **Deploy to Heroku:**
  - Push to Heroku: `git push heroku main`
  - To restart Heroku app: `heroku restart`
- **Commit changes to Heroku repo:**
  - Make sure there's a heroku remote: `git remote -v`
  - Git add, git commit with a message, and push to: `git push heroku main`

### 31. Deploying app to Vercel:
- **Setup configuration:**
  - At the root of the project directory, create a vercel.json file
  - In vercel.json file, configure our routes:
    ```json
    {
      "routes": [
        {
          "src": "/static/(.*)",
          "headers": {
            "cache-control": "s-maxage=31536000,immutable"
          },
          "dest": "/static/$1"
        },
        {
          "src": "/favicon.ico",
          "dest": "/favicon.ico"
        },
        {
          "src": "/asset-manifest.json",
          "dest": "/asset-manifest.json"
        },
        {
          "src": "/manifest.json",
          "dest": "/manifest.json"
        },
        {
          "src": "/precache-manifest.(.*)",
          "dest": "/precache-manifest.$1"
        },
        {
          "src": "/service-worker.js",
          "dest": "/service-worker.js"
        },
        {
          "src": "/(.*)",
          "headers": {
            "cache-control": "s-maxage=0"
          },
          "dest": "/index.html"
        }
      ]
    }
    ```
- **Create and build project to Vercel:**
  - To create a project on vercel, run and follow the instructions: `vercel`
- **Deploy to production:**
  - Run: `vercel --prod`
- Link to app: https://instagram-clone-app.ngala.vercel.app/


## SETUP AUTH, CREATE USERS

### 32. Set up authentication with Firebase:
- Tutorial to set up Firebase with a Hasura app:
    - https://hasura.io/blog/authentication-and-authorization-using-hasura-and-firebase/

**Step 1: Deploy Hasura graphQL to Heroku:**
  - **Run Hasura GraphQL engine on Heroku:**
    - https://hasura.io/docs/1.0/graphql/core/deployment/deployment-guides/heroku.html
    - Deploying Hasura with a new Postgres DB by clicking on the Deploy to Heroku button
    - Create a new app and call it ngala-instagram-clone. Then click on the Deploy button to deploy the app
    - In the Heroku console, click on the Settings tab and go to the Config Vars section
    - We want to secure our GraphQL endpoint. Add `HASURA_GRAPHQL_ADMIN_SECRET` as key and provide a password for the value. This prevents someone from accessing our API
  - **Launch Hasura GraphQL console:**
    - On Heroku project dashboard, click on the Open app button on the upper right corner
    - Enter the  ADMIN_SECRET password that we created
    - This will launch our project graphQL console. Click on the GRAPHQL tab at the top. Then copy the GraphQL Endpoint URI link. We will use this to hook up Apollo Client to GraphQL server later on










## COMMON DESIGN PATTERNS AND JS TRICKS

#### 1. Generate an array of dummy data, map over it and display each item
```js
function getDefaultPost() {
	return {
		id: uuid(),
		likes: 10,
		caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React?</span>`,
		user: defaultUser,
		media: 'https://scontent-ort2-2.cdninstagram.com/v/t51.2885-15/',
		comments: [],
		created_at: '2020-02-28T03:08:14.522421+00:00'
	};
}

<div>
	{Array.from({ length: 5 }, () => getDefaultPost()).map((post) => (
		<FeedPost key={post.id} post={post} />
	))}
</div>;
```

#### 2. Toggle between states
```js
const [showList, setList] = useState(false);

function handleToggleList() {
	setList((prev) => !prev);
}
```

#### 3. Get current path using useHistory hook
```js
import { Link, useHistory } from 'react-router-dom';

const history = useHistory();
const path = history.location.pathname;
```

#### 4. Iterate and extract the length of arrays stored in an object
```js
// Each element is an array
const options = ['posts', 'followers', 'following'];

// User is an object with the posts, followers, and following properties in it
{options.map((option) => (
  <div key={option} className={classes.followingText}>
    <Typography className={classes.followingCount}>
      {user[option].length}
    </Typography>
  </div>
))}
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
- @rooks/use-outside-click
  - The useOutsideClick hook allows us to hide the NotificationList when click anywhere on the page
- @tanem/react-nprogress
  - Showing the progress while a page is loading or when a route changes
- react-slick
  - Allows us to create a scroll left-right carousel
  - Import:
    ```js
    import Slider from 'react-slick';
    import 'slick-carousel/slick/slick.css';
    import 'slick-carousel/slick/slick-theme.css';
    ```
- react-modal
  - Helps us build the PostModal component
- React Apollo Client
  - Connecting client to GraphQL API


**In vercel.json file:**
```js
{
  "version": 2,
  "name": "instagram",
  "alias": "instagram-clone-app",
  "builds": [
    {
      "src": "package.json",
      "use": "@now/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "s-maxage=31536000,immutable"
      },
      "dest": "/static/$1"
    },
    {
      "src": "/favicon.ico",
      "dest": "/favicon.ico"
    },
    {
      "src": "/asset-manifest.json",
      "dest": "/asset-manifest.json"
    },
    {
      "src": "/manifest.json",
      "dest": "/manifest.json"
    },
    {
      "src": "/precache-manifest.(.*)",
      "dest": "/precache-manifest.$1"
    },
    {
      "src": "/service-worker.js",
      "dest": "/service-worker.js"
    },
    {
      "src": "/(.*)",
      "headers": {
        "cache-control": "s-maxage=0"
      },
      "dest": "/index.html"
    }
  ]
}
```