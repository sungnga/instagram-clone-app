import { v4 as uuid } from "uuid";

export const defaultUser = {
  id: uuid(),
  username: "username",
  name: "name",
  profile_image:
    "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/21980342_855787684589171_3143825866358784_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=f1iXvdsbqLEAX_yjDcA&tp=1&oh=a1393a1ea00d7e00224f27ced4c708c5&oe=6033DD5E"
  // profile_image:
  // "https://instagram.com/static/images/anonymousUser.jpg/23e7b3b2a737.jpg"
};

export function getDefaultUser() {
  return {
    id: uuid(),
    username: "username",
    name: "name",
    profile_image:
      "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/21980342_855787684589171_3143825866358784_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=f1iXvdsbqLEAX_yjDcA&tp=1&oh=a1393a1ea00d7e00224f27ced4c708c5&oe=6033DD5E"
  };
}

export const defaultPost = {
  id: uuid(),
  likes: 10,
  caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
  user: defaultUser,
  media:
    "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/12424389_955953987816443_1815481502_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=nT3MsqpPzz4AX9tBpFd&tp=1&oh=b914cb80fb0627760fd2c02adcf4ef65&oe=60341EFC",
  comments: [],
  created_at: "2020-02-28T03:08:14.522421+00:00"
};

export function getDefaultPost() {
  return {
    id: uuid(),
    likes: 10,
    caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
    user: defaultUser,
    media:
      "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/12424389_955953987816443_1815481502_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=nT3MsqpPzz4AX9tBpFd&tp=1&oh=b914cb80fb0627760fd2c02adcf4ef65&oe=60341EFC",
    comments: [],
    created_at: "2020-02-28T03:08:14.522421+00:00"
  };
}

export const defaultNotifications = [
  {
    id: uuid(),
    type: "follow",
    user: defaultUser,
    created_at: "2020-02-29T03:08:14.522421+00:00"
  },
  {
    id: uuid(),
    type: "like",
    user: defaultUser,
    post: defaultPost,
    created_at: "2020-02-29T03:08:14.522421+00:00"
  }
];

export const defaultCurrentUser = {
  id: uuid(),
  username: "me",
  name: "myself",
  profile_image:
    "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s320x320/21980342_855787684589171_3143825866358784_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=f1iXvdsbqLEAX_yjDcA&tp=1&oh=a1393a1ea00d7e00224f27ced4c708c5&oe=6033DD5E",
  website: "https://react12.io",
  email: "me@gmail.com",
  bio: "This is my bio",
  phone_number: "555-555-5555",
  posts: Array.from({ length: 10 }, () => getDefaultPost()),
  followers: [defaultUser],
  following: [defaultUser]
};
