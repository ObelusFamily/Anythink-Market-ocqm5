const mongoose = require("mongoose");
require("../models/User");
require("../models/Item");
require("../models/Comment");
// require("./models/Comment");
const crypto = require("crypto");
const User = mongoose.model("User");
const Item = mongoose.model("Item");
const Comment = mongoose.model("Comment");

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.set("debug", true);

function setPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
  return { salt, hash };
}

const usersArr = [];
for (let i = 1; i <= 5; i++) {
  usersArr.push({
    username: `user${i}`,
    email: `user${i}@example.com`,
    ...setPassword(`user${i}@example.com`),
  });
}

function getRandomIntInclusive(max) {
  return Math.floor(Math.random() * (max + 1) + 0);
}
async function clear() {
  return Promise.all([
    await User.deleteMany(),
    await Item.deleteMany(),
    await Comment.deleteMany(),
  ]);
}
async function check() {
  return Promise.all([
    await User.find({}),
    await Item.find(),
    await Comment.find(),
  ]);
}
async function createUsers() {
  return new Promise((res, rej) => {
    console.log("creating 100 users");
    const usersArr = [];
    for (let i = 1; i <= 5; i++) {
      usersArr.push({
        username: `user${i}`,
        email: `user${i}@example.com`,
        ...setPassword(`user${i}@example.com`),
      });
    }

    User.insertMany(usersArr, { ordered: true }, (err, users) => {
      if (err) {
        rej(err);
      }
      console.log("created 100 users");
      res(users);
    });
  });
}
async function createItems(users) {
  return new Promise((res, rej) => {
    console.log("creating 100 items");
    const itemsArr = [];
    for (let i = 1; i <= 5; i++) {
      itemsArr.push({
        title: `item${i}`,
        description: `item${i} description`,
        seller: users[getRandomIntInclusive(4)],
      });
    }
    Item.insertMany(itemsArr, { ordered: true }, (err, items) => {
      if (err) {
        rej(err);
      }
      console.log("created 100 items");
      res(items);
    });
  });
}

async function createComments(users, items) {
  return new Promise(async (res, rej) => {
    console.log("creating 100 comments");
    const commentsArr = [];
    for (let i = 1; i <= 5; i++) {
      commentsArr.push({
        body: `comment #${i}`,
        item: items[getRandomIntInclusive(4)],
        seller: users[getRandomIntInclusive(4)],
      });
    }
    Comment.insertMany(commentsArr, { ordered: true }, (err, comments) => {
      if (err) {
        rej(err);
      }
      console.log("created 100 comments");
      res(comments);
    });
  });
}
async function seed() {
  return new Promise(async (res, rej) => {
    try {
      const users = await createUsers();
      const items = await createItems(users);
      const comments = await createComments(users, items);
      res({ users, items, comments });
    } catch (error) {
      rej(error);
    }
  });
}

seed()
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    mongoose.connection.close();
  });
