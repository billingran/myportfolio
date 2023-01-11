require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const path = require("path");
const port = process.env.PORT || 3000; //process.env.PORT is set by Heroku automatically, and it changes all the times

//connect to mongodb alts
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MYDBCODE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to mongodb atlas.");
  })
  .catch(() => {
    console.log(err);
  });

// define a schema
const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    default: "no name",
  },
  user_number: {
    type: String,
    default: "no number",
  },
  user_email: {
    type: String,
    default: "no email",
  },
  my_message: {
    type: String,
    default: "no message",
  },
});

// create a model for user
const User = mongoose.model("User", userSchema);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/formHandling", (req, res) => {
  let { user_name, user_number, user_email, my_message } = req.body;

  let newUser = new User({ user_name, user_number, user_email, my_message });

  newUser
    .save()
    .then(() => {
      console.log("User has been saved into DB");
    })
    .catch((e) => {
      console.log("error has happened");
      console.log(e);
    });

  let url = "https://v2.jokeapi.dev/joke/Any?lang=fr";
  fetch(url)
    .then((j) => j.json())
    .then((joke) => {
      res.render("respond.ejs", {
        joke,
        user_name,
        user_number,
        user_email,
        my_message,
      });
    });
});

app.get("*", (req, res) => {
  res.status(404);
  res.render("error.ejs");
});

if (
  process.env.NODE_ENV === "prduction" ||
  process.env.NODE_ENV === "staging"
) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__direname, "public", "index.html"));
  });
}
app.listen(port, (req, res) => {
  console.log("Server is running on port Heroku");
});
