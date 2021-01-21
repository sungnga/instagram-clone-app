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

- * (not found page)

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


## Building Accounts Pages

### 1. Creating routes for our pages:
- In App.js file
  - Import: `import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';`
  - We begin by creating the individual routes that we've laid out. We're using the package react-router-dom to create the individual routes
  - There are a total of 8 routes
