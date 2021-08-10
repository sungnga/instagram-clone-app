### How to use:
Install the project dependencies by running: `npm install`
To start up the Next.js dev server, run: `npm run dev`


## NOTES AND STEPS TO BUILDING THIS WEB APPLICATION
The codebase for each step can be found in the commit link

### [1. Breaking down the Instagram-Clone UI, establish file structure](https://github.com/sungnga/instagram-clone-app/commit/3e466b85204c16cc8b93683517d992e69d7575fc?ts=2)
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

- /:username (profile page)
- Components:
  - ProfileTabs

- /accounts/edit (edit profile page)

- /accounts/login (login page)

- /accounts/emailsignup (signup page)

- `*` (not found page)

#### Notification
- Components:
  - NotificationList
  - NotificationToolTip

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

### [2. Creating routes for our pages](https://github.com/sungnga/instagram-clone-app/commit/320d17a297495f4c800e5b6a66fea15e3be5444e?ts=2)
- In src/App.js file
  - Import: `import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';`
  - We begin by creating the individual routes that we've laid out. We're using the package react-router-dom to create the individual routes
  - There are a total of 8 routes

### [3. Building the shared Layout and Navbar components](https://github.com/sungnga/instagram-clone-app/commit/daf9fef158bca824bf2c78b611b944bb2f9c0af8?ts=2)
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

### [4. Building the NotFoundPage component](https://github.com/sungnga/instagram-clone-app/commit/536072b201117a5819357cdc1f3fb4c7d05024ca?ts=2)
- This is the default page when a route a user is try to visit doesn't match one of the routes we defined
- In src/pages/not-found.js file:
  - Import and render the Layout component to create the page layout and add styling
  - It has a simple Navbar header with the Instagram logo and a page-not-found message to the user with a link that takes them back to homepage

### [5. Building the LoginPage component](https://github.com/sungnga/instagram-clone-app/commit/da50b69dc17ab8949c336e45d01a7c0ddb681d2b?ts=2)
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

### [6. Building the SignUpPage component](https://github.com/sungnga/instagram-clone-app/commit/3a57da97d4786c60dac5317b7f7a01f06a715a7c?ts=2)
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

### [7. Building the FeedPage component](https://github.com/sungnga/instagram-clone-app/commit/5f30b6d0d269485f80cf0508a68e7592c92efa71?ts=2)
- In src/pages/feed.js file:
  - Import and render the Layout component. This will provide the page structure and render the Navbar and SEO components
  - Now we will create more structure to the FeedPage
  - On the left side of the page contains a list of FeedPost. For now, we'll generate an array of dummy feed posts as a placeholder
  - On the right side is the sidebar which contains the UserCard component and beneath that is the FeedSideSuggestions component
  - Import and render the FeedPost, UserCard, and FeedSideSuggestions components
  - At large-size screen we see the list FeedPost on the left and the sidebar on the right. At a small-size screen we want to hide the sidebar. To do this, Material UI has a Hidden component we can use

### [8. Building the FeedPost component](https://github.com/sungnga/instagram-clone-app/commit/43a827460ab403f9956766cb04a3364926836592?ts=2)
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

### [9. Building the UserCard component](https://github.com/sungnga/instagram-clone-app/commit/2223bed30edbbf50e6e76ba356db4e66009102a8?ts=2)
- The UserCard component receives the user object as props from the FeedPost parent component
- Render the user's profile_image, username, and name
- This component will be used in many places in our application. So the `username` is a link that redirects to that particular user's profile page

### [10. Implementing the LikeButton, SaveButton, and Comment functionalities](https://github.com/sungnga/instagram-clone-app/commit/a96714d3eeac1888acd179c583ec6451ed5a2ce3?ts=2)
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

### [11. Building the FeedSideSuggestions component](https://github.com/sungnga/instagram-clone-app/commit/6d012db6d13dca442db943d92c4607533d11559f?ts=2)
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

### [12. Creating Instagram-logo loading screen and loading icons](https://github.com/sungnga/instagram-clone-app/commit/51187df857a60e69cc06e2249fc4300838b80854?ts=2)
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

### [13. More building on the Navbar component](https://github.com/sungnga/instagram-clone-app/commit/e23073bcb1e9a919d8625492cbf726a940693692?ts=2)
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

### [14. Showing tooltips for Search bar](https://github.com/sungnga/instagram-clone-app/commit/b18d0de696c4d879018feee8b21dd3a64f9774e1?ts=2)
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

### [15. Showing tooltips for notifications](https://github.com/sungnga/instagram-clone-app/commit/6e7758ee31924d820a17786ff9c32ff1a1f18c68?ts=2)
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

### [16. Animating the progress bar when route changes](https://github.com/sungnga/instagram-clone-app/commit/ecac219a1aff83e65d38426d9908c0eecba7b253?ts=2)
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

### [17. Displaying FollowSuggestions in FeedPost list](https://github.com/sungnga/instagram-clone-app/commit/be41e5813be3197ab5a63101df136e981d4921ca?ts=2)
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

### [18. Implementing the More button functionality](https://github.com/sungnga/instagram-clone-app/commit/7235e39637b655164e4636270734f19d549bf861?ts=2)
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

### [19. Building the explore page](https://github.com/sungnga/instagram-clone-app/commit/c61ec67bafd2e40742e0169449aea542d8c9b7f8?ts=2)
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

### [20. Setting up Route for PostModal component](https://github.com/sungnga/instagram-clone-app/commit/2df6283f2b840f26a0514174e65c3888c052143e?ts=2)
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

### [21. Building the PostModal component](https://github.com/sungnga/instagram-clone-app/commit/be0937fed0f9e6fdd57a7afdd2e434b556abf5f3?ts=2)
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
  - Inside the Modal component, import and render the Post component. Pass down the id props and set its value to postId: `<Post postId={postId} />`
  - Outside of and below the Modal component, import and render the CloseIcon component inside a div tag. Add an onClick event handler that will execute the `history.goBack()` method when the CloseIcon is clicked on

### [22. Building the Post component](https://github.com/sungnga/instagram-clone-app/commit/003f18ab00f882d76364c152333c7c77962d0580?ts=2)
- In src/components/post/Post.js file:
  - The Post component contains very similar content as the FeedPost component. So we can use that as a starter code
  - For now, we're going to display the defaultPost coming from our data.js file. Name import the defaultPost object

### [23. Building the post page](https://github.com/sungnga/instagram-clone-app/commit/2e9ab86205e8b3374c35026e3334a33c4da30271?ts=2)
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

### [24. Lazy loading on FeedPost component](https://github.com/sungnga/instagram-clone-app/commit/ed9e6d4f20a2f6c29a0c7774468d1a59783eba30?ts=2)
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

### [25. Building the FeedPostSkeleton and PostSkeleton components](https://github.com/sungnga/instagram-clone-app/commit/c70e63363d884e6786c6f0f520b8bcabfc77b283?ts=2)
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

### [26. Building the profile page](https://github.com/sungnga/instagram-clone-app/commit/f189908c6dc8964609296651f807e8dea2d6c8ea?ts=2)
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

### [27. Building the profile header](https://github.com/sungnga/instagram-clone-app/commit/16f2982dc2810d9f77de6113a6a2d9686bb0dd81?ts=2)
- The profile header section consists of:
  - a ProfilePicture on left column. The profile image is smaller when screen-size is below small
  - a ProfileNameSection that has the user's username, an Edit Profile button and a Gear icon (if they're the owner of the profile)
    - When clicking on the Gear icon, an OptionsMenu dialog opens to display different options
  - a PostCountSection that has the count of number of posts, followers, and following for a given account
  - a NameBioSection that has the user's name, bio description, and link to their website
  - On small screen size and below, the PostCountSection shifts below the NameBioSection
