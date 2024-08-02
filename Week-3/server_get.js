const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3040;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.post("/api/register", (req, res) => {
  const { name, country, enrolledcourse, studentId, about } = req.body;
  console.log(
    `Received registration: Name=${name}, Country=${country}, enrolledcourse=${enrolledcourse} ,Student ID=${studentId}, About=${about}`
  );
  res.json({ message: "Registration successful!" });
});
app.listen(port, () => {
  console.log("hello i'm listening to port " + port);
});
