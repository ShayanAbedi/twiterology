const express = require("express"); // web framework for node
const cors = require("cors"); //  Connect/Express middleware that can be used to enable CORS
const monk = require("monk"); // object modeling for node.js (same as mongoose)
const app = express();

// setting up the db
const db = monk("localhost/twer");
const twers = db.get("twers");

app.use(cors());
app.use(express.json()); // middleware to parse the incoming json data

const isValid = (data) => {
  // making sure the data sent is string (not an object) and it's not empty
  return (
    data.name &&
    data.name.toString().trim() !== "" &&
    data.message &&
    data.message.toString().trim() !== ""
  );
};

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Twiterology API",
  });
});

app.post("/twer", (req, res) => {
  if (isValid(req.body)) {
    const twer = {
      name: req.body.name.toString(),
      message: req.body.message.toString(),
      created: new Date(),
    };
    // insert to db
    twers.insert(twer).then((createdTwer) => {
      res.json(createdTwer);
    });
  } else {
    res.status(422);
    res.json({
      message: "Name and Message are required!",
    });
  }
});

app.get("/twer", (req, res) => {
  twers.find().then((twers) => res.json(twers));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