- [**Building the ProfilePicture component:**](https://github.com/sungnga/instagram-clone-app/commit/16f2982dc2810d9f77de6113a6a2d9686bb0dd81?ts=2)
  - In src/pages/profile.js file:
    - Create an isOwner variable and set it to true
    - Pass down the isOwner value as isOwner props to both of the `<ProfilePicture />` child components in xsDown and smUp cards
    - Also pass down a size props and set it to 77 pixels to the ProfilePicture child component in smUp card. When the screen-size is smaller than small, display a smaller profile picture
  - In src/components/shared/ProfilePicture.js file:
    - This component receives size, image, and isOwner as props
    - Then pass down the size and isOwner properties to the useProfilePictureStyles() hook
    - For now, we're going to set a default image to the image property
    - Then in the return section, write a conditional that checks to see if there's an image provided to the image property. If there is, render that image. If there isn't, render a generic Material UI person icon
- [**Building the ProfileNameSection component:**](https://github.com/sungnga/instagram-clone-app/commit/9353a2c775d3c900e106fddf179ad3bd66e66351?ts=2)
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
- [**Building the OptionsMenu dialog component:**](https://github.com/sungnga/instagram-clone-app/commit/cd14006a46e816ea0c99119778ef69bff18ab8d9?ts=2)
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
- [**Displaying the Unfollow dialog:**](https://github.com/sungnga/instagram-clone-app/commit/e30b7ce2757a772d2ac3d747e27bb2b67bce5710?ts=2)
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
- [**Building the PostCountSection component:**](https://github.com/sungnga/instagram-clone-app/commit/1cb7d0fc987c91c755413d17329789de48384f03?ts=2)
  - In the post count section, we want to include the number of posts, number of followers, and number of following
  - In the ProfilePage component:
    - Pass down the defaultCurrentUser as user props to the PostCountSection and NameBioSection child components
  - In the PostCountSection component:
    - Receive the user props from the ProfilePage parent component
    - This user object contains the posts, followers, and following properties and each one is an array
    - Create an array containing the "posts", "followers", and "following" element and assign it to options variable
    - Then in the return section, map over the options array and for each option element, target that option property in the user object and chain on `.length` to get the total number in that option array
    - When screen size is small and below, these 3 items shift below the NameBioSection and dividers are added above and below them. And the texts are muted to grey tone
- [**Building the NameBioSection component:**](https://github.com/sungnga/instagram-clone-app/commit/a9db4ec9dd5d509bef08d6f8198bbbaec8a339ce?ts=2)
  - In the NameBioSection component:
    - Receive the user props from the ProfilePage parent component
    - This section renders the user's name, bio, and website each on separate line
    - The website is optional but it's an anchor tag that takes you to their website

### [28. Building the profile tabs section](https://github.com/sungnga/instagram-clone-app/commit/492cac28a0f8ab7478b8c2a934d8beb788747465?ts=2)
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

### [29. Displaying the related content in profile tabs](https://github.com/sungnga/instagram-clone-app/commit/7a5c7971b5f8894ee40a115395c3e29eca7f2d54?ts=2)
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

### [30. Building the edit profile page](https://github.com/sungnga/instagram-clone-app/commit/c7d5fafc0dda0ec9132b76fc837a116d95ba5d75?ts=2)
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
- [**Building the EditUserInfo form in main section:**](https://github.com/sungnga/instagram-clone-app/commit/50ad8a222f9ee141074bd133ce73d688f7d2df33?ts=2)
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

### [31. Deploying app to Heroku](https://github.com/sungnga/instagram-clone-app/commit/5a990d0be85d1fd3167fb54df1f483c5a419680a?ts=2)
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

### [31. Deploying app to Vercel](https://github.com/sungnga/instagram-clone-app/commit/30fa1bb825585ca59353dc67ec646eced6c87c55?ts=2)
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


## SET UP AUTH, CREATE USERS

### [32. Setting up authentication with Firebase](https://github.com/sungnga/instagram-clone-app/commit/95bbb0a2c9507a3f3901acfc90c073804f22a74c)
- Tutorial to set up Firebase with a Hasura app:
    - https://hasura.io/blog/authentication-and-authorization-using-hasura-and-firebase/

#### Step 1: Deploy Hasura graphQL to Heroku
  - **Run Hasura GraphQL engine on Heroku:**
    - https://hasura.io/docs/1.0/graphql/core/deployment/deployment-guides/heroku.html
    - Deploying Hasura with a new Postgres DB by clicking on the Deploy to Heroku button
    - Create a new app and call it ngala-instagram-clone. Then click on the Deploy button to deploy the app
    - In the Heroku console, click on the Settings tab and go to the Config Vars section
    - We want to secure our GraphQL endpoint. Add `HASURA_GRAPHQL_ADMIN_SECRET` as key and provide a password for the value. This prevents someone from accessing our API
  - **Launch Hasura GraphQL console:**
    - On Heroku project dashboard, click on the Open app button on the upper right corner
    - Enter the ADMIN_SECRET password that we created
    - This will launch our project graphQL console. Click on the GRAPHQL tab at the top. Then copy the GraphQL Endpoint URI link. We will use this to hook up Apollo Client to GraphQL server later on

#### [Step 2: Add Firebase authentication](https://github.com/sungnga/instagram-clone-app/commit/e5dcb4a56d0088105a16b32d67e09ffe05eafc2a?ts=2)
  - Firebase website: https://firebase.google.com/
  - Sign in to Google Firebase and create a new project. Call it instagram-clone
  - On the Firebase project's dashboard, click on Authentication option on the left menu
  - Then click on Sign-in method tab. We want to enable the Email/Password and save
  - Next step is to create a cloud function. A cloud function is a function that automatically runs "in response to events triggered by Firebase features and HTTPS requests". Our cloud function is going to run in response to a user being signed up
  - We're going to create and deploy this function
  - At the root of our project, create a folder called functions. In it, create a file called index.js
  - In index.js file:
    - Copy and paste the code from the tutorial. Don't change anything
  - Deploy the cloud function using Firebase CLI
  - Install FireBase CLI: `sudo npm install -g firebase-tools`
  - Login to Firebase using Firebase CLI: `npx firebase login`
  - Initialize our project by running: `npx firebase init`
    - Use the up/down arrow key to select `functions` option and hit the spacebar to select it. Then press Enter to move on
    - Select existing project and select instagram-clone project
    - Follow the rest of the instructions in the command prompt
    - A whole bunch of new files and dependencies will be added to our project directory
  - Lastly, deploy our cloud function: `npx firebase deploy --only functions`
  - On the Firebase project's dashboard, click on Functions option on the left menu. We should see the `processSignUp` function been added to the list

#### [Step 3: Client-side React - hook up Apollo Client to graphQL](https://github.com/sungnga/instagram-clone-app/commit/bfb418fc1996ec46f9feaab61779a00a07cfe465?ts=2)
  - Set up a GraphQL client with Apollo: https://hasura.io/learn/graphql/react/apollo-client/
  - **Configure Apollo Client:**
    - Install React Apollo hooks: `npm i @apollo/client graphql subscriptions-transport-ws`
    - In src directory, create a folder called graphql. In it, create a client.js file
    - In src/graphql/client.js file:
      - We need to setup our client by instantiating a new client
      - Our client is going to keep track of all of our settings, what endpoint we're going to be making request to, and it's going to create our cache
      - Go to Hasura GraphQL API and copy the GraphQL server's Endpoint/URl and set it to the uri property of the constructor's configuration object
      ```js
      import { ApolloClient, InMemoryCache } from '@apollo/client';
      import { WebSocketLink } from '@apollo/client/link/ws';

      const headers = { 'x-hasura-admin-secret': process.env.REACT_APP_HASURA_ADMIN_SECRET };

      const client = new ApolloClient({
        link: new WebSocketLink({
          uri: 'wss://ngala-instagram-clone.herokuapp.com/v1/graphql',
          options: {
            reconnect: true,
            connectionParams: {
              headers
            }
          }
        }),
        cache: new InMemoryCache()
      });

      export default client;
      ```
  - **Connect our client to React:**
    - We connect Apollo Client to React with the `ApolloProvider` component. The `ApolloProvider` is similar to React's `Context.Provider`. It wraps our React app and places the client on the context, which enables us to access it from anywhere in our component tree
    - In src/index.js file:
      - Import ApolloProvider component from @apollo/client
      - Import our apollo client
      - Wrap the ApolloProvider component around the MuiThemeProvider component
      - In the ApolloProvider component, pass down the client props and set it to the client instance we just created
      ```js
      import { ApolloProvider } from '@apollo/client';
      import client from './graphql/client';

      ReactDOM.render(
        <ApolloProvider client={client}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <App />
            </Router>
          </MuiThemeProvider>
        </ApolloProvider>,
        document.getElementById('root')
      );
      ```
  - **Integrate Firebase into our app:**
    - In src/auth.js file:
      - Copy and paste the code from the tutorial from their auth.js file
      - Then provide the Firebase SDK information. This can be found in Firebase project console under Settings
      - The auth.js file contains the signInWithGoogle and signOut functions and the authState state that we want to use within our app wherever it needs it. For this, we want to use React's context hook
      - Create an AuthContext by calling React's createContext() hook. Name export this
      - In the return section of the AuthProvider component, render the `<AuthContext.Provider />` component. Pass down the value props as an object that has authState, signInWithGoogle, and signOut properties
      - In the `<AuthContext.Provider />` component, render the children props
    - In src/index.js file:
      - Import the AuthProvider component
      - Wrap all the other components inside the `<AuthProvider />` component. However, this AuthProvider component is wrapped inside the `<ApolloProvider />` component
    - In src/App.js file:
      - Name import the AuthContext context from auth.js file
      - Call React's useContext() hook and pass in AuthContext. What we get back are authState, signInWithGoogle, and signOut properties and we can destructure those

### [33. Signing up a user, sign up with email and password](https://github.com/sungnga/instagram-clone-app/commit/8d472197e12a4695de088a5497667113053fd569?ts=2)
**Steps to creating a new user:**
- Create a users schema in Hasura GraphQL console. Define its properties and type
- Write a CREATE_USER mutation in mutations.js file. Create a createUser mutation function that we can use to add a new user to the users database in Hasura
- Write a signUpWithEmailAndPassword function in auth.js file to enable users to create a user account with email and password. If successful, an authenticated user account is created in Firebase. And then the createUser mutation function is executed to add the new user to Hasura graphQL
- The route to sign up with email and password is: `/accounts/emailsignup`
- The user signup form is in: `src/pages/signup.js`
- The signUpWithEmailAndPassword function is executed in the signup page with the provided formData

**Create users table in Hasura graphQL:**
- In Hasura console, click on the DATA tab at the top and click on Create Table button
- Table Name: users
- Columns:
  - id : type of UUID : gen_random_uuid()
  - username : type of Text : Unique constraint is checked
  - name : type of Text
  - email : type of Text
  - bio : type of Text
  - website : type of Text
  - user_id : type of Text
  - phone_number : type of Text
  - profile_image : type of Text
  - last_checked : type of Text : Nullable is checked
  - created_at : type of Timestamp : now()
- Primary Key: id

**Create a CREATE_USER mutation:**
- In src/graphql/mutations.js file:
  - Import gql from @apollo/client
  - Create a mutation called CREATE_USER and name export it. In this mutation:
    - Write a createUser mutation function and set the type for each variable properties. These properties should match up with the properties we defined for users schema in Hasura console
    - Write a insert_users function and pass in the objects property. Set the value to the variable property for each key
    ```js
    import { gql } from '@apollo/client';

    export const CREATE_USER = gql`
      mutation createUser(
        $userId: String!,
        $name: String!,
        $username: String!,
        $email: String!,
        $bio: String!,
        $website: String!,
        $profileImage: String!,
        $phoneNumber: String!
      ) {
        insert_users(
          objects: {
            bio: $bio,
            email: $email,
            name: $name,
            phone_number: $phoneNumber,
            profile_image: $profileImage,
            user_id: $userId,
            username: $username,
            website: $website
          }
        ) {
          affected_rows
        }
      }
    `;
    ```

**Sign up with email and password, add new user to Hasura:**
- In src/auth.js file:
  - Once a user is able to sign up with email and password (a user account created in firebase), we want to call the createUser mutation function to add the newly created user to the Hasura graphQL database, provided this is a new user
  - Call useMutation() hook and pass in the CREATE_USER mutation. We can destructure the createUser mutation function
  - Write a signUpWithEmailAndPassword function that signs up a user with their email and password
    - This function accept formData as a parameter
    - On firebase.auth(), call the createUserWithEmailAndPassword() method and pass in formData.email and formaData.password as two arguments. This is an async operation, so add the await keyword in from of it. This function returns the newly created user, assign this result to a data variable
    - Next, we want to check to make sure it's a new user and if it is, we can add this user to Hasura graphQL
    - Write an if statement to check if `data.additionalUserInfo.isNewUser` is true
      - If it is, call the createUser function and pass in the variables object as an argument. This is an async operation, so add the await keyword in front of it
      - The variables object contains the variable properties as keys and their values come from various sources
      ```js
      import { useMutation } from '@apollo/client';
      import { CREATE_USER } from './graphql/mutations';
      import defaultUserImage from './images/default-user-image.jpg';

      function AuthProvider({ children }) {
        const [createUser] = useMutation(CREATE_USER);

        async function signUpWithEmailAndPassword(formData) {
          const data = await firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password);
          if (data.additionalUserInfo.isNewUser) {
            const variables = {
              userId: data.user.uid,
              name: formData.name,
              username: formData.username,
              email: data.user.email,
              bio: '',
              website: '',
              phoneNumber: '',
              profileImage: defaultUserImage
            };
            await createUser({ variables });
          }
        }
      }
      ```

**User signup page:**
- In src/pages/signup.js file:
  - Name import AuthContext context from auth.js file because we want to use the signUpWithEmailAndPassword function in signup page
  - Call useContext() hook and pass in the AuthContext as an argument. And we can destructure the signUpWithEmailAndPassword property
  - Create a piece of state called values and initialize it to an object. And this object contains properties of email, name, username, and password with values of empty strings
  - Call useHistory() hook and assign the result to a history variable. We want to use this history object to redirect user to home page after they've successfully signed up
  - Write a handleChange function that executes the setValues() to set the values coming from form data to values state
  - Write a handleSubmit function that executes the signUpWithEmailAndPassword function
    - The signUpWithEmailAndPassword function accepts the values state as an argument. And this is an async operation, so add the await keyword in front of it
    - Once this is finished, call the history.push() method to redirect user to home page
  - In the return section and in the form element:
    - Add an onSubmit event handler to the form element and set it to handleSubmit function
    - In email, name, username, and password text fields, add the name property and onChange event handler
    ```js
    import React, { Fragment, useContext, useState } from 'react';
    import { Link, useHistory } from 'react-router-dom';
    import { AuthContext } from '../auth';

    function SignUpPage() {
      const { signUpWithEmailAndPassword } = useContext(AuthContext);

      const [values, setValues] = useState({
        email: '',
        name: '',
        username: '',
        password: ''
      });

      const history = useHistory();

      function handleChange(event) {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
      }

      async function handleSubmit(event) {
        event.preventDefault();
        await signUpWithEmailAndPassword(values);
        history.push('/');
      }
    }
    ```


## SIGNUP FORM VALIDATION AND ERROR HANDLING
- react-hook-form docs: https://react-hook-form.com/
- validator docs: https://www.npmjs.com/package/validator

### [34. Separating routes to authenticated and unauthenticated](https://github.com/sungnga/instagram-clone-app/commit/f2da578ca551d289da4144f756a75406447c1ff1?ts=2)
- If a user is not authenticated, we want them to be able to visit pages/routes that are not authenticated. For example, the login page and the signup with email page. And if they try to access any of the authenticated route, they'll be redirected to the login page using the react-router-dom's Redirect component
- Implement the signOut functionality when a user clicks Log Out in the profile options menu. This will set the authState.status === 'out'
- In src/App.js file:
  - If `authState.status` is equal to 'in', assign it to a isAuth variable. This means that this user is authenticated
  - Write an if statement that if NOT isAuth, then return it with a `<Switch />` component. In it contains the routes to the login page, the signup with email page, and a `<Redirect />` component that redirects an unauthenticated user to the login page if they try to visit an authenticated route
  ```js
  import { Redirect } from 'react-router-dom';

  const { authState } = useContext(AuthContext);
  const isAuth = authState.status === 'in';

	if (!isAuth) {
		// Use unauth routes
		return (
			<Switch>
				<Route path='/accounts/login' component={LoginPage} />
				<Route path='/accounts/emailsignup' component={SignUpPage} />
				<Redirect to='/accounts/login' />
			</Switch>
		);
	}
  ```
- **Implement signOut functionality in the user profile options menu:**
- In src/pages/profile.js file and in OptionsMenu component:
  - Name import AuthContext from auth.js file
  - Call useContext hook and pass in AuthContext as an argument. Destructure the signOut function from it
  - Call useHistory hook and assign the result to a history variable
  - In the handleLogOutClick function, call the setTimeout() method and set it to 2000 milliseconds. And in the callback, 
    - execute the signOut() method. This will set the authState.status === 'out'
    - call history.push() to redirect user to login page after signOut

### [35. Client-side: validating signup form](https://github.com/sungnga/instagram-clone-app/commit/82bda1f4e596b986a4f82c5ed4003950389ea485?ts=2)
- react-hook-form docs: https://react-hook-form.com/
- validator docs: https://www.npmjs.com/package/validator
- Install: `npm i react-hook-form validator`
- We want to provide some validation to the signup form to make sure all of the input fields are valid before a user can actually submit the form
- We're going to use two validation libraries, react-hook-form and validator, to help us with this
- In src/pages/signup.js file:
  - Name import the useForm hook from react-hook-form
  - Import isEmail from validator
  - Call the useForm() hook and we can specify the mode to be 'all'. Validation will trigger on the blur and change events. What we get back are register and handleSubmit functions and formState and errors objects. We can destructure those
  - The nice thing about react-hook-form is we no longer need to store the form input values in the values state object anymore. The input values are automatically be stored in the handleSubmit function and we can access them in the parameters
  - So we can remove the values state and handleChange function. We can also comment out our handleSubmit function
  - Then for each of the text fields, we can remove the onChange event handler. Instead, we're going to add an `inputRef` property to each text fields. Pass in the register() function to this property
  - The register function is going to automatically update that object that collects all of our form data. And in it, we specify a bunch of information pertaining to that input field. For example, we can specify whether the input field is required or not, the min and max length of characters, types of acceptable characters, apply the validate function, etc.
  - Write an onSubmit function that accepts data as a parameter. For now, we're just going to console log the data
  - In the form element, for the onSubmit event handler, call the 
  handleSubmit function and pass in the onSubmit function that we just wrote. This gives the onSubmit function access to the form data collected by the handleSubmit function
  - Next, we want to disable the Sign Up button if any of the input fields is invalid or while the form is submitting
    - From useForm hook, we get back the formState object. This object contains information about the form state, such as dirty, isSubmitted, touched, isSubmitting, submitCount, and isValid
    - We'll use `!formState.isValid` and `formState.isSubmitting` to disable the Sign Up button
  - Lastly, we want to give a visual feedback to the user when they interact with the input fields by showing either a valid or invalid icon
    - For each TextField elements, add the InputProps property and specify, as an object, the endAdornment of either an errorIcon or a validIcon. Use a ternary operator to display one over the other. We can check for the error in the `errors` object from useForm() hook. For example, to check for an error in the email input field, use `errors.email`, etc
    - We can use the Material UI icons
- **Implement the form submit functionality:**
  - Make the onSubmit function as an async function
  - Call the signUpWithEmailAndPassword method and pass in the data as an argument. This is an async operation since we're making a request to Firebase to sign up a user
  - Once this is completed, call history.push() method to redirect user to home page. Call the history.push() inside a setTimeout() function to ensure that the redirect get executed
  ```js
	async function onSubmit(data) {
		// console.log({ data });
		await signUpWithEmailAndPassword(data);
		setTimeout(() => history.push('/'), 0);
	}
  ```

### [36. Server-side: validating signup form](https://github.com/sungnga/instagram-clone-app/commit/5fffba017f736c4cdf5fc557388d55a246855f48?ts=2)
- Display error message coming from the server to the user
- Validate that
  - password is at least 6 characters long. Display human-readable error message
  - username is unique. Display error message if username is already taken
- Write a query mutation to query DB of a given username. Display the errorIcon if the username already taken
- In src/pages/signup.js file:
  - **Handling and rendering server's error message:**
  - Create an error state and initialize it to an empty string
  - To catch any errors when returning a promise we can use a try/catch block in the onSubmit async function
    - In the catch error block, call setError() to set `error.message` to error state
    - This way, we can display the error message coming from the server to the user
  - At the bottom of the page, write an AuthError component that renders the error message on the signup page
    - This component receives the error props from the SignUpPage parent component
    - Check to see if there's an error by wrapping the error state in `Boolean()` so that it returns a true or false
    - If there is, render the error message stored in error state
    - Name export this component, so that we can use it in login page as well
  - We want to clear out the error message when the user tries to resubmit the form
    - In onSubmit function and in the try block, call the setError() and set it to an empty string
  - In the return section of the SignUpPage component, render the `<AuthError />` component right after the form element and pass down the error state as a error props
  - **Display human-readable error message to users:**
  - Next, we want to display a human-readable error message (at the bottom of the form in red) to our user. For that, we want to write a custom error handling function
    - It will display an error message if a user enters a username that's already taken
    - It will display an error message if the password is less than 6 characters
    - If the email has already taken
    ```js
    function handleError(error) {
      if (error.message.includes('users_username_key')) {
        setError('Username already taken');
      } else if (error.code.includes('auth')) {
        setError(error.message);
      }
    }
    ```
  - Call this handleError function in the catch error block of the onSubmit function and pass in the error as an argument. The error comes from the server
  - **Query database for a given username:**
  - Lastly, we want to display the errorIcon in the input field dynamically with the error message if the user tries to enter the username that's already exists
  - When a new user is successfully created, we store the user data in Hasura graphQL database. So to check if the username that the user enters is already taken, we want to make a query mutation to query our database using Apollo client
  - Import useApolloClient hook from @apollo/client
  - Import the CHECK_IF_USERNAME_TAKEN query 
  - Call the useApolloClient() hook and assign the result to a `client` variable
  - Write an async validateUsername function that makes a query in Hasura graphQL database using the client.query() method
    - This function accepts username as a parameter
    - In the client.query() method, provide it an object that has a query property of CHECK_IF_USERNAME_TAKEN and the variables property set to the username
    - It will take the provided username and check the database for that username and will return the username as a response if there's a match
    - If `response.data.users.length` is equal to 0, which means that there's no match in DB, the username the user enters is valid. Assign the result to isUsernameValid variable
    - return isUsernameValid
    ```js
    import { useApolloClient } from '@apollo/client';
    import { CHECK_IF_USERNAME_TAKEN } from '../graphql/queries';

    const client = useApolloClient();

    async function validateUsername(username) {
      const variables = { username };
      const response = await client.query({
        query: CHECK_IF_USERNAME_TAKEN,
        variables
      });
      // console.log({ response });
      const isUsernameValid = response.data.users.length === 0;
      return isUsernameValid;
    }
    ```
  - In the username TextField element, add a `validate` property and asynchronously call the validateUsername function and pass in the input as an argument. The input being the input the user types in the input field
    - `validate: async (input) => await validateUsername(input)`
  - So when the user types in the username input field, the validate function is making a query request to graphQL database to see if the username is already taken. If it does, it will display the errorIcon. It will also display the errorIcon if username is less than 5 characters long
- In src/graphql/queries.js file:
  - Write a CHECK_IF_USERNAME_TAKEN query that executes the checkIfUsernameTaken query function
  - It will query the database with the given username and it will return the username if it finds a match
  ```js
  import { gql } from '@apollo/client';

  export const CHECK_IF_USERNAME_TAKEN = gql`
    query checkIfUsernameTaken($username: String!) {
      users(where: { username: { _eq: $username } }) {
        username
      }
    }
  `;
  ```


## EMAIL LOGIN AND THIRD PARTY AUTH

### [37. Client-side: validating email login form](https://github.com/sungnga/instagram-clone-app/commit/753779b5859ee1eac324a1b6bad424b6ac9bdfcf?ts=2)
- Validating the email login form is very similar to validating the signup form
- When logging in, the user can provide either a username, email, or phone number and their password
- When the user starts typing in their password, we want to display an endAdornment of Show button so that they can click see the password text. We want to toggle the Show and Hide password button
- We can watch for or subscribe to the input the user types in the password field using the `watch` method coming from useForm() hook
- In src/pages/login.js file:
  - Import useForm from react-hook-form
  - Call useForm() hook and specify the mode property to 'all'. What we get back are register, handleSubmit, and watch function and formState object. Destructure them
  - Create a showPassword state and initialize it to false
  - Write a togglePasswordVisibility function that call setPasswordVisibility() to set the showPassword state the opposite - false to true or true to false
  - Call watch() method and pass in 'password' as an argument. This will subscribe to the password TextField. Set the result we get back to hasPassword variable
  - Write an onSubmit function
    - This function accepts data as a parameter. This data is collected by the useForm's handleSubmit function
    - For now, we're just going to console log the data
  - For the onSubmit event handler of the form element, set it to handleSubmit() method and pass in the onSubmit function as an argument
  - For the username TextField element, 
    - set the label to be 'Username, email, or phone'
    - add an inputRef prop to set this field be required and min characters to be 5
  - For the password TextField element,
    - add an inputRef prop to set this field be required and min characters to be 5
    - for type props: write a ternary if showPassword state is true, display 'text', else display 'password'. Type set to password will replace the password input with dots
    - for the endAdornment, only display the Show adornment if hasPassword is true. Meaning, the user has typed something in the password field
  - For the Log In button, disable it if `!formState.isValid` or `formState.isSubmitting` 

### [38. Implementing log in with email and password functionality](https://github.com/sungnga/instagram-clone-app/commit/29bd36b128f216d482639dcdd68a3735e6a0a6a5?ts=2)
- In src/auth.js file:
  - Write an async logInWithEmailAndPassword function that signs in a user with the given email and password
    - This function accepts an email and password as parameters
    - Call the `firebase.auth().signInWithEmailAndPassword()` method and pass in the email and password as arguments. This is an async operation so add the await keyword in front of it. What we get back is the user data and assign it to a `data` variable
    - Return the `data`
    - We're not handling any errors from the promise at the moment. We will do that later
    ```js
    async function logInWithEmailAndPassword(email, password) {
      const data = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return data;
    }
    ```
  - Then pass down the logInWithEmailAndPassword function to `AuthContext.Provider` to make it available in our components
- In src/pages/login.js file:
  - Name import AuthContext from auth.js file
  - Name import useHistory hook from react-router-dom
  - Call useContext() hook and pass in AuthContext as an argument. We can destructure the logInWithEmailAndPassword function
  - Call useHistory() hook and assign the result to a `history` variable. Later we can call history.push() method to redirect user to a different page
  - Make the onSubmit function an async function:
    - This function accept input and password as parameters. Destructure from data.input and data.password
    - Call the signUpWithEmailAndPassword method and pass in the input and password as arguments. This is an async operation since we're making a request to Firebase to sign in a user
    - Once this is completed, call history.push() method to redirect user to home page. Call the history.push() inside a setTimeout() function to ensure that the redirect get executed
    ```js
    import { AuthContext } from '../auth';
    import { useHistory } from 'react-router-dom';

    const { logInWithEmailAndPassword } = useContext(AuthContext);
    const history = useHistory();

    // For username TextField, we set input to the name props
    // For password TextField, we set password to the name props
    // Destructuring from data.input and data.password
    async function onSubmit({ input, password }) {
      // console.log({ data });
      await signInWithEmailAndPassword(input, password);
      setTimeout(() => history.push('/'), 0);
    }
    ```

### [39. Implementing log in with username or phone number functionality](https://github.com/sungnga/instagram-clone-app/commit/22f93970a5dd4eb8c797a846318073962def3a72?ts=2)
- The next thing we want to do is allow users to log in with their username or phone number. The input they can provide are either username, email, or phone
- For example, if the input they provide is not an email, we can write a users query on Hasura graphQL to look up a user's email based on the username or phone they provided
- In src/graphql/queries.js file:
  - Write a GET_USER_EMAIL query that runs the getUserEmail query function
  - The getUserEmail query function:
    - accepts an input as a parameter
    - it queries the users table WHERE the username OR the phone_number IS EQUAL TO the input provided
    - returns an email, if there's a match
    ```js
    export const GET_USER_EMAIL = gql`
      query getUserEmail($input: String) {
        users(
          where: {
            _or: [{ username: { _eq: $input } }, { phone_number: { _eq: $input } }]
          }
        ) {
          email
        }
      }
    `;
    ```
  - Name export the GET_USER_EMAIL query
  - NOTE: it's best to write the getUserEmail query function in the Hasura console and run it to make sure that it works. And then just paste the code here
    - In our case, provide the required input in the QUERY VARIABLES section like this:
      ```js
      {
        "input": "nga1234"
      }
      ```
    - Run it and the result we get back looks like this:
      ```js
      {
        "data": {
          "users": [
            {
              "email": "nga@example.com"
            }
          ]
        }
      }
      ```
- In src/pages/login.js file:
  - Name import useApolloClient hook from @apollo/client
  - Name import the GET_USER_EMAIL query
  - Call useApolloClient() hook and what we get back from this hook is a client and assign that to a variable. We'll use this to execute our query by calling `client.query()`
  - Write an async getUserEmail function that runs the GET_USER_EMAIL query by calling the client.query() method
    - This function accepts input as a parameter
    - Set input to the variables property
    - What we get back as a response is the user's email. The path to the email within the response is: response.data.users[0].email
    - If there exists an email at users zero-th index, assign it to a `userEmail` variable. Else, set the variable to a dummy email 'no@gmail.com'. This will trigger an error in Firebase when trying to log in with this email
    - This function returns userEmail
  - In onSubmit function:
    - Start out with writing an if statement that if the user's input is NOT email, execute the getUserEmail() method and pass in input as an argument
    - This is an async operation since we're making a query to graphQL database to get a user's email based on the given input
    - What we get back is an email and assign that to input. This will overwrite the initial value in input that was passed to the onSubmit function
    - For example, if the user provides nga1234 as in input, getUserEmail() will query the graphQL database with the provided input for the user's email and get back nga@gmail.com. The input value will now be nga@gmail.com, instead of nga1234. Then when logInWithEmailAndPassword() method is called, it will use this updated input as an argument to try to log in the user
    - Lastly, to ensure that the history.push() operation get executed right after the promise, call it inside a setTimeout() function and set it to 0 seconds
    ```js
    import { useApolloClient } from '@apollo/client';
    import { GET_USER_EMAIL } from '../graphql/queries';

    const client = useApolloClient();

    async function onSubmit({ input, password }) {
      if (!isEmail(input)) {
        // Overwrite the user's input with the email returned from the query
        input = await getUserEmail(input);
      }
      // console.log({ data });
      await logInWithEmailAndPassword(input, password);
      // Wrap the push operation in a setTimeout() to ensure it runs right after the promise
      setTimeout(() => history.push('/'), 0);
    }

    async function getUserEmail(input) {
      const variables = { input };
      const response = await client.query({
        query: GET_USER_EMAIL,
        variables
      });
      // console.log({ response });
      const userEmail = response.data.users[0]?.email || 'no@email.com';
      return userEmail;
    }
    ```

### [40. Server-side: handling auth errors and validating login form](https://github.com/sungnga/instagram-clone-app/commit/c5e999b3446652fd42bbf64633548c9fca58a7a3?ts=2)
- Right now if a valid password is not provided, we're going to get an uncaught promise from our backend. To handle that, we're going to use our AuthError component from signup.js file to display an error message on the login form
- In src/pages/login.js file:
  - Name import the AuthError component from signup.js file
  - Create a piece of error state and initialize it to an empty string
  - In the return section, render the `<AuthError />` component just above the LoginWithFacebook component and pass in an error props and set it to error state. This is where the error message will be displayed if there is one
  - In the onSubmit function:
    - Wrap our code in a try/catch block to handle any errors coming from Firebase authentication
    - Call setError() and set it to an empty string at the beginning of the try block
    - Then use the catch block and it accepts an error as an argument. This is where we get the error from backend and do something with it
      - Call console.error() to log the error message to the console
      - Then call the handleError function and pass in the error as an argument
  - Write a handleError function that handles various errors coming from Firebase auth
    - This function accepts error as a parameter
    - Write an if statement that checks for various error code in `error.code`, call setError() and set an error message pertaining to that error to error state. This way the AutError component can render the error message stored in error state to the login form
    ```js
    import { AuthError } from './signup';

    const [error, setError] = useState('');

    async function onSubmit({ input, password }) {
      try {
        setError('');
        if (!isEmail(input)) {
          // Overwrite the user's input with the email returned from the query
          input = await getUserEmail(input);
        }
        // console.log({ data });
        await logInWithEmailAndPassword(input, password);
        // Wrap the push operation in a setTimeout() to ensure it runs right after the promise
        setTimeout(() => history.push('/'), 0);
      } catch (error) {
        console.error('Error logging in', error);
        handleError(error);
      }
    }

    function handleError(error) {
      if (error.code.includes('auth/user-not-found')) {
        setError('User not found');
      } else if (error.code.includes('auth/wrong-password')) {
        setError('Invalid password');
      }
    }

    <AuthError error={error} />
    ```

### [41. Logging in with third party providers - Facebook](https://github.com/sungnga/instagram-clone-app/commit/399e88a631a9cf9b1391a40080119be7e7b46401?ts=2)
- We want our users to be able to log in to our application with a third party provider such as with Facebook or Google. To do this, we need to enable a third party auth in the Firebase Authentication console

**Facebook login setup:**
- Go to Facebook developers website: https://developers.facebook.com/
- Once logged in with Facebook account, click on the 'Add a New project' button
- Select the 'Build Connected Experiences' option. Give the project a name
  - If problem occurs with security check, enable adBlock or use a different browser
- In Facebook developers dashboard, select the *Add Products icon* in menu on the left
  - Click on Facebook Login -> Set Up button. Then select for the Web
- In the Settings menu on the left, click on Basic tab
  - Copy the App ID and copy the App Secret
- Go to Firebase Authentication page and under the 'Sign-in method' tab
  - Enable Facebook Sign-in
  - Paste in the App ID and App Secret
  - Copy the OAuth redirect URI underneath it
  - Don't forget to Save
- In the *Facebook Login* menu on the left, click on Settings tab
  - We need to provide info for: Valid OAuth Redirect URIs
  - Paste in the OAuth Redirect URI
  - Don't forget to Save changes

**Implement Facebook login functionality:**
- In src/auth.js file:
  - Instantiate a Facebook provider by calling `new firebase.auth.FacebookAuthProvider()`
  - Write a logInWithFacebook function that logs in a user with facebook provider
    - Call the `firebase.auth().signInWithPopup()` method and pass in the facebookProvider as an argument. This is an async operation so add the await keyword in front of it. What we get back is the user data and assign it to a `data` variable
    - Console log the data to see what we get back, because we will use this data to create a new user object in our database
    - Write an if statement that if `data.additionalUserInfo.isNewUser` is true, call createUser() to create a new user in our graphQL database
      - Destructure the properties from data.user we need in order to populate the user data
      - Create a `variables` object that contains the user properties/values
      - Pass this `variables` object to the createUser() method as an argument
    - We're not handling any errors from the promise at the moment. We will do that later
  - Then pass down the logInWithFacebook function to `AuthContext.Provider` to make it available in our components
    ```js
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    // const googleProvider = new firebase.auth.GoogleAuthProvider();

    async function logInWithFacebook() {
      const data = await firebase.auth().signInWithPopup(facebookProvider);
      if (data.additionalUserInfo.isNewUser) {
        // console.log({ data });
        const { uid, displayName, email, photoURL } = data.user
        const username = `${displayName.replace(/\s+/g, "")}${uid.slice(-5)}`
        const variables = {
          userId: uid,
          name: displayName,
          username,
          email,
          bio: '',
          website: '',
          phoneNumber: '',
          profileImage: photoURL
        };
        await createUser({ variables });
      }
    }
    ```
- In src/pages/login.js file:
  - Import the AuthError component from signup.js file
  - Import AuthContext from auth.js file
  - Call useContext() hook and pass in AuthContext as an argument. Destructure the logInWithFacebook function from it
  - Call useHistory() hook and assign the result to a `history` variable. Later we want to call history.push() to redirect user to feed page once they're successfully logged in
  - Create a piece of error state and initialize it to an empty string
  - In the return section:
    - Render the `<AuthError />` component just below the Facebook Log In button. Pass down error props and set it to error state. In any error occurs during login with Facebook, the error message will be displayed here
    - In the Facebook button element, add an onClick event handler and set it to handleLogInWithFacebook function
  - Write an async handleLogInWithFacebook function that calls the logInWithFacebook() method to login user through Facebook
    - Use a try/catch block to make the request and catch an errors from Firebase auth
    - If successful with log in with Facebook, call history.push() to redirect user to feed page. Call the history.push() inside a setTimeout() function to ensure that the redirect get executed
    - If an error comes back from the promise, 
      - console log the error to the console
      - call setError() and pass in error.message as an argument to set error state. The AuthError component will display error message stored in error state to the login page
    ```js
    export function LoginWithFacebook({ color, iconColor, variant }) {
      const { logInWithFacebook } = useContext(AuthContext);
      const [error, setError] = useState('');
      const history = useHistory();

      async function handleLogInWithFacebook() {
        try {
          await logInWithFacebook();
          setTimeout(() => history.push('/'), 0);
        } catch (error) {
          console.error('Error logging in with Facebook', error);
          setError(error.message);
        }
      }

      return (
        <Fragment>
          <Button
            onClick={handleLogInWithFacebook}
            fullWidth
            color={color}
            variant={variant}
          >
            <img
              src={facebookIcon}
              alt='facebook icon'
              className={classes.facebookIcon}
            />
            Log In With Facebook
          </Button>
          <AuthError error={error} />
        </Fragment>
      );
    }
    ```


## ME SUBSCRIPTION AND EDITING USER DATA
- Now that we've got authentication, we can focus on all of the routes that only logged in users can see
- The first page that we'll work on is the Edit Profile page

### [42. Creating a ME subscription and UserContext](https://github.com/sungnga/instagram-clone-app/commit/e594c9201dade2cb36ace5d2a533cd7f6c00ce4b?ts=2)
- Before that, we want to find the means to pass all of the current users information to any components or page in our app. A convenient means of doing that, like we've done in auth.js file is context. We created some context for authorization related information. Now we're going to create some context for the user information
- The way we're going to get the currently logged in user's info is by getting the user's id and use it to perform a request in order to get the user's current info at that time from Hasura
- Then we're going to provide the user data to all authenticated user routes/pages via user context provider
- **Create the UserContext:**
- In src/app.js file and in App component:
  - Above the App component, call createContext() hook to create a new context and assign it to a variable called UserContext. Name export it
  - Write a ternary that if we're authenticated (if isAuth is true), get the current user id from Firebase Auth in `authState.user.uid`. Assign this uid to userId variable. If not authenticated, assign userId to null
  - Then pass down this userId as an object to a `variables` variable. We're going to use this `variables` to make a request to Hasura graphQL to get the user info from the database
  ```js
  export const UserContext = createContext();

  const userId = isAuth ? authState.user.uid : null;
  const variables = { userId };
  ```
- **Create a ME subscription:**
- In src/graphql/subscriptions.js file:
  - Write a ME subscription (this is convention when getting the current user's info) that executes the me subscription function
  - The me subscription function:
    - accepts a userId as a parameter and it's optional
    - finds a user by the given userId
    - returns the user data that we specified
    ```js
    import { gql } from '@apollo/client';

    export const ME = gql`
      subscription me($userId: String) {
        users(where: { user_id: { _eq: $userId } }) {
          id
          user_id
          name
          username
          profile_image
          last_checked
        }
      }
    `;
    ```
  - Name export ME
  - NOTE: it's best to write the me subscription function in the Hasura console and run it to make sure that we get the user data. And then just paste the code here
- **Subscribe to ME subscription and provide UserContext to user routes:**
- In src/app.js file:
  - Name import useSubscription hook from @apollo/client
  - Name import ME subscription from subscriptions.js file
  - Import the LoadingScreen component
  - Call the useSubscription() hook and pass in the ME subscription as the 1st arg and an object that contains the variables as 2nd arg. This hook will execute the Me subscription based on the userId we provide. What we get back is the user data and loading properties and we can destructure those
  - If we're loading, we want to show the loading screen. Write an if statement to check if loading is true. If it is, return the `<LoadingScreen />` component
  - Then create a variable for `me`, that is the current user. This is the value that we're going to be using across our app to get all of the data that we requested. The user data object can be found at `data.users[0]`
  - Write a ternary that if `isAuth` is true AND `data` exists, then assign `data.users[0]` to the `me` variable. Else set `me` variable to null
  - Create a `currentUserId` variable and set it to `me.id`
  - Lastly, to make the user data be available to all authenticated user routes, wrap all the routes inside the `<UserContext.Provider />` provider component
    - Pass down an object which contains me and currentUserId as a value props
    ```js
    import { useSubscription } from '@apollo/client';
    import { ME } from './graphql/subscriptions';
    import LoadingScreen from './components/shared/LoadingScreen';

    const { data, loading } = useSubscription(ME, { variables });

    if (loading) return <LoadingScreen />;

    const me = isAuth && data ? data.users[0] : null;
    const currentUserId = me.id;

    return (
      <UserContext.Provider value={{ me, currentUserId }}>
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
      </UserContext.Provider>
    );
    ```

### [43. Getting edit user profile data](https://github.com/sungnga/instagram-clone-app/commit/25aedb49046affe516b8d9beb462b282fbbc8f55?ts=2)
- Let's populate the user data in Edit User Profile form
- To get the user data, we send a query to Hasura graphQL with the currentUserId
- Once we get the data back we can pass it down to the EditUserInfo component
- **Write a GET_EDIT_USER_PROFILE query:**
- In src/graphql/queries.js file:
  - Write a query that executes the getEditUserProfile query function
    - the getEditUserProfile accepts an id as a parameter
    - it returns a user information requested
  - Using `users_by_pk` means return users by primary key, which we set to id. This will return a single user object by id. Using `users` will return an array of users
  ```js
  export const GET_EDIT_USER_PROFILE = gql`
    query getEditUserProfile($id: uuid!) {
      users_by_pk(id: $id) {
        bio
        email
        id
        name
        phone_number
        profile_image
        website
        username
      }
    }
  `;
  ```
- **Make a GET_EDIT_USER_PROFILE query in EditProfilePage component:**
- In src/pages/edit-profile.js file
  - Import UserContext from App.js file
  - Import LoadingScreen component
  - Import GET_EDIT_USER_PROFILE query
  - Call useContext() hook and pass in UserContext as an argument. This way we have access to the currentUserId and we can destructure from it
  - Create a `variables` variable and set it to an object which contains an id property of currentUserId
  - Call the useQuery() hook to make a query request to Hasura
    - 1st arg is the name of the query, GET_EDIT_USER_PROFILE
    - 2nd arg is an object of the `variables` that we created
    - What we get back is the data and loading
  - Write an if statement that loading is true, return the `<LoadingScreen />` component
  - Lastly, pass down the user data found in `data.users_by_pk` to the `<EditUserInfo />` child component
  ```js
  import { UserContext } from '../App';
  import LoadingScreen from '../components/shared/LoadingScreen';
  import { GET_EDIT_USER_PROFILE } from '../graphql/queries';

  const { currentUserId } = useContext(UserContext);
  // console.log({me, currentUserId})
  const variables = {id: currentUserId}
  const { data, loading} = useQuery(GET_EDIT_USER_PROFILE, {variables})

  if (loading) return <LoadingScreen />

  <main>
    {path.includes('edit') && <EditUserInfo user={data.users_by_pk} />}
  </main>
  ```

### [44. Client-side: Validating EditUserInfo form](https://github.com/sungnga/instagram-clone-app/commit/3fc8cde886f26e3851d0149681f2943ab0d09b7e?ts=2)
- Now that the user information is populated in the user edit profile form, the user can change them. However, we still need to validate the form. For example, we want to make sure that the username isn't one that's taken by another user already, the website is an actual URL, the bio isn't too long, the email isn't another user's email, and that the phone number is an actual real phone number
- We'll be using the useForm hook from react-hook-form again to do the validation
- In src/pages/edit-profile.js file and in *EditUserInfo component*:
  - Name import the useForm hook from react-hook-form
  - Import isURL from validator/lib/isURL
  - Call useForm() hook at the top of the EditUserInfo component and set the mode property to 'all'. What we get back are register and handleSubmit
  - Then in the form element and add validation for each input field, 
    - add an `inputRef` property and set it to the `register()` method. This method allows us to specify any requirements we want on the input field, such as whether it is required or not, the max and min length of characters, etc 
    - add a `name` property and set it to the name of the field
    - use `validate` property to check if the input is valid or not. Validate if the website URL is valid using isURL(), email input isEmail(), and phone number input isMobilePhone()
  - For the onSubmit event handler of the form element, set it to the handleSubmit() method and pass in the `onSubmit` function
  - Write an onSubmit function:
    - This function receives data as an argument. The form data is collected by the handleSubmit() function from useForm() hook
    - For now, lets console log the data to see what we get
    ```js
    import { useForm } from 'react-hook-form';
    import isURL from 'validator/lib/isURL';
    import isMobilePhone from 'validator/lib/isMobilePhone';
    import isEmail from 'validator/lib/isEmail';

    const { register, handleSubmit } = useForm({ mode: 'all' });

    function onSubmit(data) {
      console.log({ data });
    }

    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <SectionItem
        name='website'
        inputRef={register({
          validate: (input) =>
            Boolean(input)
              ? isURL(input, {
                  protocols: ['http', 'https'],
                  require_protocol: true
                })
              : true
        })}
        text='Website'
        formItem={user.website}
      />
    </form>
    ```

### [45. Updating the EditUserInfo in Postgres database](https://github.com/sungnga/instagram-clone-app/commit/dc621494d6f089ebfa197b60bdd8325c6f4fbd98?ts=2)
- The next step we need to do is to perform a mutation to update the user information in the Postgres(Hasura graphQL) database
- **Perform an editUser mutation in Hasura console:**
  - The name of the mutation is `editUser`
  - The option we want to perform is `update_users`. Using the `update_users_by_pk` option is ok too
  - We want to update a user `where` its id matches the given user id
  - This mutation accepts these variables as arguments:
    - $id: a uuid and it's required
    - $name: a String type and it's required
    - $username: a String type and it's required 
    - $bio: a String type and it's required
    - $email: a String type and it's required
    - $website: a String type and it's required
    - $phoneNumber: a String type and it's required
  - Then use `_set` to set the name, username, bio, email, phone_number, and website properties to the matching variable names. This will update the user info in the database
  - Check the `affected_rows` box
  ```js
  mutation editUser($id: uuid!, $name: String!, $username: String!, $bio: String!, $email: String!, $website: String!, $phoneNumber: String!) {
    update_users(where: {id: {_eq: $id}}, _set: {bio: $bio, email: $email, name: $name, phone_number: $phoneNumber, username: $username, website: $website}) {
      affected_rows
    }
  }
  ```
- **Create an EDIT_USER mutation:**
- In src/graphql/mutations.js file:
  - Write an EDIT_USER mutation that executes the editUser mutation function
  ```js
  export const EDIT_USER = gql`
    mutation editUser(
      $id: uuid!
      $name: String!
      $username: String!
      $bio: String!
      $email: String!
      $website: String!
      $phoneNumber: String!
    ) {
      update_users(
        where: { id: { _eq: $id } }
        _set: {
          bio: $bio
          email: $email
          name: $name
          phone_number: $phoneNumber
          username: $username
          website: $website
        }
      ) {
        affected_rows
      }
    }
  `;
  ```
- **Use the EDIT_USER mutation in EditUserInfo component:**
- In src/pages/edit-profile.js file and in *EditUserInfo component*:
  - Name import the EDIT_USER mutation from mutations.js file
  - At the top of the EditUserInfo component, call the useMutation() hook and pass in the EDIT_USER mutation as an argument. What we get back is the editUser mutation function. We'll call this function inside the onSubmit function to make a request to update user info in the database
  - In onSubmit function:
    - Make the onSubmit function an async function
    - Use a try/catch block to perform the editUser mutation
    - Create a `variables` object that contains the existing data (use the spread operator) and set id to user.id
    - Call the editUser() mutation and pass in the `variables` object as an argument. This is an async operation so add the await keyword in front of it
    ```js
    import { EDIT_USER } from '../graphql/mutations';

    const [editUser] = useMutation(EDIT_USER);

    async function onSubmit(data) {
      try {
        const variables = { ...data, id: user.id };
        await editUser({ variables });
      } catch (error) {

      }
    }
    ```

### [46. Updating user email in Firebase auth](https://github.com/sungnga/instagram-clone-app/commit/ca31184cdb03417e26b496768663710b591c6158?ts=2)
- If the user decides to update their email address in EditUserInfo form, we need to update that in both the Postgress database and in Firebase Authentication. Firebase uses the email to authenticate a user when they log in or sign up. If the email is not updated in Firebase auth, the user won't be able to login with this updated email. For this, we need to write a separate function to update the user's email in Firebase auth
- In src/auth.js file:
  - Write an async updateEmail function that updates user email in Firebase auth
    - This function accepts email as a parameter
    - Call the `authState.user.updateEmail()` method and pass in the email as an argument to update the email
    - Console log authState.user to make sure that the email is updated
    ```js
    async function updateEmail(email) {
      await authState.user.updateEmail(email);
      console.log(authState.user);
    }
    ```
  - Pass down the updateEmail function as props to the `<AuthContext.Provider />` component to make it available for our app to consume
- In src/pages/edit-profile.js file and in *EditUserInfo component*:
  - Name import the AuthContext from auth.js file
  - At the top of the EditUserInfo component, call useContext() hook and pass in the AuthContext as an argument. Then we can get the updateEmail function from it
  - In the onSubmit function:
    - IMPORTANT!: Call the updateEmail() method ABOVE the editUser() method and pass in data.email as an argument. We want to make sure that the email is updated on Firebase auth first before updating the email in Hasura database. The user must be authenticated first before they can update their info in the database, which is the editUser() function
    - Updating the Firebase is an async operation so add the await keyword in front of updateEmail()
    ```js
    import { AuthContext } from '../auth';

    const { updateEmail } = useContext(AuthContext);
    
    async function onSubmit(data) {
      try {
        const variables = { ...data, id: user.id };
        await updateEmail(data.email);
        await editUser({ variables });
      } catch (error) {
        console.error('Error updating profile', error);
      }
    }
    ```

### [47. Server-side: handling error and validating EditUserInfo form](https://github.com/sungnga/instagram-clone-app/commit/661fdce7191e131001eaf181ea4606fc1b9cfe4c?ts=2)
- In src/pages/edit-profile.js file and in *EditUserInfo component*:
  - Create a piece of `error` state and specify the `type` of error and the error `message` and initialize them to empty strings
  - Write a handleError function that calls the setError() to update the error state. It's updating the error type and error message in error state
  - In onSubmit function:
    - In catch block, call the handleError() method and pass in the error as an argument. The error comes from the return promise
    - Console log the error to the console as well
  - Now that we have the error stored in the error state, we want to show the error message next to the input field (in SectionItem component) that generated the error
    - In the EditUserInfo component:
      - For the `<SectionItem />` components (for username and email input fields) in form element, we provide the error data to the `error` props 
    - In the SectionItem component:
      - It receives the error props from the EditUserInfo parent component
      - In the TextField component, add the `helperText` property to display the error.message
      - `helperText={error?.type === name && error.message}`
  - NOTE: The first time when a user tries to update their email, they will get an error message saying they must first logout of our app and log back in with Facebook again. Once they successfully log back in, they need to go back to the EditUserProfile page and try to update their email again
    - If successful, the email should now be updated in both Firebase auth and Postgres database
  - Lastly, once the user fix the error and resubmit the form, we want to clear out the error message in error state and remove the error display shown in form
    - In onSubmit function, call setError() to set the error state back to empty strings
    ```js
    const DEFAULT_ERROR = { type: '', message: '' };

    const [error, setError] = useState(DEFAULT_ERROR);

    async function onSubmit(data) {
      try {
        setError(DEFAULT_ERROR);
        const variables = { ...data, id: user.id };
        await updateEmail(data.email);
        await editUser({ variables });
      } catch (error) {
        console.error('Error updating profile', error);
        handleError(error);
      }
    }

    function handleError(error) {
      if (error.message.includes('users_username_key')) {
        setError({ type: 'username', message: 'This username is already taken' });
      } else if (error.code.includes('auth')) {
        setError({ type: 'email', message: error.message });
      }
    }
    ``` 

### [48. Showing success snackbar after form submission](https://github.com/sungnga/instagram-clone-app/commit/306bebe59729f8c27b9b1089dfa76bcba4bb669b?ts=2)
- Once the user info has been successfully updated, we want to show a snackbar to the user letting them know that their profile has been updated
- The snackbar will display for 2 seconds and closes/disappears automatically
- In src/pages/edit-profile.js file and in *EditUserInfo component*:
  - Import the Snackbar and Slide components from Material UI
  - Create a piece of state called open and initialize it to false. This state keeps track of whether the snackbar is open or not
  - In the onSubmit function and in the try block:
    - After the editUser() method, call setOpen() and pass in true
    - The editUser() function is an async operation. Only after the user info has been updated in the database and a promise is returned then the open state is set to true and that in turn, render the Snackbar component 
  - Render the `Snackbar />` component underneath the form element
    - Set the open props to open state
    - Set the autoHideDuration props to 3000 milliseconds
    - For onClose event handler, inside a callback, call setOpen() and pass in false. This will close the snackbar
    - Set the message props to say 'Profile updated' in a span element
    ```js
    import { Slide, Snackbar } from '@material-ui/core';
    
    const [open, setOpen] = useState(false);

    <Snackbar
      open={open}
      autoHideDuration={2000}
      TransitionComponent={Slide}
      message={<span>Profile updated</span>}
      onClose={() => setOpen(false)}
    />
    ```


## UPLOADING AVATARS AND ADDING USER SEARCH
- The next feature we want to build is the ability to update/upload a profile photo
  - A pop-up dialog box will open and will enable a current user to select whatever image they want to upload
  - We will be using an image service called Cloudinary to upload and store the profile image. It will return to us a URL which we can then use to update the current user information

### [49. Uploading image file to Cloudinary](https://github.com/sungnga/instagram-clone-app/commit/337a041a06301469912f66d5658d14c577a3b5d8?ts=2)
- **Create upload preset in Cloudinary:**
  - In Cloudinary console and at the top menu bar, select the Settings icon
  - Then select the Upload tab at the top
  - Scroll down to the 'Upload presets' section and click on the 'Add upload preset' button
  - Set the following:
    - Upload preset name: instagram (this name will be used for upload_preset in handleImageUpload function)
    - Signing Mode: Unsigned
    - Folder: Instagram
  - Click the Save button
- **Create a handleImageUpload utility function:**
- In src/utils/handleImageUpload.js file:
  - We will be uploading images in several places of our app, so it's best to write the image upload function as a utility function
  - Write an async handleImageUpload function that makes a request to Cloudinary to upload an image
    - This function accepts image as a parameter
    - Call the fetch() method to make a request to Cloudinary
      - 1st arg is the API Base URL
      - 2nd arg we provide is an object that contains the method of request, the format type that it accepts, and the data itself
      - This is an async operation, so add an await keyword in front of it
    - What we get back is a response and we need to convert it into a json format
    - Then return the url from the response object
    ```js
    async function handleImageUpload(image) {
      // FormData() is a constructor that returns a data object
      // What we append to data object is key/value pair
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'instagram');
      data.append('cloud_name', 'sungnga');
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/sungnga/image/upload',
        {
          method: 'POST',
          accept: 'application/json',
          body: data
        }
      );
      const jsonResponse = await response.json();
      return jsonResponse.url;
    }

    export default handleImageUpload;
    ```
- **Upload profile image file from Edit Profile form:**
- Next is we need to get the image data from the file upload dialog box and pass it to the handleImageUpload function. In the EditUserInfo form, when a user clicks on the 'Change Profile Photo' link, a file dialog opens and they can select an image file to upload
- In src/pages/edit-profile.js file and in *EditUserInfo component*:
  - Import the handleImageUpload util function
  - In the return section:
    - Add an input element where
      - its type is set to `file`. By setting the type to file, it'll open up a file dialog
      - it accepts any type of images
      - set the onChange event handler to the handleUpdateProfilePic function
    - Now, we don't want to show this input element. Instead, we want to link it to the 'Change Profile Photo' button. So when the user clicks on the button, it'll open the file dialog
    - This can be achieved by setting the id property to 'image' in the input element and wrap the button in a label element and set the htmlFor property to the same name of 'image'
  - Write an async handleUpdateProfilePic function that executes that handleImageUpload method with the provided image file
    - This function accepts an event as an argument. The event data comes from the input element
    - The image file can be found at event.target.files[0]
    - What we get back from the handleImageUpload() method is the image url from Cloudinary
    ```js
    import handleImageUpload from '../utils/handleImageUpload';

    async function handleUpdateProfilePic(event) {
      const url = await handleImageUpload(event.target.files[0]);
      console.log({ url });
    }

    <input
      accept='image/*'
      id='image'
      type='file'
      style={{ display: 'none' }}
      onChange={handleUpdateProfilePic}
    />
    <label htmlFor='image'>
      <Typography
        className={classes.typographyChangePic}
        color='primary'
        variant='body2'
      >
        Change Profile Photo
      </Typography>
    </label>
    ```

### [50. Performing a mutation to update and display user avatar](https://github.com/sungnga/instagram-clone-app/commit/69abee18ecceb2d6775098b163e78fc44e5f2b15?ts=2)
- To display the profile image that the user just uploaded as their avatar, we first need to update the user's profile_image property in the database with the URL we get back from Cloudinary. We do this by creating an update users mutation in Hasura that updates the user profile image based on the given user id
- **Create an update EDIT_USER_AVATAR mutation:**
- In src/graphql/mutations.js file:
  - Create an EDIT_USER_AVATAR mutation that executes the editUserAvatar mutation function
  - The editUserAvatar() function accepts the id and profileImage variables as arguments
    - It performs a users update based on the given user id
    - It sets the provided image data to the profile_image property
    ```js
    export const EDIT_USER_AVATAR = gql`
      mutation editUserAvatar($id: uuid!, $profileImage: String!) {
        update_users(
          where: { id: { _eq: $id } }
          _set: { profile_image: $profileImage }
        ) {
          affected_rows
        }
      }
    `;
    ```
- **Implement the upload user avatar functionality:**
- In src/pages/edit-profile.js file and in *EditUserInfo component*:
  - Name import the EDIT_USER_AVATAR mutation
  - Call useMutation() hook and pass in the EDIT_USER_AVATAR mutation as an argument. We get back the editUserAvatar mutation function
  - In the handleUpdateProfilePic function:
    - Create a `variables` object which contains the user id data and the profileImage data
    - Call the editUserAvatar() method and pass in the `variables` object as an argument
  - To see the updated profile image in realtime when the page first loads, we want to create a piece of state to store the profileImage and the page will render the stored profileImage
    - Create a state called profileImage and initialize it to `user.profile_image`. Remember that the EditUserInfo component has access the user data object from its EditProfilePage parent component. And the EditProfilePage component makes a query mutation to get the user info from the database
    - By storing the profileImage in a state, the image persists when the page refreshes
  - In the handleUpdateProfilePic function:
    - After the `await editUserAvatar()` is completed and we get back the url, call the setProfileImage() and pass in the url as an argument. This will store the url in the profileImage state
  - Then in the `<ProfilePicture />` component, set the image property to the profileImage state
  ```js
  import { EDIT_USER_AVATAR } from '../graphql/mutations';

  const [editUserAvatar] = useMutation(EDIT_USER_AVATAR);
  const [profileImage, setProfileImage] = useState(user.profile_image);

	async function handleUpdateProfilePic(event) {
		const url = await handleImageUpload(event.target.files[0]);
		// console.log({ url });
		const variables = { id: user.id, profileImage: url };
		await editUserAvatar({ variables });
		setProfileImage(url);
	}

  <ProfilePicture size={38} image={profileImage} />
  ```

### [51. Implementing the search bar functionality](https://github.com/sungnga/instagram-clone-app/commit/6bfe367fa3153698d42ccd8bdab9afffbf0f5398?ts=2)
- The next feature we want to implement is the ability to search for other users using the search bar. We can search by their name or username and search will give us a list of suggested users as we type
- We perform a query operation in Hasura to get the users based on the query string
- **Create a SEARCH_USERS query:**
- In src/graphql/queries.js file:
  - Write a SEARCH_USERS query that executes the searchUsers query function
    - This function takes a query string variable as an argument
    - Query the users database *where* the username *or* name *islike* the given query string. We use `_ilike` (isLike) instead of `_eq` (equal) because we don't want just the exact match. We want users that is like the query string variable
    - It returns the id, name, username, and profile_image
    ```js
    export const SEARCH_USERS = gql`
      query searchUsers($query: String) {
        users(
          where: {
            _or: [{ username: { _ilike: $query } }, { name: { _ilike: $query } }]
          }
        ) {
          id
          name
          username
          profile_image
        }
      }
    `;
    ```
  - Now, when performing the query, we need to wrap the query around a set of percent symbols. That's what allows us to do the search-ahead operation. It returns all users that's close to what we type into the search bar
    ```js
    {
      "query": "%nga%"
    }
    ```
- **Perform the SEARCH_USERS query in Navbar:**
- In src/components/shared/Navbar.js file and in the *Search component*:
  - Import the SEARCH_USERS query from queries.js file
  - Import the useLazyQuery hook from @apollo/client
  - We're going to use useLazyQuery() hook instead of useQuery() hook to perform the query operation
    - A search operation is a good use-case for the lazy query because it doesn't need to be immediate and it's not something that we're performing once and get the exact results on
    - Also it's a synchronous operation so we don't need to wait for a promise
    - Since it's synchronous, we can call the query function inside useEffect() hook
  - Call useLazyQuery() hook and pass in the SEARCH_USERS query as an argument. What we get back from the hook is an array:
    - the 1st element is the searchUsers query function
    - 2nd element is an object containing the data that we get back from calling the searchUsers() method
    ```js
    import { useLazyQuery } from '@apollo/client';
    import { SEARCH_USERS } from '../../graphql/queries';

    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searchUsers, { data }] = useLazyQuery(SEARCH_USERS);

    useEffect(() => {
      if (!query.trim()) return;
      setLoading(true);
      const variables = { query: `%${query}%` };
      searchUsers({ variables });
      if (data) {
        setResults(data.users);
        setLoading(false);
      }
      // setResults(Array.from({ length: 5 }, () => getDefaultUser()));
    }, [query, data, searchUsers]);
    ```

### [52. Displaying current user avatar in Navbar](https://github.com/sungnga/instagram-clone-app/commit/180511c889e172c7272de8dd1a8b2a7ac9125a2c?ts=2)
- In src/components/shared/Navbar.js file and in the *Links component*:
  - Name import the UserContext context
  - Call useContext() hook and pass in the UserContext as an argument. What we get back from it is the `me` object which contains the current user info
  - In the `<Avatar />` component, set the src props to `me.profile_image`
  - Since the `me` subscription that we're executing is a subscription, we'll see the change in realtime whenever the avatar is updated within any page or component
  ```js
  import { UserContext } from '../../App';

  const { me } = useContext(UserContext);

  <Avatar src={me.profile_image} className={classes.profileImage} />
  ```


## ADDING NEW POSTS AND UPLOADING MEDIA
- The next feature we're going to build is for our current user to be able to add a new post
  - To create a new post, the user can click on the Add Post icon on the Navbar menu
  - A file upload dialog box opens and the user can select an image to upload
  - Then a full-screen AddPostDialog box opens that allows users to write a caption for the post, add a location, and click the Share button to share the post. This is a rich text editor (using Slate library), allowing users to format their caption text
  - The media file that the user uploaded will be stored in Cloudinary
- We will be creating a posts table in Hasura to store the posts data. We'll also setup relationships between the post and the user who created it

### [53. Client-side: building the add new posts functionality](https://github.com/sungnga/instagram-clone-app/commit/a77a5d8a3b767b4b090745ed95a54774e53b8be7?ts=2)
- In src/components/shared/Navbar.js file and in the *Links component*:
  - Create a piece of state called media and initialize it to null. This keeps track of the media file the user uploaded to create a new post
  - Create a piece of state called showAddPostDialog and initialize it to false. This keeps track of whether the AddPostDialog screen is open or not
  - Add an input element and set the type to file. This will accept a file as input. However, this input element won't be displayed. The AddIcon button will control the file upload functionality
  - When the AddIcon link on the Navbar is clicked, it opens a file upload dialog box for user to upload a media. When the AddIcon is clicked, the OpenFileInput() method is executed to open the file dialog box
  - Once a file is selected, handleAddPost() is triggered to take the file data and store it in media state. Also, setAddPostDialog() is called to set showAddPostDialog state to true
  - Import the AddPostDialog component
  - In the return section of the Links component:
    - Just above the input element, render the `<AddPostDialog />` component IF showAddPostDialog state is true
    - Pass down the media props and set it to media state and pass down the handleClose function as props to the AddPostDialog child component 
    ```js
    import AddPostDialog from '../post/AddPostDialog';

    const [media, setMedia] = useState(null);
    const [showAddPostDialog, setAddPostDialog] = useState(false);
    const inputRef = useRef();

    function openFileInput() {
      inputRef.current.click();
    }

    function handleAddPost(event) {
      setMedia(event.target.files[0]);
      setAddPostDialog(true);
    }

    function handleClose() {
      setAddPostDialog(false);
    }

    {showAddPostDialog && (
      <AddPostDialog media={media} handleClose={handleClose} />
    )}
    <Hidden xsDown>
      <input
        type='file'
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleAddPost}
      />
      <AddIcon onClick={openFileInput} />
    </Hidden>
    ```
- In src/components/post/AddPostDialog.js file:
  - Receive the media and handleClose props from the Links parent component
  - Just render some text for now. We just need to see that this component renders once a user uploaded a file
  ```js
  import React from 'react';

  function AddPostDialog({ media, handleClose }) {
    console.log('open');

    return <span>AddPostDialog</span>;
  }

  export default AddPostDialog;
  ```

### [54: Adding posts table and configure relationships in Hasura](https://github.com/sungnga/instagram-clone-app/commit/1f1b149980a9ee879f0aff5bd515c17065c17269?ts=2)
- **Create posts table in Hasura graphQL:**
  - In Hasura console, click on the DATA tab at the top and click on Create Table button
  - Table Name: posts
  - Columns:
    - id : type of UUID : gen_random_uuid()
    - media : type of Text
    - caption : type of Text
    - user_id : type of UUID
    - location : type of Text
    - created_at : type of Timestamp : now()
  - Primary Key: id
  - Now we have two tables in Hasura: users and posts
- **Configure relationships between posts and users tables:**
  - In Hasura console, click on the DATA tab at the top. This is where we configure the relationships
  - When a post is created, we want to associate the post to the user who created it. A post as a user_id property and we can use that to reference to a user's id and vise versa
  - Lets start with the users table. For every one user, there can be as many posts as they want to create. It's a one-to-many relationship. In Hasura terms, we call that an array relationship
    - In users table, select the Relationships tab. Then click the Configure button
    - Relationship Type: Array Relationship
    - Relationship Name: posts
    - Reference Schema: public
    - Reference Table: posts
    - From: id
    - To: user_id
    - Relationship: posts.user_id -> users.id (the post's user_id is associated with the user's id. The user_id reference a particular user)
  - When we setup one table as an array relationship, we need to set the opposite table as an object relationship. This is a many-to-one relationship
    - In the posts table, select the Relationships tab. Then click on the Configure button
    - Relationship Type: Object Relationship
    - Relationship Name: user
    - Reference Schema: public
    - Reference Table: users
    - From: user_id
    - To: id
    - Relationship: posts.user_id -> users.id

### [55. Client-side: building the AddPostDialog box component](https://github.com/sungnga/instagram-clone-app/commit/d19f93a91ab359f889e6ad870940d9db0d7df6ad?ts=2)
- **Create a rich text editor for post caption using Slate library:**
  - Slate docs: https://docs.slatejs.org/walkthroughs/01-installing-slate
  - Import: `npm slate slate-react slate-history`
  - Peer dependencies: `npm i react react-dom`
  - Before building out the AddPostDialog component, we want the ability to format text for a given post caption, such as the ability to write on multiple lines. So we need a way to turn what the user typed in to the caption text field (the raw text) into formatted html text. In other words, we need to serialize our text into html
  - To help us do this, we will be using a library called Slate. Slate allows us to build rich text editors
  - In src/components/post/AddPostDialog.js file:
    - Go to Slate docs website and follow the installation instructions
    ```js
    import React, { useEffect, useMemo, useState } from 'react';
    import { createEditor } from 'slate';
    import { Slate, Editable, withReact } from 'slate-react';

    const initialValue = [
      {
        type: 'paragraph',
        children: [{ text: 'this is a paragraph' }]
      }
    ];

    function AddPostDialog({ media, handleClose }) {
      // Create a Slate editor object that won't change across renders
      const editor = useMemo(() => withReact(createEditor()), []);
      // Keep track of state for the value of the editor
      // Add the initial value when setting up our state.
      const [value, setValue] = useState(initialValue);

      // Render the Slate context
      // Add the editable component inside the context
      return (
        <Slate
          editor={editor}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        >
          <Editable />
        </Slate>
      );
    }
    ```
- **Style the AddPostDialog component:**
  - In src/styles.js file:
    - Write a useAddPostDialogStyles hook that defines the styles for the AddPostDialog component
    - Name export it
- **Build the AddPostDialog component:**
  - In src/components/post/AddPostDialog.js file:
    - Call useContext() hook and pass in the UserContext as an argument. Now we have access to `me` object, which is the current user information
    - Create a piece of state called location and initialize it to an empty string. This will store the location value from the location input TextField
    - Build the JSX of the AddPostDialog component. Use Material UI `<Dialog />` component to create the dialog box
      - The media avatar displayed on the right side comes from media props received from parent component
      - The handleClose function is a props received from parent component
      - The caption text value will be stored in the value state
      ```js
      import { useAddPostDialogStyles } from '../../styles';
      import { UserContext } from '../../App';

      function AddPostDialog({ media, handleClose }) {
        const classes = useAddPostDialogStyles();
        const { me } = useContext(UserContext);
        const [value, setValue] = useState(initialValue);
        const [location, setLocation] = useState('');

        return (
          <Dialog fullScreen open onClose={handleClose}>
            <AppBar className={classes.appBar}>
              <Toolbar className={classes.toolBar}>
                <ArrowBackIos onClick={handleClose} />
                <Typography align='center' variant='body1' className={classes.title}>
                  New Post
                </Typography>
                <Button color='primary' className={classes.share}>
                  Share
                </Button>
              </Toolbar>
            </AppBar>
            <Divider />
            <Paper className={classes.paper}>
              <Avatar src={me.profile_image} />
              <Slate
                editor={editor}
                value={value}
                onChange={(newValue) => setValue(newValue)}
              >
                <Editable
                  className={classes.editor}
                  placeholder='Write your caption...'
                />
              </Slate>
              <Avatar
                src={URL.createObjectURL(media)}
                className={classes.avatarLarge}
                variant='square'
              />
            </Paper>
            <TextField
              fullWidth
              placeholder='Location'
              InputProps={{
                classes: {
                  root: classes.root,
                  input: classes.input,
                  underline: classes.underline
                },
                startAdornment: (
                  <InputAdornment>
                    <PinDrop />
                  </InputAdornment>
                )
              }}
              onChange={(event) => setLocation(event.target.value)}
            />
          </Dialog>
        );
      }
      ```

### [56. Server-side: Adding a new post to database and uploading media to Cloudinary](https://github.com/sungnga/instagram-clone-app/commit/3dc3bbb701fc86bfc1e33d94932b71fc6657e584?ts=2)
- A few things take place on the backend when a user clicks the Share post button to add a new post
  - The handleImageUpload utility function gets executed with the provided media data. This uploads the media file to Cloudinary and it returns a URL. All uploaded images are resized to 500x500px by Cloudinary
  - The createPost mutation function gets executed with the provided post data. This creates a new post in the Postgres database. And this post has a reference to the user that created it
  - The caption text is serialized to raw HTML text and it's formatted
- **Serialize caption text input value to HTML:**
  - Serializing to HTML docs: https://docs.slatejs.org/concepts/09-serializing#html
  - Import: `npm i escape-html`
  - In src/utils/serializeToHtml.js file:
    - Write a serialize util function that serializes our paragraph text into raw HTML
    - Go to the docs link above and copy the code from the serialize HTML section
    - For the paragraph text, we are adding a line break `<br>` after each children text
    - This process of serializing text into raw HTML starts when the user clicks on the Share button in the AddPostDialog box. So the serialize function get executed in the AddPostDialog component
    ```js
    import escapeHtml from 'escape-html';
    import { Text } from 'slate';

    const serialize = (node) => {
      if (Text.isText(node)) {
        return escapeHtml(node.text);
      }

      const children = node.children.map((n) => serialize(n)).join('');

      switch (node.type) {
        case 'paragraph':
          return `${children}<br>`;
        case 'link':
          return `<a href="${escapeHtml(node.url)}">${children}</a>`;
        default:
          return children;
      }
    };

    export default serialize;
    ```
- **Resize uploading image in Cloudinary:**
  - Before we submit the image along with the post, we want to resize all incoming images to 500x500 pixels. We configure this in Cloudinary
  - In Cloudinary console, click on the Settings icon at the top
  - Then select the Upload tab and scroll down to the Upload presets section
  - Click on the Edit button for instagram project
  - Select Upload Manipulations on the left menu
  - In the Incoming Transformation section, click on the Edit button
  - Set both the Width and Height to 500
- **Create a CREATE_POST mutation:**
- In src/graphql/mutations.js file:
  - Write a CREATE_POST mutation that executes the createPost mutation function
    - The createPost function takes useId, media, location, and caption variables as arguments
    - Use the `insert_posts` operator to insert a post as an object
    - This mutation doesn't return anything, so select the `affect_rows` option
    ```js
    export const CREATE_POST = gql`
      mutation createPost(
        $userId: uuid!
        $media: String!
        $location: String!
        $caption: String!
      ) {
        insert_posts(
          objects: {
            user_id: $userId
            media: $media
            location: $location
            caption: $caption
          }
        ) {
          affected_rows
        }
      }
    `;
    ```
- **Implement share a post:**
- In src/components/post/AddPostDialog.js file:
  - Import the serialize util function
  - Import the handleImageUpload util function
  - Import the CREATE_POST mutation
  - We don't want our user to be able to submit the post twice. So we're going to disable the Share button while the post is submitting
    - Create a piece of state called isSubmitting and initialize it to false
    - In the Share button component, add a disabled props and set it to isSubmitting state
  - Call the useMutation() hook and pass in the CREATE_POST mutation as an argument. What we get back is the createPost mutation function
  - In the Share button component, set the onClick event handler to handleSharePost
  - Write an async handleSharePost function that executes the handleImageUpload, serialize, and createPost methods
    - Call setSubmitting() and pass in true to set isSubmitting state to true. This will disable the Share button while the post is submitting
    - Call the handleImageUpload() method and pass in media as an argument. This uploads the media file to Cloudinary and it returns a URL. This is an async operation
    - Create a `variables` object that contains the post data
    - Call the createPost() mutation function and pass in the `variables` object as an argument. This is an async operation and it doesn't return anything. This mutation creates a new post in Hasura database
    - Call setSubmitting() to set isSubmitting state back to false
    - Finally, do a full window reload at the end
    ```js
    import { useMutation } from '@apollo/client';
    import serialize from '../../utils/serializeToHtml';
    import handleImageUpload from '../../utils/handleImageUpload';
    import { CREATE_POST } from '../../graphql/mutations';

    const { me, currentUserId } = useContext(UserContext);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState(initialValue);
    const [location, setLocation] = useState('');
    const [createPost] = useMutation(CREATE_POST);

    async function handleSharePost() {
      setSubmitting(true);
      const url = await handleImageUpload(media);
      const variables = {
        userId: currentUserId,
        location,
        caption: serialize({ children: value }),
        media: url
      };
      await createPost({ variables });
      setSubmitting(false);
      window.location.reload();
    }

    <Button
      color='primary'
      className={classes.share}
      disabled={isSubmitting}
      onClick={handleSharePost}
    >
      Share
    </Button>
    ```


## LIKING, SAVING, AND COMMENTING ON POSTS
- The next feature we want to work on is enable a user to like and unlike a post, save and unsave a post, and comment on a post
- We first need to create the likes, saved_posts, and comments tables in Hasura. And configure relationships between the users, posts, likes, comments, and saved_posts tables
- We create a post subscription in order to display realtime post data in our app

### [57: Adding likes, saved_posts, and comments tables in Hasura, configure relationships](https://github.com/sungnga/instagram-clone-app/commit/d48747ea75ebc59d39d592e236d049642dcc9fbe?ts=2)
- **Create the likes table in Hasura graphQL:**
  - Table Name: likes
  - Columns:
    - id : type of UUID : gen_random_uuid()
    - post_id : type of UUID
    - user_id : type of UUID
  - Primary Key: id
- **Create the saved_posts table in Hasura graphQL:**
  - Table Name: saved_posts
  - Columns:
    - id : type of UUID : gen_random_uuid()
    - post_id : type of UUID
    - user_id : type of UUID
    - created_at : type of Timestamp : now()
  - Primary Key: id
- **Create the comments table in Hasura graphQL:**
  - Table Name: saved_posts
  - Columns:
    - id : type of UUID : gen_random_uuid()
    - post_id : type of UUID
    - user_id : type of UUID
    - created_at : type of Timestamp : now()
    - content : type of Text
  - Primary Key: id
- **Configure relationships between tables:**
- Relationships for posts table: 
  - A post can have many likes. posts has an array relationship to likes
  - Configure relationships between posts and likes:
    - Relationship Type: Array Relationship
    - Relationship Name: likes
    - Reference Table: likes
    - From: id (from the posts id)
    - To: post_id (to the post_id stored in likes)
  - A post can have many comments. posts has an array relationship to comments
  - Configure relationships between posts and comments:
    - Relationship Type: Array Relationship
    - Relationship Name: comments
    - Reference Table: comments
    - From: id (from the posts id)
    - To: post_id (to the post_id stored in comments)
  - A post can be saved many times. posts has an array relationship to saved_posts
  - Configure relationships between posts and saved_posts:
    - Relationship Type: Array Relationship
    - Relationship Name: saved_posts
    - Reference Table: saved_posts
    - From: id (from the posts id)
    - To: post_id (to the post_id stored in saved_posts)
- Relationships for users table:
  - A user can have many comments. users has an array relationship with comments
  - Configure relationships between users and comments:
    - Relationship Type: Array Relationship
    - Relationship Name: comments
    - Reference Table: comments
    - From: id (from the users id)
    - To: user_id (to the user_id stored in comments)
  - A user can have many saved_posts. users has an array relationship to saved_posts
  - Configure relationships between users and saved_posts:
    - Relationship Type: Array Relationship
    - Relationship Name: saved_posts
    - Reference Table: saved_posts
    - From: id (from the users id)
    - To: user_id (to the user_id stored in saved_posts)
- Relationships for saved_posts table:
  - A post is saved by a user. saved_posts has an object relationship to users
  - Configure relationships between saved_posts and users:
    - Relationship Type: Object Relationship
    - Relationship Name: user
    - Reference Table: users
    - From: user_id (from the user_id stored in saved_posts)
    - To: id (to the id on users table)
  - A post can be marked as saved. saved_posts has an object relationship to posts
  - Configure relationships between saved_posts and posts:
    - Relationship Type: Object Relationship
    - Relationship Name: post
    - Reference Table: posts
    - From: post_id (from the post_id stored in saved_posts)
    - To: id (to the id on posts table)
- Relationships for likes table:
  - A post is liked. likes has an object relationship to posts
  - Configure relationships between likes and posts:
    - Relationship Type: Object Relationship
    - Relationship Name: post
    - Reference Table: posts
    - From: post_id (from the post_id stored in likes)
    - To: id (to the id on posts table)
- Relationships for comments table:
  - A comment is written by a user. comments has an object relationship to users
  - Configure relationships between comments and users:
    - Relationship Type: Object Relationship
    - Relationship Name: user
    - Reference Table: users
    - From: user_id (from the user_id stored in comments)
    - To: id (to the id on users table)
  - A comment is written on a post. comments has an object relationship to posts
  - Configure relationships between comments and posts:
    - Relationship Type: Object Relationship
    - Relationship Name: post
    - Reference Table: posts
    - From: post_id (from the post_id stored in comments)
    - To: id (to the id on posts table)

### [58. Getting a post from Hasura database](https://github.com/sungnga/instagram-clone-app/commit/cdffe003dbbe4becc903b236d504b5ae771e6307?ts=2)
- Next thing we want to do is querying for a post in Hasura database and display it in our app. We want to subscribe to a post, so that we'll always get a realtime post data when there's an update to the post
- **Create a GET_POST subscription:**
- In src/graphql/subscriptions.js file:
  - The GET_POST subscription executes the getPost subscription function
  - Use the `posts_by_pk` operator to get a post by its primary key, which is an id. This id is the postId that we provide
  - It returns the post's id, caption, created_at, media, location, the user info that created the post, the likes_aggregate, saved_posts (which is who saved this post), and comments
  ```js
  export const GET_POST = gql`
    subscription getPost($postId: uuid!) {
      posts_by_pk(id: $postId) {
        id
        caption
        created_at
        media
        location
        user {
          id
          username
          name
          profile_image
        }
        likes_aggregate {
          aggregate {
            count
          }
        }
        likes {
          id
          user_id
        }
        saved_posts {
          id
          user_id
        }
        comments(order_by: { created_at: desc }) {
          id
          content
          created_at
          user {
            username
            profile_image
          }
        }
      }
    }
  `;
  ```
- In src/pages/post.js file:
  - Pass down the postId value as postId props to the Post child component
- **Perform a GET_POST subscription operation in Post component:**
- In src/components/post/Post.js file and in the *Post component*:
  - Receive the postId props from the PostPage parent component
  - Import the GET_POST subscription from subscriptions.js file
  - Create a `variables` object that contains the postId data. We use this variable object to make a request to backend to get a post based on this postId
  - Call a useSubscription() hook and pass in the GET_POST subscription as 1st arg, and the variables object as 2nd arg. What we get back are the data and loading properties
  - Now we can destructure all the properties we need from the `data.posts_by_pk` object. BTW, it's a good idea to perform the query in Hasura console first to see the structure of the results that we get back
  ```js
  import { useSubscription } from '@apollo/client';
  import { GET_POST } from '../../graphql/subscriptions';

  const variables = { postId };
	const { data, loading } = useSubscription(GET_POST, { variables });
  const { id, media, likes, user, created_at, caption, comments } = data.posts_by_pk;
  ```

### [59. Post component revisited: populating post data](https://github.com/sungnga/instagram-clone-app/commit/ad6384059e2f541efe72c621478b164d484621c1?ts=2)
- **Populate post data in Post component:**
  - Now that we have the post data from the database, we can replace our existing dummy post data with the actual post data in Post component
  - The Post component is being rendered by the PostPage parent component. The change is reflected on the post page. Route: /p/:postId
- **Building the AuthorCaption component:**
- In src/components/post/Post.js file:
  - Below the Post component, write a AuthorCaption component
  - It receives the user, caption, and createdAt props from the Post parent component
  - The AuthorCaption component renders:
    - the user avatar
    - the user username
    - the post caption
    - created at - when the post was created at
- **Building the UserComment component:**
  - Just below the AuthorCaption component, write a UserComment component
  - It receives the comment props from the Post parent component
  - It renders:
    - the comment user avatar
    - the comment user username
    - the comment content
    - when the comment was made

### [60. Implementing like and unlike a post](https://github.com/sungnga/instagram-clone-app/commit/f8e90e5cdc2162e43fb929f2dfb713d8c1f59513?ts=2)
- When a user clicks the like button to like a post, we want to perform a LIKE_POST mutation in Hasura to insert a like instance to the likes table. A like instance contains a postId and userId properties
- When a user clicks unlike button, we perform an UNLIKE_POST mutation in Hasura to delete a like instance to the likes table based on the postId and userId
- We keep track of the liked state for the current user. So the user can toggle between like and unlike button and we display the correct UI button
- Also, since the post is a subscription, any changes made to the post data our app will immediately get updated. In this case, the likesCount UI will automatically get updated when a user likes or unlikes a post
- **Create a LIKE_POST mutation:**
- In src/graphql/mutations.js file:
  - This mutation inserts a like instance into the likes table based on the given postId and userId
  - Use the `insert_likes` operator to insert a like
  - Since this is a subscription, we don't need to return anything and check the `affected_rows` box
  ```js
  export const LIKE_POST = gql`
    mutation likePost($postId: uuid!, $userId: uuid!) {
      insert_likes(objects: { user_id: $userId, post_id: $postId }) {
        affected_rows
      }
    }
  `;
  ```
- **Create an UNLIKE_POST mutation:**
- In src/graphql/mutations.js file:
  - This mutation deletes a like instance from the likes table based on the given postId and userId
  - Use the `delete_likes` operator to delete a like
  - Since this is a subscription, we don't need to return anything and check the `affected_rows` box
  ```js
  export const UNLIKE_POST = gql`
    mutation unlikePost($postId: uuid!, $userId: uuid!) {
      delete_likes(
        where: { post_id: { _eq: $postId }, user_id: { _eq: $userId } }
      ) {
        affected_rows
      }
    }
  `;
  ```
- **Like and unlike a post:**
- In src/components/post/Post.js file and in the *LikeButton component*:
  - Import the UserContext from App.js file
  - Import the LIKE_POST and UNLIKE_POST mutations
  - The LikeButton component receives the likes, authorId, and postId props from the Post parent component
  - Call the useContext() hook and pass in the UserContext as an argument. What we get back is the currentUserId 
  - First thing is we want to check is whether the post has been previously liked by the current user
  - We use the currentUserId to see if it matches a user_id in the likes array. If there's a match, assign a truthy value to the isAlreadyLiked variable
  - Then we can set isAlreadyLiked as an initial value for the liked state
  - Next 
  - Create a `variables` object that contains the postId data and the userId as currentUserId. We use this variables object to perform the mutations in Hasura
  - Call the useMutation() hook and pass in the LIKE_POST mutation as an argument. We get back the likePost mutation function. Do the same thing for UNLIKE_POST to get the unlikePost mutation function
  - In the handleLike function, call the likePost() and pass in the variables object as an argument
  - In the handleUnlike function, call the unlikePost() and pass in the variables object as an argument
  ```js
  import { UserContext } from '../../App';
  import { LIKE_POST, UNLIKE_POST } from '../../graphql/mutations';

  function LikeButton({ likes, authorId, postId }) {
    const classes = usePostStyles();
    const { currentUserId } = useContext(UserContext);
    const isAlreadyLiked = likes.some(({ user_id }) => user_id === currentUserId);
    const [liked, setLiked] = useState(isAlreadyLiked || false);
    const Icon = liked ? UnlikeIcon : LikeIcon;
    const className = liked ? classes.liked : classes.like;
    const onClick = liked ? handleUnlike : handleLike;
    const [likePost] = useMutation(LIKE_POST);
    const [unlikePost] = useMutation(UNLIKE_POST);
    const variables = {
      postId,
      userId: currentUserId
      // profileId: authorId
    };

    function handleLike() {
      // console.log('like');
      setLiked(true);
      likePost({ variables });
    }

    function handleUnlike() {
      // console.log('unlike');
      setLiked(false);
      unlikePost({ variables });
    }

    return <Icon onClick={onClick} className={className} />;
  }
  ```

### [61. Implementing save and unsave a post](https://github.com/sungnga/instagram-clone-app/commit/1ac0ef30cc1a851912502f920445263276dcce15?ts=2)
- The process of implementing the save and unsave a post functionality is very similar to like and unlike a post
- **Create a SAVE_POST mutation:**
  - In src/graphql/mutations.js file:
    ```js
    export const SAVE_POST = gql`
      mutation savePost($postId: uuid!, $userId: uuid!) {
        insert_saved_posts(objects: { user_id: $userId, post_id: $postId }) {
          affected_rows
        }
      }
    `;
    ```
- **Create an UNSAVE_POST mutation:**
  - In src/graphql/mutations.js file:
    ```js
    export const UNSAVE_POST = gql`
      mutation unsavePost($postId: uuid!, $userId: uuid!) {
        delete_saved_posts(
          where: { post_id: { _eq: $postId }, user_id: { _eq: $userId } }
        ) {
          affected_rows
        }
      }
    `;
    ```
- **Save and unsave a post:**
  - In src/components/post/Post.js file and in the *SaveButton component*:
    - The SaveButton component receives the savedPosts and postId props from the Post parent component
    ```js
    import { useMutation } from '@apollo/client';
    import { UserContext } from '../../App';
    import { SAVE_POST, UNSAVE_POST } from '../../graphql/mutations';

    function SaveButton({ savedPosts, postId }) {
      const classes = usePostStyles();
      const { currentUserId } = useContext(UserContext);
      const isAlreadySaved = savedPosts.some(
        ({ user_id }) => user_id === currentUserId
      );
      const [saved, setSaved] = useState(isAlreadySaved || false);
      const Icon = saved ? RemoveIcon : SaveIcon;
      const onClick = saved ? handleRemove : handleSave;
      const [savePost] = useMutation(SAVE_POST);
      const [unsavePost] = useMutation(UNSAVE_POST);
      const variables = {
        postId,
        userId: currentUserId
      };

      function handleSave() {
        // console.log('save');
        setSaved(true);
        savePost({ variables });
      }

      function handleRemove() {
        // console.log('remove');
        setSaved(false);
        unsavePost({ variables });
      }

      return <Icon onClick={onClick} className={classes.saveIcon} />;
    }
    ```

### [62. Implementing create comment on a post](https://github.com/sungnga/instagram-clone-app/commit/1e9a449e350eccb6bbb9f26a3663430b6981a1d6?ts=2)
- The steps to implementing create comment on a post is very much similar to like/unlike and save/unsave functionalities
- **Create a CREATE_COMMENT mutation:**
  - In src/graphql/mutations.js file:
    - The createComment mutation function accepts the postId, userId, and content variables as arguments
    - Since we're subscribing to a post, we don't need to return anything. So check the `affected_rows` box
    ```js
    export const CREATE_COMMENT = gql`
      mutation createComment($postId: uuid!, $userId: uuid!, $content: String!) {
        insert_comments(
          objects: { post_id: $postId, user_id: $userId, content: $content }
        ) {
          affected_rows
        }
      }
    `;
    ```
- **Create a comment on a post:**
  - In src/components/post/Post.js file and in the *Comment component*:
    - The Comment component receives the postId props from the Post parent component
    - Call the useContext() hook and pass in the UserContext as an argument. We get back the currentUserId
    - Call the useMutation() hook and pass in the CREATE_COMMENT mutation as an argument. We get back the createComment mutation function
    - In the button element, add an onClick event handler and set it to handleAddComment
    - Write a handleAddComment function that executes the createComment mutation function. This makes a request to backend to create a comment with the provided data
      - Create a `variables` object which contains the content, postId, and userId data
      - Call the createComment() mutation and pass in the `variables` object as an argument
      - After the comment is submitted, we need to clear the input content. Call setContent() to set the content state back to an empty string
      ```js
      import { useMutation } from '@apollo/client';
      import { UserContext } from '../../App';
      import { CREATE_COMMENT } from '../../graphql/mutations';

      function Comment({ postId }) {
        const classes = usePostStyles();
        const [content, setContent] = useState('');
        const { currentUserId } = useContext(UserContext);
        const [createComment] = useMutation(CREATE_COMMENT);

        function handleAddComment() {
          const variables = {
            content,
            postId,
            userId: currentUserId
          };
          createComment({ variables });
          setContent('');
        }
      }
      ```


## CREATING AND DISPLAYING NOTIFICATIONS

### [63. Performing like notification mutations](https://github.com/sungnga/instagram-clone-app/commit/d1843c97beb56cf120eb1e7814d7007f5c3cffcf?ts=2)
- When a user likes a post, the owner of the post will get a notification about the like
- To implement this feature, we need to create a notifications table in the database and perform notifications mutations of insert or delete a notification whenever a user likes or unlikes a post. The notification instance is associated with a postId, userId, and profileId and has a type of like. There are other types of notifications such as comment and follow, which we will work on later
- **Create a notifications table in Hasura graphQL:**
  - Table Name: notifications
  - Columns:
    - id : type of UUID : gen_random_uuid()
    - created_at : type of Timestamp : now()
    - post_id : type of UUID
    - user_id : type of UUID
    - profile_id : type of UUID
    - type : type of Text
  - Primary Key: id
- **Configure relationships for tables:**
  - Relationships for users table:
    - A user may perform many likes to generate many notifications. users has an array relationship with notifications
    - Configure relationships between users and notifications:
      - Relationship Type: Array Relationship
      - Relationship Name: notifications
      - Reference Table: notifications
      - From: id (from the users id)
      - To: profile_id (to the profile_id stored in notifications)
  - Relationships for notifications table:
    - A notification generated by a user who liked a post. notifications has an object relationship to users
    - Configure relationships between notifications and users:
      - Relationship Type: Object Relationship
      - Relationship Name: user
      - Reference Table: users
      - From: user_id (from the user_id stored in notifications)
      - To: id (to the id on users table)
    - A notification on a post. notifications has an object relationship to posts
    - Configure relationships between notifications and posts:
      - Relationship Type: Object Relationship
      - Relationship Name: post
      - Reference Table: posts
      - From: post_id (from the post_id stored in notifications)
      - To: id (to the id on post table)
  - Relationships for posts table:
    - A post may have many notifications. posts has an array relationship with notifications
    - Configure relationships between posts and notifications:
      - Relationship Type: Array Relationship
      - Relationship Name: notifications
      - Reference Table: notifications
      - From: id (from the posts id)
      - To: post_id (to the post_id stored in notifications)
- **Update the LIKE_POST mutation to include insert_notifications mutation:**
  - In src/graphql/mutations.js file:
    - So when a user clicks on the like button, we're going to perform a LIKE_POST mutation, but we're going to perform 2 mutations when making this request
      - the 1st is `insert_likes` to insert a like to the likes table
      - the 2nd is `insert_notifications` to insert a notification to the notifications table
    - The likePost mutation now accepts one additional argument: profileId
    - The `insert_notifications` mutation accepts 4 arguments: postId, userId, profileId, and type. The type is hard-coded to 'like' value
    ```js
    export const LIKE_POST = gql`
      mutation likePost($postId: uuid!, $userId: uuid!, $profileId: uuid!) {
        insert_likes(objects: { user_id: $userId, post_id: $postId }) {
          affected_rows
        }
        insert_notifications(
          objects: {
            post_id: $profileId
            user_id: $userId
            profile_id: $profileId
            type: "like"
          }
        ) {
          affected_rows
        }
      }
    `;
    ```
- **Update the UNLIKE_POST mutation to include delete_notifications mutation:**
  - In src/graphql/mutations.js file:
    - When a user unlike a post, we want to delete the like notification associated with that user in the notifications table
    - The process is exactly the same as `insert_notifications` mutation for like. Now we want to perform a `delete_notifications` mutation in UNLIKE_POST mutation
    ```js
    export const UNLIKE_POST = gql`
      mutation unlikePost($postId: uuid!, $userId: uuid!, $profileId: uuid!) {
        delete_likes(
          where: { post_id: { _eq: $postId }, user_id: { _eq: $userId } }
        ) {
          affected_rows
        }
        delete_notifications(
          where: {
            post_id: { _eq: $postId }
            user_id: { _eq: $userId }
            profile_id: { _eq: $profileId }
            type: { _eq: "like" }
          }
        ) {
          affected_rows
        }
      }
    `;
    ```
- **Update the LikeButton component:**
  - In src/components/post/Post.js file and in the *LikeButton component*:
    - Update the `variables` object to include the profileId data
      ```js
      const variables = {
        postId,
        userId: currentUserId,
        profileId: authorId
      };
      ```
- Now whenever a user likes a post, a like notification instance is created in the notifications table. When a user unlike a post, the like notification instance gets deleted

### [64. Displaying notifications in NotificationList and NotificationTooltip](https://github.com/sungnga/instagram-clone-app/commit/9a7070408c2f039adf47efe2d58ea764bb1570db?ts=2)
- **Update the ME subscription to include notifications:**
  - In src/graphql/subscriptions.js file:
    - Update the ME subscription to include the notifications field. Set the `order_by` property to created_at timestamp in descending order. This means that a user will get notifications on the most recent notification instances
    ```js
    export const ME = gql`
      subscription me($userId: String) {
        users(where: { user_id: { _eq: $userId } }) {
          id
          user_id
          name
          username
          profile_image
          last_checked
          notifications(order_by: { created_at: desc }) {
            id
            type
            created_at
            post {
              id
              media
            }
            user {
              id
              username
              profile_image
            }
          }
        }
      }
    `;
    ```
- **Display the notifications:**
  - In src/components/shared/Navbar.js file and in the *Links component*:
    - Import the isAfter method from date-fns library
    - Now our `me` object that we get back from the UserContext contains the `notifications` property
    - We can get the new notifications from the me.notifications array by filtering it by created_at date
      - There's an `isAfter()` method provided by the `date-fns` library that we can use to compare the date of created_at against the date of me.last_checked
      - If the created_at date IS AFTER the last_checked date, return and store the results (in an array) in a newNotifications variable
    - If newNotification.length is greater than 0, then set the truthy value in a hasNotifications variable. This variable controls the notifications visibility in the tooltips
    - In the showTooltip state, initialize its value to the hasNotifications variable. So the value of showTooltip state (true or false) is controlled by the hasNotifications value
    - In the `<NotificationList />` component, pass down the me.notifications value as notifications props. The me.notifications array contains all of the notifications on the current user
    - Inside the RedTooltip component and in the `<NotificationTooltip />` component, pass down the newNotifications array as notifications props
    ```js
    import { isAfter } from 'date-fns';

    function Links({ path }) {
      const { me } = useContext(UserContext);
      const newNotifications = me.notifications.filter(({ created_at }) =>
        isAfter(new Date(created_at), new Date(me.last_checked))
      );
      // console.log({newNotifications})
      const hasNotifications = newNotifications.length > 0;
      const [showTooltip, setTooltip] = useState(hasNotifications);

      return (
        {showList && (
          <NotificationList
            notifications={me.notifications}
            handleHideList={handleHideList}
          />
        )}

        <RedTooltip
          arrow
          open={showTooltip}
          onOpen={handleHideTooltip}
          TransitionComponent={Zoom}
          title={<NotificationTooltip notifications={newNotifications} />}
        >
      )
    }
    ```
- **Display the notifications data in NotificationList component:**
  - In the notification list of our current user, we want to display all of the notifications found in me.notifications here
  - In src/components/notification/NotificationList.js file:
    - Receive the notifications props from the Links parent component
    - Then replace the `defaultNotifications` array with the `notifications` array instead. So when mapping over the notifications array, it will display the actual notification data
    - Also display the correct date when the notification was created_at, for both like and follow
    ```js
    function NotificationList({ handleHideList, notifications }) {
      {notifications.map((notification) => { ... })}
    }
    ```
- **Display notifications in NotificationTooltip component:**
  - In the NotificationTooltip component, we only want to display the redToolTip notifications when there's a new notification for the current user
  - We want to show the type of notification and its count in the redTooltip. For example, there are 5 new likes and 2 new followers
  - In src/components/notification/NotificationTooltip.js file:
    - Receive the notifications props from the Links parent component
    - Then we want to figure out how many like notifications and how many follow notifications there are and display them next to the icons
    - Write a countNotifications function that returns a count based on the given notification type
      - This function accepts notificationType as an argument
      - Use the filter() method on the notifications array to filter by the `type` property
      - Return the length of the notifications where its type property is equal to the given notificationType
    - Call the countNotifications() method and pass in 'follow' type as an argument. Store the returned count value in a followCount variable
    - Call the countNotifications() method and pass in 'like' type as an argument. Store the returned count value in a likeCount variable
    - In the return section, write a conditional that if followCount is greater than 0, display/interpolate the followCount value. Do the same to display the likeCount
    ```js
    function NotificationTooltip({ notifications }) {
      const classes = useNavbarStyles();
      const followCount = countNotifications('follow');
      const likeCount = countNotifications('like');

      function countNotifications(notificationType) {
        return notifications.filter(({ type }) => type === notificationType).length;
      }

      return (
        <div className={classes.tooltipContainer}>
          {followCount > 0 && (
            <div className={classes.tooltip}>
              <span aria-label='Followers' className={classes.followers} />
              <Typography>{followCount}</Typography>
            </div>
          )}
          {likeCount > 0 && (
            <div className={classes.tooltip}>
              <span aria-label='Likes' className={classes.likes} />
              <Typography>{likeCount}</Typography>
            </div>
          )}
        </div>
      );
    }
    ```

### [65. Clearing out notifications](https://github.com/sungnga/instagram-clone-app/commit/eee170402540a43e24ad851243cd099cf64a3f95?ts=2)
- After the current user has viewed the new notifications by clicking on the heart icon on the Navbar, we want to clear the notifications. When there's a new notification, a red dot is shown underneath the heart icon
- The way to clearing the new notifications is by updating the value of last_checked of the current user. At the moment it's always set to null. Whenever a current user clicks on the heart icon notifications, we want to set a timestamp to their last_checked field. If a notification created_at time is older than the last_checked time, then we don't show the notifications red dot. Since users is a subscription, any new notifications (the red dot) gets updated in realtime
- We need to perform a mutation to update a users last_check field in the database
- **Create a CHECK_NOTIFICATIONS mutation:**
  - In src/graphql/mutations.js file:
    - The checkNotifications mutation function accepts the userId and lastChecked as parameters
      - It finds a user where its id is equal to the provided userId and sets the last_checked field to the provided lastChecked value
      - Since users is a subscription we don't need to return anything. So check the `affected_rows` box
    ```js
    export const CHECK_NOTIFICATIONS = gql`
      mutation checkNotifications($userId: uuid!, $lastChecked: String!) {
        update_users(
          where: { id: { _eq: $userId } }
          _set: { last_checked: $lastChecked }
        ) {
          affected_rows
        }
      }
    `;
    ```
- **Perform the CHECK_NOTIFICATIONS mutation in NotificationList component:**
  - In src/components/shared/Navbar.js file and in the *Links component*:
    - Destructure the currentUserId from useContext(UserContext) hook
    - In the `<NotificationList />` component, pass down the currentUserId as props
  - In src/components/notification/NotificationList.js file:
    - Import the CHECK_NOTIFICATIONS mutation
    - Receive the currentUserId props from the Link parent component
    - Call useMutation() hook and pass in the CHECK_NOTIFICATIONS mutation as an argument. We get back the checkNotifications mutation function
    - We want to perform the checkNotifications mutation function when the NotificationList component mounts and when it first loads
    - Inside the useEffect() hook:
      - Create a `variables` object that contains the userId that's set to the currentUserId and the lastChecked that's set to the current time. lastChecked is set with a timestamp when the user clicks on the heart icon notifications
      - Call the checkNotifications mutation and pass in the variables object as an argument
      - For the dependencies array, pass in the currentUserId and the checkNotifications function. Whenever there's a change to these items, the component will reload causing the page to re-render
      ```js
      import React, { useEffect } from 'react';
      import { useMutation } from '@apollo/client';
      import { CHECK_NOTIFICATIONS } from '../../graphql/mutations';

      const [checkNotifications] = useMutation(CHECK_NOTIFICATIONS);

      useEffect(() => {
        const variables = {
          userId: currentUserId,
          lastChecked: new Date().toISOString()
        };
        checkNotifications({ variables });
      }, [currentUserId, checkNotifications]);
      ```
- **Display the red dot notifications:**
  - In src/components/shared/Navbar.js file and in the *Links component*:
    - Use the hasNotifications value to conditionally display the `class.notifications`. This is the red dot underneath the heart icon notification. If hasNotifications is true, show this class
    ```js
    <div
      onClick={handleToggleList}
      className={hasNotifications ? classes.notifications : ''}
    >
      {showList ? <LikeActiveIcon /> : <LikeIcon />}
    </div>
    ```

### [66. Formatting dates](https://github.com/sungnga/instagram-clone-app/commit/ae41d248f589d62ed82b5f69aef3edd7fd61efe3?ts=2)
- date-fns docs: https://date-fns.org/docs/
- In src/utils/formatDate.js file:
  ```js
  import { format, formatDistanceStrict, isThisYear } from 'date-fns';

  // If date is not in current year, include the year
  // If date is in current year, include the month and day only
  export function formatPostDate(date) {
    // MARCH 2
    const formatShort = format(new Date(date), 'MMMM d').toUpperCase();
    // MARCH 2, 2020
    const formatLong = format(new Date(date), 'MMMM d, yyy').toUpperCase();

    // Check if given date is this year
    // If it is, return short format date
    // Else return long format date
    return isThisYear(new Date(date)) ? formatShort : formatLong;
  }

  export function formatDateToNowShort(date) {
    // 5 days ago -> 5 days -> ['5', 'days'] -> ['5', 'd'] -> 5d
    // 7 weeks ago -> 7w
    return (
      formatDistanceStrict(new Date(date), new Date(Date.now()))
        // split it on a space and get a new array back: ['5', 'days']
        .split(' ')
        // if there is a second index, take only the first char of the string
        // else return the entire string
        // ['5', 'days'] -> ['5', 'd']
        .map((s, i) => (i === 1 ? s[0] : s))
        // join an array back to a string
        .join('')
    );
  }
  ```
- In src/components/notification/NotificationList.js file:
  - Name import the formatDateToNowShort function
  - Format the like and follow notification dates in the notification list
    ```js
    import { formatDateToNowShort } from '../../utils/formatDate';

    {isLike &&
      `likes your photo. ${formatDateToNowShort(
        notification.created_at
      )}`}
    {isFollow &&
      `started following you. ${formatDateToNowShort(
        notification.created_at
      )}`}
    ```
- In src/components/post/Post.js file:
  - Name import the formatPostDate and formatDateToNowShort utility functions
  - In the Post component, call the formatPostDate() method to format the post created_at date
  - In the AuthorCaption component, call the formatDateToNowShort() method and pass in createAt date
  - In the UserComment component, call the formatDateToNowShort() method to format the comment created_at date


## USER PROFILE PAGE, PLUS FOLLOWING AND UNFOLLOWING USERS

### [67. Adding following and followers tables in Hasura, configure relationships](https://github.com/sungnga/instagram-clone-app/commit/53756471241519bd0f171face8c3b660b3b29e21?ts=2)
- **Create a following table in Hasura graphQL:**
  - Table Name: following
  - Columns:
    - id : type of UUID : gen_random_uuid()
    - user_id : type of UUID
    - profile_id : type of UUID
  - Primary Key: id
- **Create a followers table in Hasura graphQL:**
  - Table Name: followers
  - Columns:
    - id : type of UUID : gen_random_uuid()
    - user_id : type of UUID
    - profile_id : type of UUID
  - Primary Key: id
- **Configure relationships for tables:**
  - Relationships for users table:
    - A user may have many following (following many users). users has an array relationship with following
    - Configure relationships between users and following:
      - Relationship Type: Array Relationship
      - Relationship Name: following
      - Reference Table: following
      - From: id (from the users id)
      - To: user_id (to the user_id stored in following)
    - A user may have many followers. users has an array relationship with followers
    - Configure relationships between users and followers:
      - Relationship Type: Array Relationship
      - Relationship Name: followers
      - Reference Table: followers
      - From: id (from the users id)
      - To: user_id (to the user_id stored in followers)
  - Relationships for following table:
    - A user who commits the following (profile_id). following has an object relationship to users
    - Configure relationships between following and users:
      - Relationship Type: Object Relationship
      - Relationship Name: user
      - Reference Table: users
      - From: profile_id (from the profile_id stored in following)
      - To: id (to the id on users table)
  - Relationships for followers table:
    - A follower of a user. followers has an object relationship to users
    - Configure relationships between followers and users:
      - Relationship Type: Object Relationship
      - Relationship Name: user
      - Reference Table: users
      - From: profile_id (from the profile_id stored in followers)
      - To: id (to the id on users table)

### [68. Querying for a user profile data](https://github.com/sungnga/instagram-clone-app/commit/6e8ad1c6311e17a927bee4b0c6590de607c5f5a1?ts=2)
- Query for a user profile data based on the username and display the data on a user profile page
- **Create a GET_USER_PROFILE query:**
- In src/graphql/queries.js file
  - The getUserProfile query function accepts a username as an argument
  - It returns all the necessary data of that user to render a user profile page
  - Note that when we call this query using useQuery() hook, we get back the data object and loading
  ```js
  export const GET_USER_PROFILE = gql`
    query getUserProfile($username: String!) {
      users(where: { username: { _eq: $username } }) {
        id
        name
        username
        profile_image
        website
        bio
        posts_aggregate {
          aggregate {
            count
          }
        }
        followers_aggregate {
          aggregate {
            count
          }
        }
        following_aggregate {
          aggregate {
            count
          }
        }
        posts(order_by: { created_at: desc }) {
          id
          media
          likes_aggregate {
            aggregate {
              count
            }
          }
          comments_aggregate {
            aggregate {
              count
            }
          }
        }
        saved_posts(order_by: { created_at: desc }) {
          post {
            id
            media
            likes_aggregate {
              aggregate {
                count
              }
            }
            comments_aggregate {
              aggregate {
                count
              }
            }
          }
        }
      }
    }
  `;
  ```
- **Perform a GET_USER_PROFILE query and display the data in ProfilePage component:**
- In src/pages/profile.js file and in the *ProfilePage component*:
  - Import the GET_USER_PROFILE query
  - Import the LoadingScreen component
  - Import the UserContext from App.js file
  - Get the username we need to make the query from the profile page params using the useParams() hook
  - Create a `variables` object that contains the `username` data
  - Call useQuery() hook and pass in the GET_USER_PROFILE query as 1st arg and the variables object as 2nd arg. We get back the data object and loading
  - Call the useContext() hook and pass in the UserContext as an argument. We get back the currentUserId
  - Write an if statement that if loading is true, return the `<LoadingScreen />` component
  - The user data that we get back from the query is found in `data.users[0]`. We can assign it to a `user` variable
  - Then check to see if user.id is equal to the currentUserId. If it is, assign the truthy value to the `isOwner` variable. The current user is looking at their own profile page
  - Instead of passing down the defaultCurrentUser data, we want to pass down the actual user data we get back from the database. So in the return section, replace all `defaultCurrentUser` with `user`
  - Go into GridPost.js file:
    - Fix the way we get and display the likes count
      - `const likesCount = post.likes_aggregate.aggregate.count;`
    - Fix the way we get and display the comments count
      - `const commentsCount = post.comments_aggregate.aggregate.count;`
    ```js
    import { useParams } from 'react-router-dom';
    import { useQuery } from '@apollo/client';
    import { GET_USER_PROFILE } from '../graphql/queries';
    import LoadingScreen from '../components/shared/LoadingScreen';
    import { UserContext } from '../App';


    const { username } = useParams();
    const variables = { username };
    const [data, loading] = useQuery(GET_USER_PROFILE, { variables });
    const { currentUserId } = useContext(UserContext);

    if (loading) return <LoadingScreen />;
    const user = data.users[0]
    const isOwner = user.id === currentUserId;
    ```

### [69. Editing the profile picture](https://github.com/sungnga/instagram-clone-app/commit/487fbb160edd3e135bee22dfc375b2878aa66730?ts=2)
- We want our current user to be able to edit their main profile picture by uploading a new image file. If successful, the avatar on the Navbar should sync up with the new profile picture
- In src/components/shared/ProfilePicture.js file:
  - Receive the image and isOwner props from the ProfilePage parent component
  - In a ternary, if there is an image,
    - In the wrapper div, add an onClick event handler that if isOwner is true, call the openFileInput function, else call a function that's going to return null
  - Add an `input` element that will be hidden by setting the `display` to `none`
    - Create an inputRef using useRef() hook and store it in an `inputRef` variable
    - Set the input ref props to inputRef
    - Set the input type props to file
    - Set the onChange event handler to handleUpdateProfilePic
  - Write an openFileInput function
    - Call the inputRef.current.click()
  - Import the handleImageUpload utility function
  - Import the EDIT_USER_AVATAR mutation
  - Import the UserContext
  - Call useMutation() hook and pass in the EDIT_USER_AVATAR mutation to get the editUserAvatar mutation function
  - Call useContext() hook and pass in the UserContext and we get back the currentUserId
  - Create an `img` state and initialize it to the `image` props that this component receives from parent component
  - Write a handleUpdateProfilePic function
    - We've written this function in edit-profile.js file before. Use the same function here
    - In the variables object, set the id to the currentUserId
    - Call setImg() to set the image once it's updated with the uploaded image and we get back the url
  - Lastly, in the img element, set the src to the img state to render the updated profile picture
    ```js
    import React, { useContext, useRef, useState } from 'react';
    import handleImageUpload from '../../utils/handleImageUpload';
    import { useMutation } from '@apollo/client';
    import { EDIT_USER_AVATAR } from '../../graphql/mutations';
    import { UserContext } from '../../App';

    function ProfilePicture({ size, image, isOwner }) {
      const classes = useProfilePictureStyles({ size, isOwner });
      const inputRef = useRef();
      const [editUserAvatar] = useMutation(EDIT_USER_AVATAR);
      const [img, setImg] = useState(image);
      const { currentUserId } = useContext(UserContext);

      function openFileInput() {
        inputRef.current.click();
      }

      async function handleUpdateProfilePic(event) {
        const url = await handleImageUpload(event.target.files[0]);
        const variables = { id: currentUserId, profileImage: url };
        await editUserAvatar({ variables });
        setImg(url);
      }

      return (
        <section className={classes.section}>
          <input
            style={{ display: 'none' }}
            ref={inputRef}
            type='file'
            onChange={handleUpdateProfilePic}
          />
          {image ? (
            <div
              className={classes.wrapper}
              onClick={isOwner ? openFileInput : () => null}
            >
              <img src={img} alt='User profile' className={classes.image} />
            </div>
          ) : (
            <div className={classes.wrapper}>
              <Person className={classes.person} />
            </div>
          )}
        </section>
      );
    }
    ```

### [70. Displaying saved_posts data in ProfileTabs component](https://github.com/sungnga/instagram-clone-app/commit/9dcc3f055fdd86e1176a9d4d918f14721baafe9b?ts=2)
- In src/components/profile/ProfileTabs.js file and in the *SavedPosts component*:
  - Write an if statement that if the length of user.saved_posts array is equal to 0, return the "No saved posts found" text
  - If there are saved_posts, map over the user.saved_posts array and display each post data in the PostGrid component
  ```js
  function SavedPosts({ user }) {
    const classes = useProfileTabsStyles();

    if (user.saved_posts.length === 0) {
      return (
        <section className={classes.savedPostsSection}>
          <div className={classes.noContent}>
            <div className={classes.savePhotoIcon} />
            <Typography variant='h4'>Save</Typography>
            <Typography align='center'>
              Save photos and videos that you want to see again. No one is
              notified, and only you can see what you've saved.
            </Typography>
          </div>
        </section>
      );
    }

    return (
      <article className={classes.article}>
        <div className={classes.postContainer}>
          {user.saved_posts.map(({ post }) => (
            <GridPost key={post.id} post={post} />
          ))}
        </div>
      </article>
    );
  }
  ```

### [71. Following and unfollowing a user](https://github.com/sungnga/instagram-clone-app/commit/be1db590ae8383d3975df9a05df99d3a167454cd?ts=2)
- The next feature we want to build is enable a user to follow or unfollow another user and send a notification to the user whose being followed
- **Create a FOLLOW_USER mutation:**
  - In src/graphql/mutations.js file:
    - The followUser mutation function accepts userIdToFollow and currentUserId as arguments
      - The currentUserId wants to follow the userIdToFollow
      - This mutation performs 3 mutation operations: insert_followers(), insert_following(), and insert_notifications()
      - It creates a new follower instance, a new following instance, and a new notification instance
      - It doesn't return anything, so mark each operation as `affected_rows` 
      ```js
      export const FOLLOW_USER = gql`
        mutation followUser($userIdToFollow: uuid!, $currentUserId: uuid!) {
          insert_followers(
            objects: { user_id: $userIdToFollow, profile_id: $currentUserId }
          ) {
            affected_rows
          }
          insert_following(
            objects: { user_id: $currentUserId, profile_id: $userIdToFollow }
          ) {
            affected_rows
          }
          insert_notifications(
            objects: {
              user_id: $currentUserId
              profile_id: $userIdToFollow
              type: "follow"
            }
          ) {
            affected_rows
          }
        }
      `;
      ```
- **Create an UNFOLLOW_USER mutation:**
  - In src/graphql/mutations.js file:
    - The unfollowUser mutation function accepts userIdToFollow and currentUserId as arguments
      - The currentUserId wants to follow the userIdToFollow
      - This mutation performs 3 mutation operations: delete_followers(), delete_following(), and delete_notifications()
      - It deletes a follower, following, and notification instances
      - It doesn't return anything, so mark each operation as `affected_rows` 
      ```js
      export const UNFOLLOW_USER = gql`
        mutation unfollowUser($userIdToFollow: uuid!, $currentUserId: uuid!) {
          delete_followers(
            where: {
              user_id: { _eq: $userIdToFollow }
              profile_id: { _eq: $currentUserId }
            }
          ) {
            affected_rows
          }
          delete_following(
            where: {
              user_id: { _eq: $currentUserId }
              profile_id: { _eq: $userIdToFollow }
            }
          ) {
            affected_rows
          }
          delete_notifications(
            where: {
              user_id: { _eq: $currentUserId }
              profile_id: { _eq: $userIdToFollow }
              type: { _eq: "follow" }
            }
          ) {
            affected_rows
          }
        }
      `;
      ```
- **Update the ME subscription to include followers and following:**
  - In src/graphql/subscriptions file:
    - We want to subscribe to the followers and following fields of a current user as well
    ```js
    followers {
      user {
        id
        user_id
      }
    }
    following {
      user {
        id
        user_id
      }
    }
    ```
- **Update the UserContext to include followingIds and followerIds:**
  - In src/App.js file:
    - Now that we have access to the following and followers fields of me object, we can map over each of the arrays and get the user id
    - Then pass down the followingIds and followerIds as value props so any components in our app can have access to them
    - We want to have these ids available because we want to be able to check if these ids are in the following or followers array. Based on that, we perform mutations to either follow or unfollow a particular user. For example, if the current user is visiting another user profile page and if this user id isn't in the current user's following array, then we want to display the Follow button so that the current user can follow this user
    ```js
    const followingIds = me.following.map(({ user }) => user.id);
    const followerIds = me.followers.map(({ user }) => user.id);

  	<UserContext.Provider
			value={{ me, currentUserId, followingIds, followerIds }}
		>
    ```
- **Perform a FOLLOW_USER mutation in the ProfileNameSection component:**
  - When we (current user) is visiting another user profile page:
    - If this user.id exists in the followingIds array, display the Following button. We're already following this user
    - If we're not following this user AND this user.id exists in the followerIds array, display the Follow Back button. This user follows us. And when this button is clicked, execute the followUser mutation
    - Else display the Follow the button. When this button is clicked, execute the followUser mutation
  - In src/pages/profile.js file and in the *ProfileNameSection component*:
    - This component receives the user props from the ProfilePage parent component
    - Import UserContext from App.js file
    - Call useContext() hook and pass in the UserContext as an argument. We get back the currentUserId, followingIds, and followerIds
    - Call the .some() method to iterate over the followingIds array to check if the user.id exists in this array. That is, if we're already following this user. If there is, assign a truthy value to an isAlreadyFollowing variable
    - Create a piece of state called isFollowing and initialize its value to isAlreadyFollowing
    - If isFollowing state is true, we want to display the Following button. And when we click on it, it's going to show the UnfollowDialog to enable us to unfollow
    - Then we want to write a conditional that if we're not following this user (`!isFollowing`) but this user.id exists in the followerIds array, then this user is a follower. Assign a truthy value to the isFollower variable. In this case, we want to display a Follow Back button to follow this user back
    - So in the Follow Back button element, add an onClick event handler to call the handleFollowUser function
    - Import the FOLLOW_USER mutation
    - Call useMutation() hook and pass in the FOLLOW_USER mutation as an argument. We get back the followUser mutation function
    - Create a variables object that contains the data for the userIdToFollow and currentUserId variables
    - Write a handleFollowUser function that executes the followUser mutation
      - Call setFollowing() to set isFollowing state to true. This will display the Following button instead of the Follow Back button
      - Call the followUser mutation and pass in the variables object as an argument
    - Lastly, when we click on the Follow button, add an onClick event handler to call the handleFollowUser function as well
    ```js
    import { UserContext } from '../App';
    import { FOLLOW_USER } from '../graphql/mutations';

    function ProfileNameSection({ user, isOwner, handleOptionsMenuClick }) {
      const [showUnfollowDialog, setUnfollowDialog] = useState(false);
      const { currentUserId, followingIds, followerIds } = useContext(UserContext);
      // If we're already following that user
      const isAlreadyFollowing = followingIds.some((id) => id === user.id);
      const [isFollowing, setFollowing] = useState(isAlreadyFollowing);
      // This user follows us but we're not following this user
      const isFollower = !isFollowing && followerIds.some((id) => id === user.id);
      const variables = {
        userIdToFollow: user.id,
        currentUserId
      };
      const [followUser] = useMutation(FOLLOW_USER);

      function handleFollowUser() {
        setFollowing(true);
        followUser({ variables });
      }

      let followButton;
      if (isFollowing) {
        followButton = (
          <Button onClick={() => setUnfollowDialog(true)}>
            Following
          </Button>
        );
      } else if (isFollower) {
        followButton = (
          <Button onClick={handleFollowUser}>
            Follow Back
          </Button>
        );
      } else {
        followButton = (
          <Button onClick={handleFollowUser}>
            Follow
          </Button>
        );
      }
    }
    ```
- **Perform an UNFOLLOW_USER mutation in the UnfollowDialog component:**
  - The current user can unfollow another user by clicking on the Following button. This will open up the UnfollowDialog box. The dialog contains the Unfollow button and Cancel button. When the user clicks on the Unfollow button, we want to perform an UNFOLLOW_USER mutation, change the Following button by setting isFollowing state to false, and close the dialog box
  - In src/pages/profile.js file and in the *UnfollowDialog component*:
    - This component receives the user and onClose props from the ProfileNameSection parent component
    - Import the UserContext from App.js file
    - Call the useContext() hook and pass in the UserContext as an argument. We want to get back the currentUserId
    - Import the UNFOLLOW_USER mutation
    - Call the useMutation() hook and pass in the UNFOLLOW_USER mutation as an argument. We get back the unfollowUser mutation function
    - Write a handleUnfollowUser function:
      - Create a variables object that contains the data for the userIdToFollow and currentUserId variables
      - Call the unfollowUser mutation and pass in the variables object as an argument
      ```js
      const { currentUserId } = useContext(UserContext);
      const [unfollowUser] = useMutation(UNFOLLOW_USER);

      function handleUnfollowUser() {
        const variables = {
          currentUserId,
          userIdToFollow: user.id
        };
        unfollowUser({ variables });
      }
      ```
  - Additionally, after unfollowing a user, we want to
      - close the UnfollowDialog box 
      - set isFollowing state in ProfileNameSection parent component back to false. This will remove the Following button and replace it with either Follow or Follow Back depending on whether this user is following us or not
  - So we want to pass down a function that sets isFollowing state to false and set the showUnfollowDialog state to false from the ProfileNameSection parent component to the UnfollowDialog component
  - In src/pages/profile.js file and in the *ProfileNameSection component*:
    - Create an onUnfollowUser function that 
      - calls setUnfollowUser() and set the isFollowing state to false
      - call setUnfollowDialog() and set the showUnfollowDialog state to false
    - Pass down this function as onUnfollowUser props to the UnfollowDialog child component  
    ```js
    const onUnfollowUser = useCallback(() => {
      setUnfollowDialog(false);
      setFollowing(false);
    }, []);

    <UnfollowDialog
      user={user}
      onClose={() => setUnfollowDialog(false)}
      onUnfollowUser={onUnfollowUser}
    />
    ```
  - Back in the *UnfollowDialog component*:
    - Receive the onUnfollowUser props
    - Then inside the handleUnfollowUser function, call onUnfollowUser() at the very end
    - In the Unfollow button element, add an onClick event handler to call the handleUnfollowUser function
    ```js
    function handleUnfollowUser() {
      const variables = {
        currentUserId,
        userIdToFollow: user.id
      };
      unfollowUser({ variables });
      onUnfollowUser();
    }

    <Button onClick={handleUnfollowUser} className={classes.unfollowButton}>
      Unfollow
    </Button>
    ```


## FINISHING THE EXPLORE PAGE

### [72. Tying up loose ends of our app](https://github.com/sungnga/instagram-clone-app/commit/08fef73835cd369cbd4b9d528abb899580b484ff?ts=2)
- Added created_at column to users and saved_posts tables in Hasura
- In GET_USER_PROFILE query in queries.js file, sort the returned saved_posts and posts in descending order, latest posts first. We display the latest post first in the posts grid and saved_posts grid
- Our post media and the profile picture are distorted by trying to fit into the square 500x500px that we defined for upload image preset. We can modify our upload presets in Cloudinary to fix this problem
  - For post image preset, set the Resize & crop mode to `Limit & Pad` and the width height to 500x500. This will not crop or stretch the image
  - For profile avatar preset, 
    - create another preset and call it `instagram-avatar`
    - set the Resize & crop mode to `scale`
    - set the width height to 200x200
  - In handleImageUpload.js file, update the upload preset option to account for both post and avatar presets
- Next is we want to ensure that we're fetching fresh data of a given user when making request and not getting old data from the cache. For example, once a user is logged in and they visit their profile page, we might get an error of user undefined. This error occurs because the data for the profile page is attempted to be served from the cache
  - In the OptionsMenu component when a user clicks the Logout button we need to clear the cache. We want to clear out all the data from a previous session once a user logs out. To do this, we want to useApolloClient hook and call client.clearStore(). The clearStore method removes all the data associated with a given session and it returns a promise
- Another thing we can do to ensure that when we make a request we're always fetching from the network and not read from the cache is we can set the individual fetch policy for a given query
  - In the ProfilePage component, when we query for the GET_USER_PROFILE, we can pass in the fetchPolicy option and set it to 'no-cache'

### [73. Suggesting users to the current user](https://github.com/sungnga/instagram-clone-app/commit/f937e653bb88c6f6a431f2573faacd736f64c364?ts=2)
- We're going use to the followerIds array and check to see if there are any followers. And if there are, we're going to display them as suggested users to our current user to follow them back. If a brand new user has no followers at the moment, we still want to show suggested users that have been created around the same time as the new user
- Display the suggest users in a slider in explore page
- **Create a SUGGEST_USERS query:**
  - In src/graphql/queries.js file:
    - The suggestUsers mutation accepts limit, followerIds, and created_at as arguments
    - It queries the users table for a given limit number of users where there's ids in the followerIds array or the created_at field is greater than the given created_at date
    - Returns id, username, name, and profile_image. We use this data to display in suggest users list
    ```js
    export const SUGGEST_USERS = gql`
      query suggestUsers(
        $limit: Int!
        $followerIds: [uuid!]!
        $created_at: timestamptz!
      ) {
        users(
          limit: $limit
          where: {
            _or: [
              { id: { _in: $followerIds } }
              { created_at: { _gt: $created_at } }
              { created_at: { _lt: $created_at } }
            ]
          }
        ) {
          id
          username
          name
          profile_image
        }
      }
    `;
    ```
  - Querying in Hasura GraphiQL console:
    ```js
    {
      "limit": 20,
      "followerIds": [],
      "created_at": "2021-03-04T23:53:12.700784+00:00"
    }
    ```
- **Update the ME subscription to return created_at field:**
  - In src/graphql/subscriptions.js file:
    - In the ME subscription, add the created_at field to be returned
- **Perform a SUGGEST_USERS query in FollowSuggestions component:**
  - This will display the suggest users in the explore page in a slider
  - In src/components/shared/FollowSuggestions.js file and in the *FollowSuggestions component*:
    - Import UserContext from App.js to get access to followerIds and me object
    - Import the SUGGEST_USERS query to query suggest users in the database
    - Call useContext() hook and pass in the UserContext as an argument. We get back followerIds and me. Specifically we want me.created_at
    - Create a variables object that contains the data for limit, followerIds, and created_at variables
    - Call useQuery() hook and pass in the SUGGEST_USERS query as 1st arg and the variable object as 2nd arg. We get back data and loading properties
    - Instead of rendering the dummy data of suggest users from getDefaultUser, we can render actual users data that we got back from the database in `data.users`
    ```js
    import { UserContext } from '../../App';
    import { useQuery } from '@apollo/client';
    import { SUGGEST_USERS } from '../../graphql/queries';

    const { followerIds, me } = useContext(UserContext);
    const variables = { limit: 10, followerIds, created_at: me.created_at };
    const { data, loading } = useQuery(SUGGEST_USERS, { variables });

    {data.users.map((user) => (
      <FollowSuggestionsItem key={user.id} user={user} />
    ))}
    ```

### [74. Following and unfollowing suggested users](https://github.com/sungnga/instagram-clone-app/commit/67bd1496422c342f7ad51db1d72b8609234f21ce?ts=2)
- Enable a current user to follow and unfollow suggested users
- In src/components/shared/FollowSuggestions.js file and in the *FollowSuggestionsItem component*:
  - Pass down the user id as id props to the FollowButton child component
- **Perform FOLLOW_USER and UNFOLLOW_USER mutations in FollowButton component:**
  - In src/components/shared/FollowButton.js file and in the *FollowButton component*:
    - Import the FOLLOW_USER and UNFOLLOW_USER mutations
    - Import UserContext to get followingIds and currentUserId
    - This component receives the id props from the FollowSuggestionsItem parent component
    - Call useContext() hook to get currentUserId and followingIds from UserContext
    - Call useMutation() hook to get the followUser mutation function from FOLLOW_USER
    - Call useMutation() hook to get the unfollowUser mutation function from UNFOLLOW_USER
    - Create a variables object that contains the data for userIdToFollow and currentUserId variables necessary to make the request
    - Write a handleFollowUser function that
      - calls setFollowing() to set the isFollowing state to true
      - executes the followUser() mutation with the provided variables object
    - Write a handleUnfollowUser function that
      - calls setFollowing() to set the isFollowing state to false
      - executes the unfollowUser() mutation with the provided variables object
    - For the Follow button element, set the onClick event handler to handleFollowUser function
    - For the Unfollow button element, set the onClick event handler to handleUnfollowUser function
    ```js
    import { UserContext } from '../../App';
    import { useMutation } from '@apollo/client';
    import { FOLLOW_USER, UNFOLLOW_USER } from '../../graphql/mutations';

    function FollowButton({ side, id }) {
      const classes = useFollowButtonStyles({ side });
      const { currentUserId, followingIds } = useContext(UserContext);
      const isAlreadyFollowing = followingIds.some(
        (followingId) => followingId === id
      );
      const [isFollowing, setFollowing] = useState(isAlreadyFollowing);
      const [followUser] = useMutation(FOLLOW_USER);
      const [unfollowUser] = useMutation(UNFOLLOW_USER);
      const variables = {
        userIdToFollow: id,
        currentUserId
      };

      function handleFollowUser() {
        setFollowing(true);
        followUser({ variables });
      }

      function handleUnfollowUser() {
        setFollowing(false);
        unfollowUser({ variables });
      }

      const followButton = (
        <Button onClick={handleFollowUser}>
          Follow
        </Button>
      );

      const followingButton = (
        <Button onClick={handleUnfollowUser}>
          Following
        </Button>
      );

      return isFollowing ? followingButton : followButton;
    }
    ```

### [75. Displaying explore posts in explore page](https://github.com/sungnga/instagram-clone-app/commit/97e6dad82fdd44436d9ef92b230a4f0357d286dc?ts=2)
- We want to display explore posts in the explore page to our current user. These explore posts are from users that our current user isn't following. This helps our current user explore posts from users that they don't know about yet and help them find other followers and other sources of content
- These explore posts should be popular posts where they have lots of likes and comments and we should display them in descending order with the most likes and comments go at the top
- **Create an EXPLORE_POSTS query:**
  - In src/graphql/queries.js file:
    ```js
    // Posts with the most likes and comments at the top
    // Newest to oldest
    // Where the posts are NOT from users the current user is following
    export const EXPLORE_POSTS = gql`
      query explorePosts($feedIds: [uuid!]!) {
        posts(
          order_by: {
            likes_aggregate: { count: desc }
            comments_aggregate: { count: desc }
            created_at: desc
          }
          where: { id: { _nin: $feedIds } }
        ) {
          id
          media
          likes_aggregate {
            aggregate {
              count
            }
          }
          comments_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    `;
    ```
- **Perform a EXPLORE_POSTS query in the ExploreGrid component:**
  - In src/components/explore/ExploreGrid.js file and in the *ExploreGrid component*:
    - Import the EXPLORE_POSTS query
    - Call useContext() hook and pass in the UserContext as an argument. We get back the feedIds
    - Create a variables object that contains the data for the feedIds variable
    - Call useQuery() hook and pass in the EXPLORE_POSTS query as 1st arg and the variables object as 2nd arg. We get back the data and loading properties
    - Instead of rendering the dummy posts data from getDefaultPost array, we can replace it with data.posts array. Iterate over the array and display each post in the `<GridPost />` component 
    ```js
    import { UserContext } from '../../App';
    import { EXPLORE_POSTS } from '../../graphql/queries';
    import { useQuery } from '@apollo/client';

    const { feedIds } = useContext(UserContext);
    const variables = { feedIds };
    const { data, loading } = useQuery(EXPLORE_POSTS, { variables });

    {data.posts.map((post) => (
      <GridPost key={post.id} post={post} />
    ))}
    ```


## GETTING MORE POSTS FROM USER AND DELETING POSTS

### [76. Querying to get more posts from a given user](https://github.com/sungnga/instagram-clone-app/commit/a28009722bf79195a22094d4d02b83c372ed0f68?ts=2)
- When visiting an individual post page, we want to display more posts from that given user at the bottom of the page. This area is limited to 6 additional posts
- **Create a GET_MORE_POSTS_FROM_USER query:**
  - In src/graphql/queries.js file:
    - We get back a limit of 6 posts
    - It queries for posts based on the given userId, but NOT for the post with the provided postId. This post is our current post that we're displaying above
    ```js
    export const GET_MORE_POSTS_FROM_USER = gql`
      query getMorePostsFromUser($userId: uuid!, $postId: uuid) {
        posts(
          limit: 6
          where: { user_id: { _eq: $userId }, _not: { id: { _eq: $postId } } }
        ) {
          id
          media
          likes_aggregate {
            aggregate {
              count
            }
          }
          comments_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    `;
    ```
- **Create a GET_POST query:**
  - In src/graphql/queries.js file:
    - It returns the postId and the userId and username who created the post
    ```js
    export const GET_POST = gql`
      query getPost($postId: uuid!) {
        posts_by_pk(id: $postId) {
          id
          user {
            id
            username
          }
        }
      }
    `;
    ```
- **Get postId in post page params to GetMorePostsFromUser component:**
  - In src/pages/post.js file and in the *PostPage component*:
    - Pass down the postId params as props to the GetMorePostsFromUser child component
    ```js
    const { postId } = useParams();
    
    <MorePostsFromUser postId={postId} />
    ```
- **Perform the GET_MORE_POSTS_FROM_USER and GET_POST queries in GetMorePostsFromUser component:**
  - In src/components/post/MorePostsFromUser.js file and in the *GetMorePostsFromUser component*:
    - Receive the postId props from the PostPage parent component
    - Import both the GET_MORE_POSTS_FROM_USER and GET_POST queries
    - Import useLazyQuery hook from @apollo/client
    - We first going to perform a GET_POST query based on the postId params of post page and get back the postId and userId of the post
    - Then we use that postId and userId to perform a GET_MORE_POSTS_FROM_USER lazy query to get the 6 posts by that userId, but not the post that has the given postId
    - Create a variables object that contains the data for the postId variable. We need the postId to perform the GET_POST query
    - Call useQuery() hook and pass in the GET_POST query as 1st arg and the variables object as 2nd arg. We get back the data and loading properties. This data object contains the postId, userId, and user username
    - Call useLazyQuery() hook and pass in the GET_MORE_POSTS_FROM_USER query as an argument
      - What we get back from this hook is an array in which the 1st element is the getMorePostsFromUser query function and the 2nd element is an object which contains the data and loading properties AFTER we call the getMorePostsFromUser() query. Since we already have a data object, we're going to rename it to be `morePosts` instead. We also already have loading, so rename it to `loading2`
    - Since we're using a lazy query (we don't need to wait on the request to get back the results and there's no side effect), we can call the getMorePostsFromUser() query synchronously in a useEffect() hook
    - In useEffect() hook:
      - Write an if statement that if loading is true, we'er just going to return. That means we don't have our data yet
      - We get the useId from `data.posts_by_pk.user.id` and assign it to a userId variable
      - We get the postId from `data.posts_by_pk.id` and assign it to a postId variable
      - Create a variable object and pass in the userId and postId properties
      - Call the getMorePostsFromUser() query and pass in the variables object. We get back the data and loading as an array item in useLazyQuery hook
      - For the dependencies array, pass in the data, loading, and getMorePostsFromUser. The component will re-render whenever there's a change to one of these items
    - Then in the return section, 
      - we check if we're loading or loading2, we show the `<LoadingLargeIcon />` component
      - otherwise, we iterate over the morePosts.posts array and show the 6 posts by this user in the `<GridPost />` component
      - lastly, we want to display the user's instagram username handle and it acts as a link that redirects to their profile page. The username is found at `data.posts_by_pk.user.username`
    ```js
    import { useQuery, useLazyQuery } from '@apollo/client';
    import { GET_MORE_POSTS_FROM_USER, GET_POST } from '../../graphql/queries';

    function MorePostsFromUser({ postId }) {
      const classes = useMorePostsFromUserStyles();
      const variables = { postId };
      const { data, loading } = useQuery(GET_POST, { variables });
      const [
        getMorePostsFromUser,
        { data: morePosts, loading: loading2 }
      ] = useLazyQuery(GET_MORE_POSTS_FROM_USER);

      // let loading = false;

      useEffect(() => {
        if (loading) return;
        const userId = data.posts_by_pk.user.id;
        const postId = data.posts_by_pk.id;
        const variables = { userId, postId };
        getMorePostsFromUser({ variables });
      }, [data, loading, getMorePostsFromUser]);

      return (
        <div className={classes.container}>
          {loading || loading2 ? (
            <LoadingLargeIcon />
          ) : (
            <Fragment>
              <Typography
                color='textSecondary'
                variant='subtitle2'
                component='h2'
                gutterBottom
                className={classes.typography}
              >
                More posts from{' '}
                <Link
                  to={`/${data.posts_by_pk.user.username}`}
                  className={classes.link}
                >
                  @{data.posts_by_pk.user.username}
                </Link>
              </Typography>
              <article className={classes.article}>
                <div className={classes.postContainer}>
                  {morePosts?.posts.map((post) => (
                    <GridPost key={post.id} post={post} />
                  ))}
                </div>
              </article>
            </Fragment>
          )}
        </div>
      );
    }
    ```

### [77. Deleting a post](https://github.com/sungnga/instagram-clone-app/commit/47cfcd35b6aa9bbf74c18cd31c6d88864f968d8a?ts=2)
- One way to delete a given post is by clicking on the post's MoreIcon and the OptionsDialog box opens, then click on the Delete button. That is, if the post belongs to the current user. If the post doesn't belong to the user, the Delete button won't be shown
- **Create a DELETE_POST mutation:**
  - In src/graphql/mutations.js file:
    - The deletePost mutation performs 4 operations: delete_posts(), delete_likes(), delete_saved_posts(), and delete_notifications()
    - When a post is deleted, it also deletes all the associated likes, comments, notifications, and saved_posts with the post
    ```js
    export const DELETE_POST = gql`
      mutation deletePost($postId: uuid!, $userId: uuid!) {
        delete_posts(where: { id: { _eq: $postId }, user_id: { _eq: $userId } }) {
          affected_rows
        }
        delete_likes(where: { post_id: { _eq: $postId } }) {
          affected_rows
        }
        delete_comments(where: { post_id: { _eq: $postId } }) {
          affected_rows
        }
        delete_saved_posts(where: { post_id: { _eq: $postId } }) {
          affected_rows
        }
        delete_notifications(where: { post_id: { _eq: $postId } }) {
          affected_rows
        }
      }
    `;
    ```
- **Perform a DELETE_POST mutation in OptionsDialog component:**
  - To delete a post, we need the currentUserId from UserContext and the postId which the OptionsDialog component receives as props
  - In the post OptionsDialog box, we only want to show the Delete post button if the current user is the owner. If the post belongs to a user who the current user is following, we want to show the Unfollow button instead. If those two conditions aren't true (!isOwner && !isFollowing), then we don't show an extra button in the OptionsDialog box
  - In src/components/post/Post.js file and in the *Post component*:
    - Pass down the post id as postId props and the user id as authorId props to the OptionsDialog child component
    ```js
    {showOptionsDialog && (
      <OptionsDialog
        postId={id}
        authorId={user.id}
        onClose={() => setOptionsDialog(false)}
      />
    )}
    ```
  - In src/components/shared/OptionsDialog.js file:
    - Receive the postId and authorId props from the Post parent component
    - Import the DELETE_POST and UNFOLLOW_USER mutations
    - Write a handleDeletePost function that
      - executes the deletePost() mutation function. We need to collect the postId and userId variables object
      - closes the dialog box after the mutation is done
      - redirects user to the feed page
      - and reloads the page
    - Write a handleUnfollowUser function that
      - executes the unfollowUser() mutation function. We need to collect the userIdToFollow and currentUserId variables object
      - closes the dialog box after the mutation is done
    ```js
    import React, { useContext } from 'react';
    import { useHistory } from 'react-router-dom';
    import { useMutation } from '@apollo/client';
    import { UserContext } from '../../App';
    import { DELETE_POST, UNFOLLOW_USER } from '../../graphql/mutations';

    function OptionsDialog({ onClose, postId, authorId }) {
      const { currentUserId, followingIds } = useContext(UserContext);
      const isOwner = authorId === currentUserId;
      const buttonText = isOwner ? 'Delete' : 'Unfollow';
      const onClick = isOwner ? handleDeletePost : handleUnfollowUser;
      const isFollowing = followingIds.some((id) => id === authorId);
      const isUnrelatedUser = !isOwner && !isFollowing;
      const [unfollowUser] = useMutation(UNFOLLOW_USER);
      const [deletePost] = useMutation(DELETE_POST);
      const history = useHistory();

      async function handleDeletePost() {
        const variables = {
          postId,
          userId: currentUserId
        };
        await deletePost({ variables });
        onClose();
        history.push('/');
        window.location.reload();
      }

      async function handleUnfollowUser() {
        const variables = {
          userIdToFollow: authorId,
          currentUserId
        };
        await unfollowUser({ variables });
        onClose();
      }

      return (
        <Dialog>
          {!isUnrelatedUser && (
            <Button onClick={onClick} className={classes.redButton}>
              {buttonText}
            </Button>
          )}
        </Dialog>
      );
    }
    ```


## ADDING USER FEED WITH INFINITE SCROLL

### [78. Querying feed posts and suggest users for feed page](https://github.com/sungnga/instagram-clone-app/commit/f46c4f73bb1ce4af5bcd4ddc699bb84f07b4ff07?ts=2)
- The next important feature we want to work on is displaying posts on the feed page. These posts are from users that the current user is following and posts that are from the current user themselves
- So whenever we're querying posts for feed page, we want to include posts from following users and the current user
- New posts from following users and current user will show up in feed page
- **Pass down feedIds data in UserContext:**
  - First, we should create another array used in UserContext to help us out whenever we're querying for feed posts. We need to have the followingIds and currentUserId
  - In src/App.js file:
    - Create a feedIds array which contains the existing followingIds and the currentUserId
    - Pass it down as value props to UserContext.Provider
    ```js
  	const followingIds = me.following.map(({ user }) => user.id);
    const feedIds = [...followingIds, currentUserId];

		<UserContext.Provider value={{ me, currentUserId, followingIds, followerIds, feedIds }}>
    ```
- **Create a GET_FEED query:**
  - In src/graphql/queries.js file:
    - Querying the posts table for posts where the user_id includes in the provided feedIds array and where the created_at is later than a given timestamp
    - Limit the number of posts by the provided limit value
    - The posts is sorted by the created_at, latest first
    ```js
    export const GET_FEED = gql`
      query getFeed($limit: Int!, $feedIds: [uuid!]!, $lastTimestamp: timestamptz) {
        posts(
          limit: $limit
          where: { user_id: { _in: $feedIds }, created_at: { _lt: $lastTimestamp } }
          order_by: { created_at: desc }
        ) {
          id
          caption
          created_at
          media
          location
          user {
            id
            username
            name
            profile_image
          }
          likes_aggregate {
            aggregate {
              count
            }
          }
          likes {
            id
            user_id
          }
          saved_posts {
            id
            user_id
          }
          comments(order_by: { created_at: desc }, limit: 2) {
            id
            content
            created_at
            user {
              username
            }
          }
          comments_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    `;
    ```
- **Perform a GET_FEED query in FeedPage component:**
  - In src/pages/feed.js file and in the *FeedPage component*:
    - Import UserContext to get the me object and feedIds array
    - Import the GET_FEED query
    - Create a variables object that collects the necessary variables to make the GET_FEED query. We must provide the limit and feedIds
    - Call useQuery() hook and pass in the GET_FEED query as 1st arg and the variables object as 2nd arg. We get back the data and loading properties
    - Then instead of displaying dummy posts data, we can display the actual posts data that we got back on the feed page. Iterate over the `data.posts` array and display each post in the `<FeedPost />` component
    ```js
    import { UserContext } from '../App';
    import { useQuery } from '@apollo/client';
    import { GET_FEED } from '../graphql/queries';

    const { me, feedIds } = useContext(UserContext);
    const variables = { feedIds, limit: 2 };
    const { data, loading } = useQuery(GET_FEED, { variables });

    <div>
      {data.posts.map((post, index) => (
        <React.Suspense key={post.id} fallback={<FeedPostSkeleton />}>
          <FeedPost index={index} post={post} />
        </React.Suspense>
      ))}
    </div>
    ```
- **Perform a SUGGEST_USERS query in FeedSideSuggestions component:**
  - On our feed page, we want to display an aside on the right of the feed posts of a list of suggested users. It has a follow/unfollow button next to each suggested users for current user to follow or unfollow
  - In src/components/feed/FeedSideSuggestions.js file
    - Import UserContext to get the me object and followerIds array
    - Import the SUGGEST_USERS query
    - Create a variables object that collects the necessary variables to make the SUGGEST_USERS query. We must provide the limit, followerIds, and created_at
    - Call useQuery() hook and pass in the SUGGEST_USERS query as 1st arg and the variables object as 2nd arg. We get back the data and loading properties
    - Then instead of displaying dummy users data, we can display the actual users data that we got back in the FeedSideSuggestions section. Iterate over the `data.users` array and display each suggested user in the `<UserCard />` component. Also we need to pass down the user.id as id props to the FollowButton child component
    ```js
    import { UserContext } from '../../App';
    import { useQuery } from '@apollo/client';
    import { SUGGEST_USERS } from '../../graphql/queries';

    const classes = useFeedSideSuggestionsStyles();
    const { me, followerIds } = useContext(UserContext);
    const variables = { limit: 5, followerIds, created_at: me.created_at };
    const { data, loading } = useQuery(SUGGEST_USERS, { variables });

    {loading ? (
      <LoadingIcon />
    ) : (
      data.users.map((user) => (
        <div key={user.id} className={classes.card}>
          <UserCard user={user} />
          <FollowButton id={user.id} side />
        </div>
      ))
    )}
    ```

### [79. Implementing the infinite scroll and fetching more posts](https://github.com/sungnga/instagram-clone-app/commit/b2e055f3b23480598f7c92a31f6817c2b3b94f9a?ts=2)
- We will be using the infinite scroll functionality in multiple places across our app. So it's useful to have this as a separate utility function (a hook) that detects when we hit the bottom of the page when we're scrolling
- **Create an infinite scroll hook:**
  - In src/utils/usePageBottom.js file:
    - Write a usePageBottom hook that tells us when a user scrolled to the bottom or not. So we need to figure out where the page bottom is
    - The way we're going to keep track of this is with state. Create a bottom state and initialize to false
    - In the end, we will be returning this bottom state in our usePageBottom hook. The component that calls this hook will get either a true or false value
    ```js
    import React, { useEffect, useState } from 'react';

    function usePageBottom() {
      const [bottom, setBottom] = useState(false);

      useEffect(() => {
        function handleScroll() {
          const isBottom =
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight;
          setBottom(isBottom);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      return bottom;
    }

    export default usePageBottom;
    ```
- **Implement infinite scroll and fetch more posts in FeedPage component:**
  - In src/pages/feed.js file and in the *FeedPage component*:
    - Import the usePageBottom hook
    - Call usePageBottom() hook and assign the result to isPageBottom variable
    - The next step is to fetch the next set of posts when isPageBottom is true
    - In useQuery hook from @apollo/client, we also have access to the `fetchMore` method. Destructure this method in useQuery() hook (querying GET_FEED)
    - In useEffect() hook:
      - This useEffect hook runs as long as isPageBottom is true and the `fetchMore` method is executed
      - Write an if statement that if not at isPageBottom OR we don't have the date, we're just going to return. We don't want to fetch more data if we're not at the bottom of the page
      - Otherwise, if we are at the bottom of the page, we want to get the last timestamp of the last post that we loaded. We can get the last timestamp of the last post at `data.posts[data.posts.length - 1].created_at`. Assign it to a lastTimestamp variable
      - Then create a variables object that contains the variables needed to make a request for more posts: feedIds, limit, and lastTimestamp
      - Call fetchMore() method and pass in the options object, which are:
        - the variables which contains the required variables values
        - the updateQuery property and set it to handleUpdateQuery function
      - For the dependencies array, pass in these items: isPageBottom, data, feedIds, fetchMore, handleUpdateQuery
    - Write a handleUpdateQuery function that updates our previous query posts array with the fetchMoreResult posts array. Write this function inside a useCallback() hook and must be above the useEffect() hook
      - This function gets 2 values: prev and fetchMoreResult
      - The prev value contains previous fetch posts array
      - The fetchMoreResult value contains newly fetched posts array
      - Now we want to assemble the previous posts and the fetchMoreResult posts together
      - Write an if statement that if there's no posts in fetchMoreResult.posts.length, then call setEndOfFeed() and set it to true (this will turn off the loading spinner) and return the prev posts array
      - Otherwise, return an object which contains the posts array. The posts array consists of all the existing prev.posts and fetchMoreResult.posts. Note that we want to add the fetchMoreResult.posts at the end of the posts array
    ```js
    import React, { useEffect, useCallback } from 'react';
    import usePageBottom from '../utils/usePageBottom';

    const [isEndOfFeed, setEndOfFeed] = useState(false);
    const { me, feedIds } = useContext(UserContext);
    const { data, loading, fetchMore } = useQuery(GET_FEED, { variables });
    const isPageBottom = usePageBottom();

    const handleUpdateQuery = useCallback((prev, { fetchMoreResult }) => {
      // console.log({prev, fetchMoreResult})
      if (fetchMoreResult.posts.length === 0) {
        setEndOfFeed(true);
        return prev;
      }
      return { posts: [...prev.posts, ...fetchMoreResult.posts] };
    }, []);

    useEffect(() => {
      if (!isPageBottom || !data) return;
      const lastTimestamp = data.posts[data.posts.length - 1].created_at;
      const variables = { feedIds, limit: 2, lastTimestamp };
      fetchMore({
        variables,
        updateQuery: handleUpdateQuery
      });
    }, [isPageBottom, data, feedIds, fetchMore, handleUpdateQuery]);
    ```

### [80. Updating the feed post data and improving post appearance](https://github.com/sungnga/instagram-clone-app/commit/7006f3101df62d76ff281f496d81000d3a623db2?ts=2)
- **Destructure more post data from post object in FeedPost component:**
  - In src/components/feed/FeedPost.js file and in the *FeedPost component*:
    - Destructure more post data from post object
    - Create a likesCount variable that stores the likes_aggregate count
    - Create a commentsCount variable that stores the comments_aggregate count
    - In the return section:
      - Pass down the location as props to the UserCard component
      - Pass down the post id as postId props and the user.id as authorId props to the OptionsDialog component
      - Render the likesCount and commentsCount
      - Display a date from the created_at timestamp. For this, we're going to use the `date-fns` library to help us formatting the date. For example, if the post was created 5 days ago, we want to display '5 DAYS AGO'
      - Import the formatDateToNow function
      - Call formatDateToNow() and pass in the created_at date as an argument
    ```js
    import { formatDateToNow } from '../../utils/formatDate';

    const {
      id,
      media,
      likes,
      likes_aggregate,
      saved_posts,
      location,
      created_at,
      user,
      caption,
      comments,
      comments_aggregate
    } = post;
    const likesCount = likes_aggregate.aggregate.count;
    const commentsCount = comments_aggregate.aggregate.count;
    ```
  - In the src/components/shared/OptionsDialog.js file and in the *OptionsDialog component*:
    - Receive the postId and authorId props from the FeedPost parent component
    - In the return section, replace the defaultPost data with postId instead
    - `<Link to={`/p/${postId}`}>Go to post</Link>`
- **Format feed post date:**
  - In src/utils/formatDate.js file:
    - Import the formatDistanceToNow method from date-fns library
    - Write a formatDateToNow function that formats the given date into how long ago it's been from that date
      - Add the suffix 'ago' to the end of the date
      - Transform the date to all uppercase
    ```js
    import { format, formatDistanceStrict, isThisYear, formatDistanceToNow } from 'date-fns';

    export function formatDateToNow(date) {
      return formatDistanceToNow(new Date(date), { addSuffix: true }).toUpperCase();
    }
    ```

### [81. Improving image loading performance](https://github.com/sungnga/instagram-clone-app/commit/27e5150dae306751bd4290b0d659a0d3e63d02dd?ts=2)
- We're going to use a library called React Graceful Image that will allows us to optionally lazy-load our images and gives us a placeholder and allows us to retry loading our images if they failed
- React Graceful Image docs: https://www.npmjs.com/package/react-graceful-image
- Install: `npm i react-graceful-image`
- We're going to use this in our FeedPost and Post components
- In src/components/feed/FeedPost.js file:
  - Import the Img component from react-graceful-image
  - Then replace our `img` element with `Img` component
  ```js
  import Img from 'react-graceful-image';

  <Img src={media} alt='Post media' className={classes.image} />
  ```
- Do the same in Post component in src/components/post/Post.js file


## LIKING, COMMENTING, SAVING FEED POSTS
- The next feature we want to work on is the ability to like/unlike, comment, and save/unsave a feed post in feed page and be able to see the update immediately
- Now, since our feed posts are queried and they're not a subscription, we need to update the cache manually to be able to see the like, comment, and save immediately. If working with a subscription it does it automatically

### [82. Liking and unliking a feed post in feed page](https://github.com/sungnga/instagram-clone-app/commit/a3d4913311dc101531338ce3bbb127681f569413?ts=2)
- When we click on the like/unlike button, we want to see the toggle between the like and liked heart and also see the likesCount immediately increment or decrement according to the mutation we're performing
- **Perform the LIKE_POST and UNLIKE_POST mutations in LikeButton component:**
- In src/components/feed/FeedPost.js file:
  - Import the SAVE_POST, UNSAVE_POST, LIKE_POST, UNLIKE_POST, and CREATE_COMMENT mutations
  - Import the GET_FEED query
  - Import the UserContext to get the currentUserId and feedIds
  - In the *FeedPost component*:
    - Pass down the likes, postId, authorId props to the LikeButton child component
    - `<LikeButton likes={likes} postId={id} authorId={user.id} />`
  - In the *LikeButton component*:
    - Receive the likes, postId, and authorId props from the FeedPost parent component
    - Get the currentUserId and FeedIds from UserContext
    - Check to see if the current user is already liked the post. Compare if the user_id in likes array is equal to currentUserId. Assign the result to an isAlreadyLiked variable
    - Set the isAlreadyLiked as the initial value for liked state
    - Call useMutation() hook and pass in the LIKE_POST mutation as an argument and we get back the likePost mutation
    - Do the same for the UNLIKE_POST mutation and we get back the unlikePost mutation function
    - Create a variables object to collect the postId, userId, and profileId variables
    - In the handleLike function, call the likePost() mutation and pass in the variables object as an argument
    - In the handleUnlike function, call the unlikePost() mutation and pass in the variables object as an argument
    - For both likePost and unlikePost mutations, when we're making the request, we need to provide an additional option to manually update the cache data. This option property is `update` and we can set it to handleUpdate function
    - **Manually updating the cache data for likesCount:**
    - Write a handleUpdate function that manually updates the cache data:
      - This function takes a cache object and result object as arguments
      - Create a variables object that contains the limit and feedIds variables
      - Call cache.readQuery() to read the cache data. Pass in, as an object, the GET_FEED query and the variables object
      - Go to a feed post in feed page and click on the like/unlike button. Console log the data and the result object to see its effect
      - The `data.posts` array in the cache is what we want to update and specifically, we want to update the likesCount found in likes_aggregate.aggregate.count
      - The `result.data` object contains the mutation operations being performed when the like/unlike button is clicked
      - After we've updated the posts array with the new likes count, we want to call cache.writeQuery() to write the cache data. Pass in, as an object, the GET_FEED query and the data property set to the updated posts array
    - Now when the like/unlike button is clicked, we can see the update on the likesCount immediately
    ```js
    import {
      SAVE_POST,
      UNSAVE_POST,
      LIKE_POST,
      UNLIKE_POST,
      CREATE_COMMENT
    } from '../../graphql/mutations';
    import { GET_FEED } from '../../graphql/queries';
    import { useMutation } from '@apollo/client';
    import { UserContext } from '../../App';

    function LikeButton({ likes, postId, authorId }) {
      const classes = useFeedPostStyles();
      const { currentUserId, feedIds } = useContext(UserContext);
      const isAlreadyLiked = likes.some(({ user_id }) => user_id === currentUserId);
      const [liked, setLiked] = useState(isAlreadyLiked);
      const Icon = liked ? UnlikeIcon : LikeIcon;
      const className = liked ? classes.liked : classes.like;
      const onClick = liked ? handleUnlike : handleLike;
      const [likePost] = useMutation(LIKE_POST);
      const [unlikePost] = useMutation(UNLIKE_POST);
      const variables = {
        postId,
        userId: currentUserId,
        profileId: authorId
      };

      function handleUpdate(cache, result) {
        const variables = { limit: 2, feedIds };
        const data = cache.readQuery({
          query: GET_FEED,
          variables
        });
        // console.log({ result, data });
        const typename = result.data.insert_likes?.__typename;
        const count = typename === 'likes_mutation_response' ? 1 : -1;
        const posts = data.posts.map((post) => ({
          ...post,
          likes_aggregate: {
            ...post.likes_aggregate,
            aggregate: {
              ...post.likes_aggregate.aggregate,
              count: post.likes_aggregate.aggregate.count + count
            }
          }
        }));
        cache.writeQuery({ query: GET_FEED, data: { posts } });
      }

      function handleLike() {
        // console.log('like');
        setLiked(true);
        likePost({ variables, update: handleUpdate });
      }

      function handleUnlike() {
        // console.log('unlike');
        setLiked(false);
        unlikePost({ variables, update: handleUpdate });
      }

      return <Icon onClick={onClick} className={className} />;
    }
    ```
- **Update the LIKE_POST and UNLIKE_POST mutations:**
  - In src/graphql/mutations.js file:
    - In LIKE_POST and UNLIK_EPOST mutations, instead of returning `affected_rows`, replace it with `__typename` because we're deferring to updating the cache with the handleUpdate function

### [83. Saving and unsaving a feed post in feed page](https://github.com/sungnga/instagram-clone-app/commit/f9760587cf329a23332f8b411718c13999ddc63a?ts=2)
- When we click on the Save icon on a feed post, we should see the saved post in the Saved tab of our profile page
- We don't need to update the cache when saving and unsaving a feed post
- **Perform the SAVE_POST and UNSAVE_POST mutations in SaveButton component:**
- In src/components/feed/FeedPost.js file:
  - Import the SAVE_POST, UNSAVE_POST mutations
  - Import the UserContext to get the currentUserId
  - In the *FeedPost component*:
    - Pass down the savedPosts and postId props to the SaveButton child component
    - `<SaveButton savedPosts={saved_posts} postId={id} />`
  - In the *SaveButton component*:
    - Receive the savedPosts and postId props from the FeedPost parent component
    - Call useMutation() hook and pass in the SAVE_POST mutation as an argument. We get back the savePost mutation
    - Call useMutation() hook and pass in the UNSAVE_POST mutation as an argument. We get back the unsavePost mutation
    - Create a variables object that collects the postId and userId variables
    - Write a handleSave function that executes the savePost mutation
    - Write a handleRemove function that executes the unsavePost mutation
    ```js
    import { UserContext } from '../../App';
    import { useMutation } from '@apollo/client';
    import { SAVE_POST, UNSAVE_POST } from '../../graphql/mutations';

    function SaveButton({ postId, savedPosts }) {
      const classes = useFeedPostStyles();
      const { currentUserId } = useContext(UserContext);
      const isAlreadySaved = savedPosts.some(
        ({ user_id }) => user_id === currentUserId
      );
      const [saved, setSaved] = useState(isAlreadySaved);
      const Icon = saved ? RemoveIcon : SaveIcon;
      const onClick = saved ? handleRemove : handleSave;
      const [savePost] = useMutation(SAVE_POST);
      const [unsavePost] = useMutation(UNSAVE_POST);
      const variables = {
        postId,
        userId: currentUserId
      };

      function handleSave() {
        // console.log('save');
        setSaved(true);
        savePost({ variables });
      }

      function handleRemove() {
        // console.log('remove');
        setSaved(false);
        unsavePost({ variables });
      }

      return <Icon onClick={onClick} className={classes.saveIcon} />;
    }
    ```

### [84. Commenting on a feed post in feed page](https://github.com/sungnga/instagram-clone-app/commit/965f7388f0b71c07eaa3db0fbf1430eb26ecb41c?ts=2)
- When creating a comment on a feed post, we need to manually update the cache data to be able to see the comment immediately
- **Perform a CREATE_COMMENT mutation in Comment component:**
- In src/components/feed/FeedPost.js file:
  - Import the CREATE_COMMENT mutation
  - Import the GET_FEED query
  - Import the UserContext to get the currentUserId and feedIds
  - In the *FeedPost component*:
    - Pass down the postId props to the Comment child component
    - `<Comment postId={id} />`
  - In the *Comment component*:
    - Receive the postId props from the FeedPost parent component
    - Call useMutation() hook and pass in the CREATE_COMMENT mutation as an argument. We get back the createComment mutate function
    - On the Post button element, add an onClick event handler and set it to handleAddComment
    - Write a handleAddComment function that executes the createComment mutation
      - When calling createComment(), in addition to passing in the variables object, we also need to pass in the `update` property and set it to handleUpdate. We want to update the cache data
    - Write a handleUpdate function that updates the posts array in cache
      - We specifically want to update the commentsCount and the comments array of a post
      - The commentsCount is found at comments_aggregate.aggregate.count and we want to increment by 1
      - Once the posts array has been updated with the new commentsCount and comments array, call cache.writeQuery() to update it in cache. Pass in, as an object, the GET_FEED query and the data object set to posts
      - Finally, call setConent() and pass in an empty string. This will clear out the comment content in input field after the comment has been posted
    ```js
    import { UserContext } from '../../App';
    import { useMutation } from '@apollo/client';
    import { CREATE_COMMENT } from '../../graphql/mutations';
    import { GET_FEED } from '../../graphql/queries';

    function Comment({ postId }) {
      const classes = useFeedPostStyles();
      const { currentUserId, feedIds } = useContext(UserContext);
      const [content, setContent] = useState('');
      const [createComment] = useMutation(CREATE_COMMENT);

      function handleUpdate(cache, result) {
        const variables = { limit: 2, feedIds };
        const data = cache.readQuery({
          query: GET_FEED,
          variables
        });
        // console.log({ result, data });
        const oldComment = result.data.insert_comments.returning[0];
        const newComment = {
          ...oldComment,
          user: { ...oldComment.user }
        };
        const posts = data.posts.map((post) => {
          const newPost = {
            ...post,
            comments: [...post.comments, newComment],
            comments_aggregate: {
              ...post.comments_aggregate,
              aggregate: {
                ...post.comments_aggregate.aggregate,
                count: post.comments_aggregate.aggregate.count + 1
              }
            }
          };
          return post.id === postId ? newPost : post;
        });
        cache.writeQuery({ query: GET_FEED, data: { posts } });
        setContent('');
      }

      function handleAddComment() {
        const variables = {
          content,
          postId,
          userId: currentUserId
        };
        createComment({ variables, update: handleUpdate });
      }
    }
    ```
- **Update the CREATE_COMMENT mutation:**
  - In src/graphql/mutations.js file:
    - In CREATE_COMMENT mutation, instead of returning `affected_rows`, replace it with a `returning` field which contains the necessary comment data to add a new comment
    - We can use the data from the `returning` field to update the post comments in cache
    ```js
    export const CREATE_COMMENT = gql`
      mutation createComment($postId: uuid!, $userId: uuid!, $content: String!) {
        insert_comments(
          objects: { post_id: $postId, user_id: $userId, content: $content }
        ) {
          returning {
            id
            created_at
            post_id
            user_id
            content
            user {
              username
            }
          }
        }
      }
    `;
    ```


## WRAPPING UP

### [85. Catching errors with error boundary](https://github.com/sungnga/instagram-clone-app/commit/2f75b02162517a00012c30bf966b89a22f50b6e4?ts=2)
- When users are using our app and something has gone wrong, they might see just a blank screen or even if they see the error they would not be able to make sense of it. A good way to prevent this behavior is by adding an error boundary. This takes care of catching an error and showing the user something else, like something about the app has failed
- In src/index.js file:
  - Writing an ErrorBoundary in a class component is the standard approach to catching errors with an error boundary
    ```js
    class ErrorBoundary extends Component {
      state = { hasError: false };

      static getDerivedStateFromError() {
        return { hasError: true };
      }

      componentDidCatch(error, info) {
        console.error(error, info);
      }

      render() {
        if (this.state.hasError) {
          return (
            <Typography component='h1' variant='h6' align='center'>
              Oops! Something went wrong.
            </Typography>
          );
        }
        return this.props.children;
      }
    }

    ReactDOM.render(
      <ErrorBoundary>
        <ApolloProvider client={client}>
          // the rest of the code here
        </ApolloProvider>
      </ErrorBoundary>,
      document.getElementById('root')
    );
    ```



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
#### 5. Store form data in state
```js
const [values, setValues] = useState({
  email: '',
  name: '',
  username: '',
  password: ''
});

function handleChange(event) {
  const { name, value } = event.target;
  setValues((prev) => ({ ...prev, [name]: value }));
}
```


## NPM PACKAGES USED IN THIS PROJECT
- react-router-dom
  - Allows us to create routes for our pages
  - Use the Link component to link to another page
- react-helmet
  - Enables us to change meta information
- react-lines-ellipsis
  - Allows us to collapse long lines of text, such as the comment captions
- @rooks/use-outside-click
  - The useOutsideClick hook allows us to hide the NotificationList when click anywhere on the page
- @tanem/react-nprogress
  - Showing the progress while a page is loading or when a route changes
- react-slick
  - Allows us to create a scroll left-right carousel
- react-modal
  - Helps us build the PostModal component
- React Apollo Client: @apollo/client
  - Connecting client to GraphQL API
- react-hook-form and validator
  - Add validation to forms
- slate
  - Building a rich text editor for post caption
- date-fns
  - Allows us to format dates
- react-graceful-image
  - Allows us to lazy-load our images, provides a placeholder, and allows us to retry loading if it failed
