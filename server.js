// dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
// sequelize connection
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  helpers: {
    format_date: helpers.format_date, // Use the format_date helper function
  },
});

// Set up Handlebars.js engine with custom helpers
app.engine("handlebars", exphbs({ defaultLayout: "main" }));

// Creates session
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Resets session timer on user activity
const resetSessionTimer = (req, res, next) => {
  const activityListener = () => {
    req.session.touch(); // Reset session timer
  };
  req.on("mousemove", activityListener); // Listen for mouse movement
  req.on("keydown", activityListener); // Listen for keyboard movement
  req.on("scroll", activityListener); // Listen for scrolling
  req.on("click", activityListener); // Listen for mouse clicks

  next();
};

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session(sess)); // Use session
app.use(resetSessionTimer); // Reset session timer on user activity

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening at http://localhost:${PORT}`)
  );
});
