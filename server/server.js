let createError = require("http-errors");
let express = require("express");
let path = require("path");
const nbaRoute = require("./routes/nba.route");
const app = express();

app.use(express.static(path.join(__dirname, "../dist/nba-visualizer")));
app.use("/", express.static(path.join(__dirname, "../dist/nba-visualizer")));
app.use("/api", nbaRoute);

app.listen(process.env.PORT || 4201);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
