let createError = require("http-errors");
let express = require("express");
let path = require("path");
var request = require("request");
const nbaRoute = require("./routes/nba.route");
const app = express();

// Allow any method from any host and log requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
  next();
});

app.get("/api", function(req, res) {
  //modify the url in any way you want
  var newurl = process.env.QUOTAGUARDSTATIC_URL;
  request(newurl).pipe(res);
});
app.use(express.static(path.join(__dirname, "../dist/nba-visualizer")));
app.use("/", express.static(path.join(__dirname, "../dist/nba-visualizer")));
app.use("/api", nbaRoute);

app.listen(process.env.PORT || 4201);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
